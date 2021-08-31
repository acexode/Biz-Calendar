import { environment } from './../../../environments/environment';


export const serverBaseUrl = environment.serverUrl;

export const authEndpoints = {
  auth: serverBaseUrl + '/Users/authenticate',
  getUsers: serverBaseUrl + '/Users',

};
