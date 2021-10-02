import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CNAS } from 'src/app/core/models/cnas.service.model';
import { Cuplata } from 'src/app/core/models/cuplata.service.model';
import { DemoCheckList } from 'src/app/style-guide/components/selection/selection.component';
import { SelectieServiciiModalComponent } from '../modal/selectie-servicii-modal/selectie-servicii-modal.component';
import { BizSelectieServiciiConfig } from '../../models/components/biz-selectie-servicii.config';
@Component({
  selector: 'app-add-service-selection',
  templateUrl: './add-service-selection.component.html',
  styleUrls: ['./add-service-selection.component.scss'],
})
export class AddServiceSelectionComponent implements OnInit {
  @Input() serviceType: string;
  @Input() set tipServicesData(d: Cuplata[] | CNAS[]) {
    this.servicesData = d ? d : [];
  };

  @Input()
  set config(c: any) {
    this.vConfig = c;
  }
  get config() {
    return this.vConfig;
  }

  toUseConfig = {
    idKey: 'locationUID',
    labelKey: 'locationName',
  };

  cuplataData = [
    {
      currency: 'RON',
      duration: 30,
      locationName: null,
      locationUID: null,
      physicianUID: '347ef88e-0019-47e7-9639-6a4c204be68c',
      price: 50,
      serviceName: ' PASSIVE MOTION',
      serviceUID: 'c3e89890-a2d0-4881-ae81-1ae05216f537',
      specialityCode: 'MASAJ',
    },
    {
      currency: 'RON',
      duration: 30,
      locationName: null,
      locationUID: null,
      physicianUID: '347ef88e-0019-47e7-9639-6a4c204be68c',
      price: 50,
      serviceName: ' PASSIVE MOTION',
      serviceUID: 'c3e89890-a2d0-4881-ae81-1ae05216f537',
      specialityCode: 'KINETO',
    },
    {

    }
  ];
  cnasData = [
    {
    cnasMedicalServiceCode: 'Q.1A',
    cnasMedicalServiceDescription: 'Proceduri acupunctura',
    cnasMedicalServiceName: 'Proceduri acupunctura',
    cnasMedicalServiceUID: 'e8de05b0-b73e-405e-be2f-6289b99b18c9',
    entityLevel: 0,
    isConnectedService: false,
    isExam: false,
    medicalServiceCategory: 'Servicii clinice',
    medicalServicesGroupCode: 'Q',
    opRoom: false,
    packageID: 0,
    points: 0,
    points95: 0,
    points100: 0,
    specialityCode: 'ACUPUNCTURA',
    validFrom: '2014-06-01T00:00:00',
    validTo: null,
  },
  {
    cnasMedicalServiceCode: 'Q.1A',
    cnasMedicalServiceDescription: 'Proceduri acupunctura',
    cnasMedicalServiceName: 'Proceduri acupunctura',
    cnasMedicalServiceUID: 'e8de05b0-b73e-405e-be2f-6289b99b18cccc9',
    entityLevel: 0,
    isConnectedService: false,
    isExam: false,
    medicalServiceCategory: 'Servicii clinice',
    medicalServicesGroupCode: 'Q',
    opRoom: false,
    packageID: 0,
    points: 0,
    points95: 0,
    points100: 0,
    specialityCode: 'ACUPUNCTURA',
    validFrom: '2014-06-01T00:00:00',
    validTo: null,
    },
   {
    cnasMedicalServiceCode: 'Q.1A',
    cnasMedicalServiceDescription: 'Ereyomi Search Text',
    cnasMedicalServiceName: 'Ereyomi Search Text',
    cnasMedicalServiceUID: 'e8de05b0-b73e-405e-be2f-6289b99vcxvb18cccc9',
    entityLevel: 0,
    isConnectedService: false,
    isExam: false,
    medicalServiceCategory: 'Servicii clinice',
    medicalServicesGroupCode: 'Q',
    opRoom: false,
    packageID: 0,
    points: 0,
    points95: 0,
    points100: 0,
    specialityCode: 'ACUPUNCTURA',
    validFrom: '2014-06-01T00:00:00',
    validTo: null,
  }
  ];
  cnasDataConfig: BizSelectieServiciiConfig = {
    firstKey: 'serviceName',
    secondKey: 'price',
    currencyKey: 'currency',
    idKey: 'serviceUID'
  };
  tipServiciiOptionConfig: Array<BizSelectieServiciiConfig> = [
    {
      firstKey: 'serviceName',
      secondKey: 'price',
      currencyKey: 'currency',
      idKey: 'serviceUID'

    },
    {
      firstKey: 'cnasMedicalServiceName',
      secondKey: 'medicalServiceCategory',
      thirdKey: '',
      idKey: 'cnasMedicalServiceUID'

    }
  ];

