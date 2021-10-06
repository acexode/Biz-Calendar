import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { IonInputConfig } from 'src/app/shared/models/components/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/components/ion-text-item';
import { get, includes } from 'lodash';
import { isThisHour } from 'date-fns';

@Component({
  selector: 'app-selectie-servicii-modal',
  templateUrl: './selectie-servicii-modal.component.html',
  styleUrls: ['./selectie-servicii-modal.component.scss'],
})
export class SelectieServiciiModalComponent implements OnInit, OnDestroy {
;
  list!: any;
  ionicForm: FormGroup;

  isFormSubmitted = false;

  label: IonTextItem = {
    text: 'Default',
    classes: '',
    slot: 'end',
  };
  searchConfig: IonInputConfig = {
    placeholder: 'Caută',
    type: 'search',
    inputMode: 'search',
    size: 100,
    /* inputLabel: this.label, */
    clearable: false,
    inputClasses: '',
    minLength: 3,
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
  items$: BehaviorSubject< // SelectieServiciiChecklistModel
    Array<{
      first: any;
      second: string;
      third?: string;
      checked: boolean;
      value: string | number;
    }>
    > = new BehaviorSubject([]);
   private vConfig: any;
  @Input()
  set config(c: any) {
    this.vConfig = c;
    this.updateItems();
  }
  get config() {
    return this.vConfig;
  }
  @Input() set checkList(opts: Array<any>) {
    this.opts = opts ? opts : [];
    this.updateItems();
  }
  @Input() set selectedValue(d: any[]) {
    this.selctedOpts = d ? d : [];
    this.updateItems();
  };
  private opts: Array<any> = [];
  private selctedOpts: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private modalController: ModalController,
    private cdRef: ChangeDetectorRef,
  ) {
    this.ionicForm = this.formBuilder.group({
      checkboxArrayList: this.formBuilder.array([], [Validators.required])
    });
  }
  updateItems() {
    const first = get(this.config, 'firstKey', 'first');
    const second = get(this.config, 'secondKey', 'second');
    const secondForCurrency = get(this.config, 'currencyKey', 'currency');
    const third = get(this.config, 'thirdKey', 'third');
    const value = get(this.config, 'idKey', 'value');
    const id = get(this.config, 'idKey', 'id');
    const items = this.opts
      .map((v) => ({
        first: get(v, first, null),
        second: `${get(v, second, null)} ${get(v, secondForCurrency, '')}`,
        third: get(v, third, null),
        checked: includes(
          this.selctedOpts,
          get(v, id, null) || get(v, value, null)
        ) || get(v, 'checked', false),
        value: get(v, id, null) || get(v, value, null),
      }))
      .filter((vv) => get(vv, 'value', null) !== null);
    this.items$.next(items);
    this.cdRef.markForCheck();
    this.cdRef.detectChanges();
  }
  ngOnInit(): void {
    this.onLoadCheckboxStatus();
    // load check list to list
    //
    this.subscriptions.add(this.searchForm.valueChanges
      .pipe(distinctUntilChanged()) // makes sure the value has actually changed.
      .subscribe(
        data => {
          if (data.search !== '') {
            this.searching(data.search);
          } else {
             this.updateItems();
          }

        }
      ));
  }

  updateCheckControl(cal: any, o: any) {
    if (o.checked) {
      cal.push(new FormControl(o.value));
    } else {
      cal.controls.forEach((item: FormControl, index: any) => {
        if (item.value === o.value) {
          cal.removeAt(index);
          return;
        }
      });
    }
  }

  onLoadCheckboxStatus() {
    if (this.items$.value) {
      const checkboxArrayList: FormArray = this.ionicForm.get('checkboxArrayList') as FormArray;
     this.items$.value.forEach((o: any) => {
        this.updateCheckControl(checkboxArrayList, o);
      });
    }

  }

  onSelectionChange(e: any) {
    const indexOfData = this.items$.value.findIndex((v: any) => v.value === e.target.value);
    if (indexOfData > -1) {
      const checkboxArrayList: FormArray = this.ionicForm.get('checkboxArrayList') as FormArray;
      this.items$.value[indexOfData].checked = e.target.checked;
      this.updateCheckControl(checkboxArrayList, e.target);
    }
  }

  submitForm() {
    this.isFormSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log('Form Submitted', this.ionicForm.value);
    }
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true,
      //...this.ionicForm.value
      checkList: this.items$.value || [],
      checkedValue: this.ionicForm.value.checkboxArrayList || [],
    });
  }
  searching(st: string) {
    if (st) {
      const d = this.items$.value.filter(
        (v: any) => (v.first.toLowerCase().indexOf(st.toLowerCase()) > -1)
      );
      if (d.length > 0) {
         this.items$.next(d);
      } else {
        this.updateItems();
      }
    } else {
      this.updateItems();
    }
  }
  ngOnDestroy(): void {
    unsubscriberHelper(this.subscriptions);
  }

}
