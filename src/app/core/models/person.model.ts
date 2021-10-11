export interface Person {
  birthDate: Date | string;
  cid: string | number | null;
  cityID: number;
  email: string;
  firstName: string;
  genderID: 0 | 1;
  isActive: boolean;
  lastName: string;
  mobileUpdateDate: null | any;
  phone: string;
  pid: string;
  uid: string;
  wasUpdateByMobile: null | any;
  gender?: 'M' | 'F';
}
