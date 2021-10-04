import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CNAS } from 'src/app/core/models/cnas.service.model';
import { Cuplata } from 'src/app/core/models/cuplata.service.model';
import { SelectieServiciiModalComponent } from '../modal/selectie-servicii-modal/selectie-servicii-modal.component';
import { BizSelectieServiciiConfig } from '../../models/components/biz-selectie-servicii.config';
import { get } from 'lodash';
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

  selectedValue: any[] = [];
  private servicesData: Array<any> = [];
  private vConfig: any;
  constructor(
    public modalController: ModalController,
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
    console.log(this.selectedValue);
    console.log(this.servicesData);
    console.log('sdfdss',this.selectedServices);
  }
  get selectedServices() {
    return this.servicesData.filter(
      (v: any) => this.selectedValue
          .includes(
            v[`${this.getTipServiciiConfigType(this.serviceType).idKey}`]
          )
    ).map((v) => ({
        first: get(v, `${this.getTipServiciiConfigType(this.serviceType).firstKey}`, ''),
        // eslint-disable-next-line max-len
        second: `${get(v, `${this.getTipServiciiConfigType(this.serviceType).secondKey}`, '')} ${get(v, `${this.getTipServiciiConfigType(this.serviceType)?.currencyKey}`, '')}`,
        third: get(v, `${this.getTipServiciiConfigType(this.serviceType).thirdKey}`, null),
        id: get(v, `${this.getTipServiciiConfigType(this.serviceType).idKey}`, ''),
    })
    );
  }
  unCheckItem(data: string): void {
    console.log(data);
   if (typeof data !== null && data !== '') {
      const indexOfData = this.selectedValue.findIndex(
        (v: string) => v === data);
      if (indexOfData > -1) {
        this.selectedValue.splice(indexOfData, 1);
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
