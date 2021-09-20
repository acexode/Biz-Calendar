

    export interface Service {
        service: string;
    }

    export interface Equipment {
        uid: string;
        appointmentUID: string;
        equipmentUID: string;
        operationDate: Date;
    }

    export interface Appointment {
        uid: string;
        personName: string;
        pid: string;
        phone: string;
        companyID: number;
        personUID: string;
        physicianUID: string;
        startTime: string;
        endTime: string;
        comment: string;
        operationDate: string;
        observations: string;
        personHasArrived: boolean;
        isPrivateCLN: boolean;
        consultationID: number;
        colorCode: string;
        icons: [];
        infPacient: string;
        subject: string;
        priorityOrder: number;
        appStatusIDID: number;
        appStatus: string;
        webUserID: number;
        webUserName: string;
        consultationIsActive: boolean;
        locationUID: string;
        services: Service[];
        equipments: Equipment[];
        acordSiteTermeniSiConditii: boolean;
        acordSiteGDPRProgramare: boolean;
    }

    export interface Schedule {
        start: string;
        end: string;
        dow: number;
        isPrivate: boolean;
        isBreakTime: boolean;
    }

    export interface PhyFreeDay {
        uid: string;
        physicianUID: string;
        type: string;
        startDate: string;
        endDate: string;
    }

    export interface AppointmentResponse {
        errorMessage: string;
        errorCode: number;
        insertedUID: string;
        insertedID: number;
        insertedData: string;
        warnnings: string;
        restrictions: string;
        operationUID: string;
        appointments: Appointment[];
        schedules: Schedule[];
        phyFreeDays: PhyFreeDay[];
    }

