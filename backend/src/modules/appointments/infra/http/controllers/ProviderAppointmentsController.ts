import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentService,
    );

    const appointments = await listProviderAppointments.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id,
    });

    return response.json(classToClass(appointments));
  }
}
