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
  updatePerson: baseEndpoints.bizCalendarService + '/UpdatePerson'
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

export const group = {
  getGroups: baseEndpoints.bizCalendarService + '/GetGroups',
  createGroup: baseEndpoints.bizCalendarService + '/CreateGroup',
  updateGroup: baseEndpoints.bizCalendarService + '/UpdateGroup',
  addMembersToGroup: baseEndpoints.bizCalendarService + '/AddMembersToGroup',
};

export const physicians = {
  getPhysicians: baseEndpoints.bizCalendarService + '/GetPhysicians',
  getThirdPartyPhysicians: baseEndpoints.bizCalendarService + '/GetThirdPartyPhysicians',
  getExternalPhysiciansNoCNAS: baseEndpoints.bizCalendarService + '/GetExternalPhysiciansNoCNAS',
};

export const medicalSpecialities = {
  getMedicalSpecialities: baseEndpoints.bizCalendarService + '/GetMedicalSpecialities',
  getAllMedicalSpecialities: baseEndpoints.bizCalendarService + '/GetAllMedicalSpecialities',
};

export const equipments = {
  getMedicalEquipment: baseEndpoints.bizCalendarService + '/GetMedicalEquipment',
};
