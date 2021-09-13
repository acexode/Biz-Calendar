import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { get, has } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { IonSelectConfig } from 'src/app/shared/models/components/ion-select-config';
import { IonSelectListOption } from 'src/app/shared/models/components/ion-select-list-option';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  // Avoid custom code that may break Ionic stuff.;
  // Capture Angular parent control
  @Input() formControl: FormControl;
  @Input() formControlName: string;

  // get ahold of FormControl instance no matter formControl or formControlName is given.
  // If formControlName is given, then controlContainer.control is the parent FormGroup/FormArray instance.
  get parentControl() {
    return (
      this.formControl ||
      this.controlContainer.control.get(this.formControlName)
    );
  }

  get inputControl() {
    return this.formGroup.get('select');
  }

  get inputReadonly() {
    return (
      get(this.config, 'readonly', false) ||
      get(this.parentControl, 'readonly', false)
    );
  }
  formGroup = this.fb.group({
    select: this.fb.control(null),
  });
  items: BehaviorSubject<
    Array<{
      id: any;
      label: string;
    }>
  > = new BehaviorSubject([]);
  onChange: (_: any) => void;
  onTouched: () => void;
  value: any;
  private vConfig: IonSelectConfig;
  @Input()
  set config(c: IonSelectConfig) {
    this.vConfig = c;
    this.updateItems();
  }
  get config() {
    return this.vConfig;
  }
  @Input() set options(opts: Array<IonSelectListOption>) {
    this.opts = opts ? opts : [];
    this.updateItems();
  }
  private opts: Array<IonSelectListOption> = [];
  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public controlContainer: ControlContainer,
    public alertController: AlertController
  ) { }

  compareWithFn = (o1, o2) => {
    if (o1 && o2 && has(o1, 'id') && has(o2, 'id')) {
      try {
        return (
          o1.id.toString().toLowerCase().trim() ===
          o2.id.toString().toLowerCase().trim()
        );
      } catch (err) {
        return false;
      }
    } else {
      try {
        return (
          o1.toString().toLowerCase().trim() ===
          o2.toString().toLowerCase().trim()
        );
      } catch (err) {
        return false;
      }
    }
  };

  getFieldValue() {
    const field = this.formGroup.get('select');
    const value = field ? field.value : null;
    if (this.config.hasEmptyValue) {
      if (value === this.config.emptyValue) {
        this.selectField.patchValue(null);
        this.cdRef.markForCheck();
        return null;
      }
    } else {
      return value;
    }
    return value;
  }

  setCustomError() {
    const hasErr = this.parentControl
      ? !get(this.parentControl, 'valid', true)
      : false;
    if (hasErr) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      this.inputControl.setErrors({ INVALID_INPUT: true });
    }
  }

  ngOnInit() {
    if (this.inputReadonly) {
      this.inputControl.disable();
    }
    this.formGroup.valueChanges.subscribe((vals) => {
      console.log(vals);
      if (this.onChange) {
        this.onChange(this.getFieldValue());
        this.setCustomError();
        this.cdRef.markForCheck();
        this.cdRef.detectChanges();
      }
    });
  }

  selectChange() {
    this.setCustomError();
    this.cdRef.markForCheck();
    this.cdRef.detectChanges();
  }

  updateItems() {
    const labelK = get(this.config, 'labelKey', 'label');
    const idK = get(this.config, 'idKey', 'id');
    const items = this.opts
      .map((v) => ({
        id: get(v, idK, null),
        label: get(v, labelK, null),
      }))
      .filter((vv) => get(vv, 'id', null) !== null);
    this.items.next(items);
    this.afterOptionsUpdate();
    this.cdRef.markForCheck();
    this.cdRef.detectChanges();
  }

  // This fixes a bug in ion-select,
  // where update doesn't propagate after options are updated.
  afterOptionsUpdate() {
    if (this.selectField) {
      this.selectField.patchValue(null, {
        onlySelf: true,
        emitEvent: false,
      });
      this.selectField.patchValue(this.value, {
        onlySelf: true,
        emitEvent: false,
      });
    }
    this.setCustomError();
  }

  writeValue(obj: any): void {
    let value = this.value;
    if (this.config.hasEmptyValue) {
      obj = obj !== this.config.emptyValue ? obj : null;
    }
    this.value = obj;
    const force = this.config
      ? get(this.config, 'forceListItems', false)
      : false;
    if (force) {
      value = this.filterValues(obj);
    } else {
      value = obj;
    }
    console.log('write', obj);
    this.formGroup.setValue({ select: obj });
    this.formGroup.updateValueAndValidity();
    this.setCustomError();
    this.cdRef.markForCheck();
    this.cdRef.detectChanges();
  }

  filterValues(obj: any) {
    return obj;
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled || this.inputReadonly) {
      this.formGroup.disable({ emitEvent: true });
    } else {
      this.formGroup.enable({ emitEvent: true });
    }
    this.setCustomError();
    this.cdRef.markForCheck();
  }

  get selectField() {
    return this.formGroup.get('select');
  }
  get useIcon(): boolean {
    return this.config.hasOwnProperty('useIcon') ? true : false;
  }

}
