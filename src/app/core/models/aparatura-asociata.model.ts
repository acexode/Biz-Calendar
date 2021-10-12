export interface AparaturaAsociataModel {
  uid: string;
  physicianServiceID: number;
  equipmentUID: string;
  serviceUID: string;
  equipmentName: string;
  equipmentValidFrom: string;
  equipmentValidTo: any;
  equipmentWaitingTime: number;
  equipmentCategoryUID: string;
  equipmentCategoryDescription: string;
  physicianUID: string;
  equipmentLocationUID: string;
}
