import React, { useState } from 'react';
import { DayValue } from '@hassanmojab/react-modern-calendar-datepicker';
import { CalendarIcon } from 'lucide-react';
import DatePicker from '@hassanmojab/react-modern-calendar-datepicker';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

interface AppointmentFormProps {
  onSubmit?: () => void;
}

interface FormErrors {
  rut?: string;
  phone?: string;
  email?: string;
  date?: string;
}

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwpJ6ypHMCR9GiVDp6djwWPcWsb_PqSqmzfJu2dZdbzZgcWaHjn8PqL4zOv2bc3U3GK/exec';

export function AppointmentForm({ onSubmit }: AppointmentFormProps) {
  const [rut, setRut] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedDay, setSelectedDay] = useState<DayValue>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const times = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const validateRut = (value: string) => {
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/;
    return rutRegex.test(value);
  };

  const validatePhone = (value: string) => {
    const phoneRegex = /^\+56\s?9\s?\d{4}\s?\d{4}$/;
    return phoneRegex.test(value);
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!rut) {
      newErrors.rut = 'El RUT es requerido';
    } else if (!validateRut(rut)) {
      newErrors.rut = 'El formato del RUT debe ser 12.345.678-9';
    }

    if (!phone) {
      newErrors.phone = 'El teléfono es requerido';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'El formato del teléfono debe ser +56 9 1234 5678';
    }

    if (!email) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(email)) {
      newErrors.email = 'El correo no es válido';
    }

    if (!selectedDay || !selectedTime) {
      newErrors.date = 'Debe seleccionar una fecha y hora';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDateForSubmission = (day: DayValue, time: string): string => {
    if (!day) return '';
    return `${day.year}-${String(day.month).padStart(2, '0')}-${String(day.day).padStart(2, '0')} ${time}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const reservationData = {
        rut,
        telefono: phone,
        correo: email,
        fecha_hora: formatDateForSubmission(selectedDay, selectedTime)
      };

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData)
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      // Clear form
      setRut('');
      setPhone('');
      setEmail('');
      setSelectedDay(null);
      setSelectedTime('');
      setErrors({});
      onSubmit?.();

      alert('¡Hora reservada exitosamente!');
    } catch (error) {
      console.error('Error al enviar la reserva:', error);
      setSubmitError('Ha ocurrido un error al agendar la consulta. Por favor, intente nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Agende su Consulta</h2>
      {submitError && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md">
          {submitError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">RUT</label>
          <input
            type="text"
            value={rut}
            onChange={(e) => {
              setRut(e.target.value);
              if (errors.rut) {
                setErrors({ ...errors, rut: undefined });
              }
            }}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.rut ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="12.345.678-9"
          />
          {errors.rut && (
            <p className="mt-1 text-sm text-red-600">{errors.rut}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) {
                setErrors({ ...errors, phone: undefined });
              }
            }}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.phone ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="+56 9 1234 5678"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Correo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) {
                setErrors({ ...errors, email: undefined });
              }
            }}
            className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="ejemplo@correo.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Fecha y Hora</label>
          <DatePicker
            value={selectedDay}
            onChange={setSelectedDay}
            inputPlaceholder="Seleccionar fecha"
            colorPrimary="#2563eb"
            calendarClassName="custom-calendar"
            shouldHighlightWeekends
            minimumDate={{
              year: new Date().getFullYear(),
              month: new Date().getMonth() + 1,
              day: new Date().getDate(),
            }}
          />
          {selectedDay && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Horarios disponibles para el {format(
                  new Date(selectedDay.year, selectedDay.month - 1, selectedDay.day),
                  "d 'de' MMMM, yyyy",
                  { locale: es }
                )}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {times.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => {
                      setSelectedTime(time);
                      if (errors.date) {
                        setErrors({ ...errors, date: undefined });
                      }
                    }}
                    className={`p-2 text-sm rounded-md transition-colors ${
                      selectedTime === time
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
          {errors.date && (
            <p className="text-sm text-red-600">{errors.date}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full px-8 py-3 rounded-lg transition duration-300 text-lg font-medium ${
            isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {isSubmitting ? 'Agendando...' : 'Agendar Consulta'}
        </button>
      </form>
    </div>
  );
}