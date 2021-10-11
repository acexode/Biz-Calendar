import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { physicians } from 'src/app/core/configs/endpoints';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { RequestService } from 'src/app/core/services/request/request.service';
import { ToastService } from 'src/app/core/services/toast/toast.service';
import { IonInputConfig } from 'src/app/shared/models/components/ion-input-config';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';
import { IonTextItem } from 'src/app/shared/models/components/ion-text-item';

export interface DemoMedicData {
  first: string;
  second: string;
  third: string;
  fourth?: string;
  fifth?: string;
  sixth?: string;
  value: string;
}

@Component({
  selector: 'app-medic-modal',
  templateUrl: './medic-modal.component.html',
  styleUrls: ['./medic-modal.component.scss'],
})
export class MedicModalComponent implements OnInit, OnDestroy {
  list!: any;

  isFormSubmitted = false;

  label: IonTextItem = {
    text: 'Default',
    classes: '',
    slot: 'end',
  };
  config: IonInputConfig = {
    placeholder: 'Caută',
    type: 'search',
    inputMode: 'search',
    size: 100,
    /* inputLabel: this.label, */
    clearable: false,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: false,
    removeInputItemBaseLine: true,
    isInputFocused: false,
    debounce: 200,
    hidAssistiveText: true,
  };
  searchForm: FormGroup = this.fb.group({
    search: ['', [Validators.required]],
  });
  public subscriptions = new Subscription();
  medicConfig: IonSelectConfig = {
    inputLabel: {
      classes: 'd-none',
      text: 'Tip medic trimițător',
    },
    forceListItems: false,
    multiple: false,
    disabled: false,
    placeholder: 'Tip: Medici externi cu contract CNAS',
    alertOptions: {
      cssClass: '',
    },
    idKey: 'id',
    labelKey: 'label',
    useIcon: {
      name: 'chevron-down',
      classes: 'neutral-grey-medium-color'
    }
  };
  medicOption = [
    {
      id: 'Intern',
      label: 'Intern (din clinică)'
    },
    {
      id: 'Extern-cu',
      label: 'Extern cu contract CNAS'
    },
    {
      id: 'Extern-fără',
      label: 'Extern fără contract CNAS'
    }
  ];
  componentFormGroup: FormGroup = this.fb.group({
    medicOptionTip: ['', [Validators.required]],
    getThirdPartyPhysicians: ['', [Validators.required]],
  });
  medicOptionTipSubscription$: Subscription;
  list$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  isFetching = true;
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private reqService: RequestService,
    private toastService: ToastService,
  ) {
  }
  ngOnInit(): void {
     this.toastService.presentToastWithNoDurationDismiss(
        'Select an option', 'success'
      );
    // load check list to list
    //
    this.subscriptions.add(this.searchForm.valueChanges
      .pipe(distinctUntilChanged()) // makes sure the value has actually changed.
      .subscribe(
        data => {
          /* if (data.search !== '') {
            this.list = this.searching(data.search);
          } else {
            this.list = this.medicData;
          } */
        }
    ));
    this.medicOptionTipSubscription$ = this.componentFormGroup
      .get('medicOptionTip')
      .valueChanges
      .subscribe(
        b => {
          this.toastService.dismissToast();
          this.isFetching = true;
          this.getTipServiciiType(b);
        }
      );
  }
  submit(data: any) {
    this.modalController.dismiss({
      dismissed: true,
      data: data?.first
    });
  }
  closeModal() {
    this.modalController.dismiss({
      dismissed: true,
      data: null
    });
  }
  searching(st: string) {
    if (st) {
      const d = this.list;
      return d.filter((v: any) => (v.first.toLowerCase().indexOf(st.toLowerCase()) > -1));
    }
  }
  getPhysicians() {
    const payload = {
      // lastName: 'string',
      // firstName: 'string',
      // name: 'string',
      // physicianUID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      // physicianID: 0,
      // specialityCode: 'string',
      // paymentType: 0,
      // locationUID: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      // serviceUID: '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    };
    this.reqService
      .post(physicians.getPhysicians, payload)
      .subscribe(
        (d: any) => {
          console.log(d);
          if(d?.physicians?.length > 0) {
            const p = d?.physicians.map(
              (y: any) => ({
                first: y.name,
              })
            );
            this.list$.next(
              [...p]
            );
          } else {
            this.list$.next([]);
          }
          this.isFetching = false;
        },
        _err => {
          this.isFetching = false;
        }
      );
  }
  getThirdPartyPhysicians() {
    const payload = {
       name: 'Am',
    };
    this.reqService
      .post(physicians.getThirdPartyPhysicians, payload)
      .subscribe(
        (d: any) => {
          console.log('getThirdPartyPhysicians:', d);
          if(d?.length > 0) {
            const p = d?.map(
              (y: any) => ({
                first: y.name,
                second: y.contractNo,
                third: y.stencilNo,
              })
            );
            this.list$.next(
              [...p]
            );
          } else {
            this.list$.next([]);
          }
           this.isFetching = false;
        },
         _err => {
          this.isFetching = false;
        }
      );
  }
  getExternalPhysiciansNoCNAS() {
    const payload = {};
    this.reqService
      .post(physicians.getExternalPhysiciansNoCNAS, payload)
      .subscribe(
        (d: any) => {
          console.log('getExternalPhysiciansNoCNAS: ', d);
          if(d?.length > 0) {
            const p = d?.map(
              (y: any) => ({
                first: `${y.firstName} ${y.lastName}`,
                second: y.stencilNo,
              })
            );
            this.list$.next(
              [...p]
            );
          } else {
            this.list$.next([]);
          }
           this.isFetching = false;
        },
         _err => {
          this.isFetching = false;
        }
      );
  }
  getTipServiciiType(d: string): void {
    switch (d) {
      case this.medicOption[0].id:
        this.getPhysicians();
        break;
      case this.medicOption[1].id:
        this.getThirdPartyPhysicians();
        break;
      case this.medicOption[2].id:
        this.getExternalPhysiciansNoCNAS();
        break;
      default:
        this.getPhysicians();
        break;
    }
  }
  ngOnDestroy(): void {
    unsubscriberHelper(this.subscriptions);
    unsubscriberHelper(this.medicOptionTipSubscription$);
  }

}
