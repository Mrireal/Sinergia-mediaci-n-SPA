import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';

export interface Appointment {
  rut: string;
  phone: string;
  email: string;
  date: DayValue;
  time: string;
}

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw6RZ7wliUZHTzdACfVNdBuXRGc284sqAEOkItu4ySjpHqi8ZbjoiJeXol0T2hwdJbn/exec';

export class AppointmentModel {
  private appointments: Appointment[] = [];

  async createAppointment(appointment: Appointment): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('rut', appointment.rut);
      formData.append('phone', appointment.phone);
      formData.append('email', appointment.email);
      formData.append('date', `${appointment.date?.day}/${appointment.date?.month}/${appointment.date?.year}`);
      formData.append('time', appointment.time);

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });

      // Store locally as well
      this.appointments.push(appointment);
      return true;
    } catch (error) {
      console.error('Error saving appointment:', error);
      return false;
    }
  }

  async getAppointments(): Promise<Appointment[]> {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return this.appointments;
    }
  }

  async isTimeSlotAvailable(date: DayValue, time: string): Promise<boolean> {
    try {
      const appointments = await this.getAppointments();
      return !appointments.some(
        (apt) => 
          apt.date?.day === date?.day && 
          apt.date?.month === date?.month && 
          apt.date?.year === date?.year && 
          apt.time === time
      );
    } catch (error) {
      console.error('Error checking time slot:', error);
      return true;
    }
  }
}

export const appointmentModel = new AppointmentModel();