interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'vinicius@dominioqueeutenho.com.br',
      name: 'Vinicius da Domínio Que Eu Tenho',
    },
  },
} as IMailConfig;
