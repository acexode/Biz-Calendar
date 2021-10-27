import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { unsubscriberHelper } from '../core/helpers/unsubscriber.helper';
import { PlatformService } from '../core/services/platform/platform.service';
import { RecurentaModel } from '../home/recurenta/models/recurenta.model';
import { RecurentaComponent } from '../home/recurenta/recurenta.component';
import { BizRadioModalComponent } from '../shared/components/modal/biz-radio-modal/biz-radio-modal.component';
import { InfoPacientModalComponent } from '../shared/components/modal/info-pacient-modal/info-pacient-modal.component';
import { MedicModalComponent } from '../shared/components/modal/medic-modal/medic-modal.component';
import { SelectieServiciiModalComponent } from '../shared/components/modal/selectie-servicii-modal/selectie-servicii-modal.component';
import { inputConfigHelper } from '../shared/data/input-config-helper';
import { BizCustomSelectionConfig } from '../shared/models/components/biz-custom-selection-config';
import { IonRadioInputOption } from '../shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from '../shared/models/components/ion-radios-config';
import { IonSelectConfig } from '../shared/models/components/ion-select-config';
import { TextAreaConfig } from '../shared/models/components/ion-textarea-config';
import { DemoCheckList } from '../style-guide/components/selection/selection.component';

@Component({
  selector: 'app-data-statistice',
  templateUrl: './data-statistice.page.html',
  styleUrls: ['./data-statistice.page.scss'],
})
export class DataStatisticePage implements OnInit {


  checkList: DemoCheckList[] = [
    {
      first: 'Consultație peste vârsta de 4 ani',
      second: 'Servicii paraclinice',
      third: '10,80 pt.',
      value: 'Consultație',
      checked: false
    },
    {
      first: 'Ecografie generală (abdomen + pelvis)',
      second: 'Servicii paraclinice',
      third: '23,45 pt.',
      value: 'Ecografie generală',
      checked: false
    },
    {
      first: 'Ecografie abdominală',
      second: 'Servicii paraclinice',
      third: '12,34 pt.',
      value: 'Ecografie abdominală',
      checked: false
    },
    {
      first: 'EKG standard',
      second: 'Servicii paraclinice',
      third: '12,34 pt.',
      value: 'EKG',
      checked: false
    },
    {
      first: 'Consult peste 4 ani',
      second: 'Consultație',
      third: '5 pt.',
      value: 'Consult',
      checked: false
    },
    {
      first: 'Spirometrie',
      second: 'Servicii paraclinice',
      third: '23 pt.',
      value: 'Spirometrie',
      checked: false
    },
    {
      first: 'Pulsoximetrie',
      second: 'Servicii paraclinice',
      third: '10 pt.',
      value: 'Pulsoximetrie',
      checked: false
    },
  ];
  cabinetOption:  Array<IonRadioInputOption> = [
    { label: 'Cabinet 1', id: 'Cabinet 1' },
    { label: 'Cabinet 2', id: 'Cabinet 2' },
    { label: 'Cabinet 3', id: 'Cabinet 3' },
    { label: 'Sala de Operație 1', id: 'Sala de Operație 1' },
    { label: 'Sala de Operație 2', id: 'Sala de Operație 2' },
  ];

  aparaturaConfig: BizCustomSelectionConfig = {
    placeholder: 'Alege',
    inputLabel: {
      text: 'Tip de date'
    }
  };

  adaugaProgramareFormGroup: FormGroup = this.fb.group({
    numar: ['', [Validators.required]],

  });
  isWed = false;

  constructor(
    private fb: FormBuilder,
    public modalController: ModalController,
    private pS: PlatformService,
    private router: Router,
  ) { }

  ngOnInit() {

    this.pS.isDesktopWidth$.subscribe(
      v => this.isWed = v
    );

  }


  async presentModalB() {
    const modal = await this.modalController.create({
      component: SelectieServiciiModalComponent,
      cssClass: 'biz-modal-class',
      componentProps: {
        checkList: this.checkList,
      },
    });
    await modal.present();
  }

  navigateToRecurenta() {
    this.router.navigate(['calendar/recurenta']);
  }
  save(): void {

  }


  backAction(){

  }

}