  checkList: DemoCheckList[] = [
    {
      first: 'Consultație peste vârsta de 4 ani',
      second: 'Servicii paraclinice',
      third: '10,80 pt.',
      fourth: '1x Consult control pneumologie',
      fifth: '80 lei',
      sixth: 'Numerar/card în clinică',
      value: 'Consultație',
      checked: true
    },
    {
      first: 'Ecografie generală (abdomen + pelvis)',
      second: 'Servicii paraclinice',
      third: '23,45 pt.',
      fourth: '1x Endoscopie digestivă superioară - interpretare și stabilire tratament (urgență)',
      fifth: '350 lei',
      sixth: 'Printr-o companie de asigurări',
      value: 'Ecografie generală',
      checked: true
    },
    {
      first: 'Ecografie abdominală',
      second: 'Servicii paraclinice',
      third: '12,34 pt.',
      fourth: '1x Consult control pneumologie',
      fifth: '80 lei',
      sixth: 'Numerar/card în clinică',
      value: 'Ecografie abdominală',
      checked: false
    },
    {
      first: 'EKG standard',
      second: 'Servicii paraclinice',
      third: '12,34 pt.',
      fourth: '1x Consult control pneumologie',
      fifth: '80 lei',
      sixth: 'Numerar/card în clinică',
      value: 'EKG',
      checked: false
    },
    {
      first: 'Consult peste 4 ani',
      second: 'Consultație',
      third: '5 pt.',
      fourth: '1x Consult control pneumologie',
      fifth: '80 lei',
      sixth: 'Numerar/card în clinică',
      value: 'Consult',
      checked: false
    },
    {
      first: 'Spirometrie',
      second: 'Servicii paraclinice',
      third: '23 pt.',
      fourth: '2x Spirometrie',
      fifth: '2x 120 lei',
      sixth: 'Pachet servicii',
      value: 'Spirometrie',
      checked: false
    },
    {
      first: 'Pulsoximetrie',
      second: 'Servicii paraclinice',
      third: '10 pt.',
      fourth: '1x Consult control pneumologie',
      fifth: '80 lei',
      sixth: 'Numerar/card în clinică',
      value: 'Pulsoximetrie',
      checked: false
    },
  ];

  selectedValue: any[] = [];
  private servicesData: Array<any> = [];
  private vConfig: any;
  constructor(
    public modalController: ModalController,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {}
  async presentModal() {
    const modal = await this.modalController.create({
      component: SelectieServiciiModalComponent,
      cssClass: 'biz-modal-class',
      componentProps: {
        checkList: this.servicesData,
        config: this.getTipServiciiConfigType(this.serviceType),
        selectedValue: this.selectedValue
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    const { checkedValue } = data;
    this.selectedValue = checkedValue;
  }
  get filtercustomComponentData() {
    return this.checkList.filter((v: DemoCheckList) => v.checked === true);
  }
  unCheckItem(data: string): void {
    if (typeof data !== null && data !== '') {
      const indexOfData = this.checkList.findIndex(
        (v: DemoCheckList) => v.value === data);
      if (indexOfData > -1) {
        this.checkList[indexOfData].checked = false;
      }
    }
  }
  getTipServiciiConfigType(d: string = 'Cuplată') {
    switch (d) {
      case  'Cuplată':
        return this.tipServiciiOptionConfig[0];
      case 'C.N.A.S.':
        return this.tipServiciiOptionConfig[1];
      default:
        return this.tipServiciiOptionConfig[1];
    }
  }

}
