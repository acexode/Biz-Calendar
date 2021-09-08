import { environment } from './../../../environments/environment';


export const serverBaseUrl = environment.serverUrl;

export const authEndpoints = {
  auth: serverBaseUrl + '/Users/authenticate',
  getUsers: serverBaseUrl + '/Users',

};
export const appointmentEndpoints = {
  getAppointment: serverBaseUrl + '/BizCalendarService/GetAppointments',
  getUserPhysicians: serverBaseUrl + '/BizCalendarService/GetUsersPhysicians',
};
