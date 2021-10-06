import { environment } from './../../../environments/environment';


export const serverBaseUrl = environment.serverUrl;

export const baseEndpoints = {
  bizCalendarService: serverBaseUrl + '/BizCalendarService',
};

export const authEndpoints = {
  auth: serverBaseUrl + '/Users/authenticate',
  getUsers: serverBaseUrl + '/Users',
  getParameters: baseEndpoints.bizCalendarService + '/GetParameters'
};

export const appointment = {
  addApointment: baseEndpoints.bizCalendarService + '/AddNewAppointment',
};
export const appointmentEndpoints = {
  getAppointment: serverBaseUrl + '/BizCalendarService/GetAppointments',
  getUserPhysicians: serverBaseUrl + '/BizCalendarService/GetUsersPhysicians',
};

export const persons = {
  addPerson: baseEndpoints.bizCalendarService + '/AddNewPerson',
  getPersons: baseEndpoints.bizCalendarService + '/GetPersons',
};

export const location = {
  getCountries: baseEndpoints.bizCalendarService + '/GetCounties',
  getCities: baseEndpoints.bizCalendarService + '/GetCities',
  getLocations: baseEndpoints.bizCalendarService + '/GetLocations',
};

export const cabinet = {
  getCabinets: baseEndpoints.bizCalendarService + '/GetCabinets',
  getCabinetsSchedules: baseEndpoints.bizCalendarService + '/GetCabinetsSchedules'
};

export const tipServicii = {
  getMedicalServices: baseEndpoints.bizCalendarService + '/GetMedicalServices',
  getClinicCNASMedicalServices: baseEndpoints.bizCalendarService + '/GetClinicCNASMedicalServices',
};
