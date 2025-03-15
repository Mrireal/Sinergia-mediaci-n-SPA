import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import { appointmentModel, Appointment } from '../models/AppointmentModel';

export class AppointmentController {
  createAppointment(appointmentData: Appointment): boolean {
    try {
      if (!this.validateAppointment(appointmentData)) {
        return false;
      }

      if (!appointmentModel.isTimeSlotAvailable(appointmentData.date, appointmentData.time)) {
        return false;
      }

      appointmentModel.createAppointment(appointmentData);
      return true;
    } catch (error) {
      console.error('Error creating appointment:', error);
      return false;
    }
  }

  private validateAppointment(appointment: Appointment): boolean {
    const { rut, phone, email, date, time } = appointment;

    if (!rut || !this.validateRut(rut)) return false;
    if (!phone || !this.validatePhone(phone)) return false;
    if (!email || !this.validateEmail(email)) return false;
    if (!date || !time) return false;

    return true;
  }

  private validateRut(rut: string): boolean {
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
    return rutRegex.test(rut);
  }

  private validatePhone(phone: string): boolean {
    const phoneRegex = /^\+56\s?9\s?\d{4}\s?\d{4}$/;
    return phoneRegex.test(phone);
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export const appointmentController = new AppointmentController();