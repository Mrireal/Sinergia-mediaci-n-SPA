import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';

export interface Appointment {
  rut: string;
  phone: string;
  email: string;
  date: DayValue;
  time: string;
}

export class AppointmentModel {
  private appointments: Appointment[] = [];

  createAppointment(appointment: Appointment): void {
    this.appointments.push(appointment);
  }

  getAppointments(): Appointment[] {
    return this.appointments;
  }

  isTimeSlotAvailable(date: DayValue, time: string): boolean {
    return !this.appointments.some(
      (apt) => 
        apt.date?.day === date?.day && 
        apt.date?.month === date?.month && 
        apt.date?.year === date?.year && 
        apt.time === time
    );
  }
}

export const appointmentModel = new AppointmentModel();