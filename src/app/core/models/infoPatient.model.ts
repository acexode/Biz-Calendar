export interface InfoPatient {
  canceled: number;
  future: number;
  lastAppointmentDate: Date | string | null;
  lastAppointmentPhysician: string;
  lastAppointmentType: string;
  personAge: number;
  personRegistrationDate: Date | string | null;
  totalAppointment: number;
}
