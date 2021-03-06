import { addDays, addHours, startOfDay } from 'date-fns';

export const cabinetData = {
  errorMessage: 'string',
  errorCode: 0,
  insertedUID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  insertedID: 0,
  insertedData: 'string',
  warnnings: 'string',
  restrictions: 'string',
  operationUID: 'string',
  appointments: [
    {
      acordSiteGDPRProgramare: null,
      acordSiteTermeniSiConditii: null,
      appStatus: '',
      appStatusIDID: null,
      cabinetName: null,
      cabinetUID: null,
      colorCode: '1CN',
      comment: 'Alimos Toma',
      companyID: 1,
      consultationID: null,
      consultationIsActive: null,
      endTime: '2021-11-04T11:45:00',
      equipmentName: 'COLONOSCOP Cab 3 Preciziei',
      equipmentUID: '96e3f068-9abd-49fb-bfa0-ff065ccb5d2c',
      equipments: null,
      equipmentsUIDs: ['96e3f068-9abd-49fb-bfa0-ff065ccb5d2c'],
      icons: [],
      infPacient: 'O colonoscopie pe luna de placere',
      isPrivateCLN: true,
      locationName: 'Bucuresti - Preciziei',
      locationUID: null,
      observations: null,
      operationDate: '2021-10-01T15:21:00',
      personHasArrived: false,
      personName: 'ALIMOS TOMA',
      personUID: '36fcdd80-3994-4c52-ef25-08d97cd244dc',
      phone: '0722527577',
      physicianName: 'POPESCU ION',
      physicianUID: '6e3c43b9-0a07-4029-b707-ca3570916ad5',
      pid: '5201019141690',
      priorityOrder: 0,
      recurrence: null,
      services: null,
      servicesUIDs: [],
      startTime: '2021-11-04T11:00:00',
      // eslint-disable-next-line max-len
      subject: 'Servicii programate privat: COLONOSCOPIE\nAparate selectate: COLONOSCOP Cab 3 PrecizieiConsultatie asociata: NU; Achitata: NU\nDurata: 45 min\nTelefon: 0215654455\nLocatie:Bucuresti - Preciziei',
      uid: '8ef6724b-9a05-4925-9d4e-3f0ae6b8ef40',
      webUserID: null,
      webUserName: null,

    }
  ],
  schedules: [
    {
      date: startOfDay(new Date()),
      dow: 1,
      end:  addHours(startOfDay(new Date()), 14), // '14:0',
      isBreakTime: true,
      isPrivate: true,
      locationName: 'Bucuresti - Preciziei',
      locationUID: '4cbb3c39-8be6-46d7-b334-1f7325e86a5e',
      physicianFirstName: 'ION',
      physicianLastName: 'POPESCU',
      physicianUID: '6e3c43b9-0a07-4029-b707-ca3570916ad5',
      start: addHours(startOfDay(new Date()), 8),// '13:0',
    },
    {
      date: startOfDay(new Date()), // '2021-11-01T07:00:00',
      dow: 1,
      end: addHours(startOfDay(new Date()), 17),// '17:0',
      isBreakTime: false, // time is available
      isPrivate: true, // schedule is reseved - for private
      locationName: 'Bucuresti - Preciziei',
      locationUID: '4cbb3c39-8be6-46d7-b334-1f7325e86a5e',
      physicianFirstName: 'ION',
      physicianLastName: 'POPESCU',
      physicianUID: '6e3c43b9-0a07-4029-b707-ca3570916ad5',
      start:  addHours(startOfDay(new Date()), 14),// '14:0'
    },
    /* {
      date: '2021-11-02T07:00:00',
      dow: 2,
      end: '15:0',
      isBreakTime: true,
      isPrivate: true,
      locationName: 'Bucuresti - Preciziei',
      locationUID: '4cbb3c39-8be6-46d7-b334-1f7325e86a5e',
      physicianFirstName: 'ION',
      physicianLastName: 'POPESCU',
      physicianUID: '6e3c43b9-0a07-4029-b707-ca3570916ad5',
      start: '14:0'
    }, */
    {
      date: startOfDay(new Date()), // '2021-11-01T07:00:00',
      dow: 1,
      end: addDays(addHours(startOfDay(new Date()), 13), 1),
      isBreakTime: false, // time is available
      isPrivate: true, // schedule is reseved - for private
      locationName: 'Bucuresti - Preciziei',
      locationUID: '4cbb3c39-8be6-46d7-b334-1f7325e86a5e',
      physicianFirstName: 'ION',
      physicianLastName: 'POPESCU',
      physicianUID: '6e3c43b9-0a07-4029-b707-ca3570916ad5',
      start: addDays(addHours(startOfDay(new Date()), 10), 1),
    },
  ],
  phyFreeDays: []
};
