export interface CNAS {
  cnasMedicalServiceCode: string;
  cnasMedicalServiceDescription: string;
  cnasMedicalServiceName: string;
  cnasMedicalServiceUID: string;
  entityLevel: number;
  isConnectedService: boolean;
  isExam: boolean;
  medicalServiceCategory: string;
  medicalServicesGroupCode: string;
  opRoom: boolean;
  packageID: number;
  points: number;
  points95: number;
  points100: number;
  specialityCode: string;
  validFrom: Date | string;
  validTo: any;
 }
