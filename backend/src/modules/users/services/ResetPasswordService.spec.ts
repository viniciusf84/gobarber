import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123454',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123456',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123456');
    expect(updatedUser?.password).toBe('123456');
  });

  it('should not be able to reset password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if more than a couple of hour have been passed', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123454',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '123456',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
