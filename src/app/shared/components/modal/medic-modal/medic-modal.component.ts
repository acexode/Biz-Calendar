import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
      .pipe(
        distinctUntilChanged(),
         debounceTime(1000) // debounce value
      ) // makes sure the value has actually changed.
      .subscribe(
        data => {
          console.log(data.search);
          if (data.search !== '') {
            // this.list = this.searching(data.search);
            this.getTipServiciiType(
              this.medicOptionFormControl.value,
              data.search
            );
          } else {
            // this.list = this.medicData;
          }
        }
    ));
    this.medicOptionTipSubscription$ = this.medicOptionFormControl
      .valueChanges
      .subscribe(
        b => {
          this.getTipServiciiType(b);
        }
      );
  }
  get medicOptionFormControl() {
    return this.componentFormGroup.get('medicOptionTip');
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
  getPhysicians(searchString: string = '') {
    const payload = {
       firstName: searchString,
    };
    console.log('payload: ', payload);
    // search by payload not working

    this.reqService
      .post(physicians.getPhysicians, {})
      .subscribe(
        (d: any) => {
          console.log(d);
          if(d?.physicians?.length > 0) {
            const p = d?.physicians.map(
              (y: any) => ({
                first: y.name,
              })
            ).filter(
              (v: any) => v.first.toLowerCase().indexOf(searchString.toLowerCase()) > -1

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
  getThirdPartyPhysicians(searchString: string = '') {
    const payload = {
       name: searchString,
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
  getExternalPhysiciansNoCNAS(searchString: string = '') {
    this.reqService
      .post(physicians.getExternalPhysiciansNoCNAS, {})
      .subscribe(
        (d: any) => {
          console.log('getExternalPhysiciansNoCNAS: ', d);
          if(d?.length > 0) {
            const p = d?.map(
              (y: any) => ({
                first: `${y.firstName} ${y.lastName}`,
                second: y.stencilNo,
              })
            ).filter(
              (v: any) => v.first.toLowerCase().indexOf(searchString.toLowerCase()) > -1

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
  getThirdPartyPhysiciansNotify() {
    this.toastService.presentToastWithNoDurationDismiss(
        'Use the search input to search by Name', 'success'
      );
  }
  getTipServiciiType(
    d: string = this.medicOptionFormControl.value,
    searchString: string = ''
  ): void {
    if (d) {
      this.toastService.dismissToast();
      this.isFetching = true;
      switch (d) {
        case this.medicOption[0].id:
          this.getPhysicians(searchString);
          break;
        case this.medicOption[1].id:
          if (searchString) {
            this.getThirdPartyPhysicians(searchString);
          } else {
            this.getThirdPartyPhysiciansNotify();
          }
          break;
        case this.medicOption[2].id:
          this.getExternalPhysiciansNoCNAS(searchString);
          break;
        default:
          this.getPhysicians(searchString);
          break;
        }
      } else {
        this.toastService.presentToastWithNoDurationDismiss(
          'Select an option', 'success'
        );
      }
  }
  ngOnDestroy(): void {
    unsubscriberHelper(this.subscriptions);
    unsubscriberHelper(this.medicOptionTipSubscription$);
  }

}
