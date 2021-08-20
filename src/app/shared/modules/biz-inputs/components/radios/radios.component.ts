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
import { get } from 'lodash';
import { IonRadioInputOption } from 'src/app/shared/models/components/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/components/ion-radios-config';

@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrls: ['./radios.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadiosComponent,
      multi: true,
    },
  ],
})
export class RadiosComponent implements OnInit, ControlValueAccessor {
  @Input() config: IonRadiosConfig;
  @Input() @Input() set options(opts: Array<IonRadioInputOption>) {
    this.opts = opts ? opts : [];
    this.updateItems();
  }
  // Avoid custom code that may break Ionic stuff.
  // Capture Angular parent control
  @Input() formControl: FormControl;
  @Input() formControlName: string;
  formGroup = this.fb.group({
    radio: this.fb.control(null),
  });

  onChange: (_: any) => void;
  onTouched: () => void;
  value: any;

  // get ahold of FormControl instance no matter formControl or formControlName is given.
  // If formControlName is given, then controlContainer.control is the parent FormGroup/FormArray instance.
  get parentControl() {
    return (
      this.formControl ||
      this.controlContainer.control.get(this.formControlName)
    );
  }

  items: Array<{
    id: any;
    label: string;
    disabledStatus: boolean;
  }> = [];
  private opts: Array<IonRadioInputOption> = [];

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public controlContainer: ControlContainer
  ) { }

  get inputControl() {
    return this.formGroup.get('radio');
  }
  getFieldValue() {
    const field = this.formGroup.get('radio');
    return field ? field.value : null;
  }
  ngOnInit() {
    this.formGroup.valueChanges.subscribe((vals) => {
      if (this.onChange) {
        this.onChange(this.getFieldValue());
        this.setCustomError();
      }
    });
  }

  updateItems() {
    const labelK = get(this.config, 'labelKey', 'label');
    const idK = get(this.config, 'idKey', 'id');
    const disabledKey = get(this.config, 'disabledKey', 'disabledStatus');
    this.items = this.opts
      .map((v) => ({
        id: get(v, idK, null),
        label: get(v, labelK, null),
        disabledStatus: get(v, disabledKey, null),
      }))
      .filter((vv) => get(vv, 'id', null) !== null);
    this.cdRef.markForCheck();
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.formGroup.setValue({ radio: obj });
    this.formGroup.updateValueAndValidity();
    this.setCustomError();
    this.cdRef.markForCheck();
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable({ emitEvent: true });
    } else {
      this.formGroup.enable({ emitEvent: true });
    }
    this.setCustomError();
    this.cdRef.markForCheck();
  }

  get controlI() {
    return this.formGroup.get('radio');
  }

  get controlValue() {
    return this.controlI ? this.controlI.value : null;
  }

  toggleRadio(item) {
    if (this.controlI.disabled) {
      return;
    }
    this.controlI.setValue(item.id);
    this.setCustomError();
    this.cdRef.markForCheck();
  }

  setCustomError() {
    const hasErr = this.parentControl
      ? !get(this.parentControl, 'valid', true)
      : false;
    if (hasErr) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      this.controlI.setErrors({ INVALID_INPUT: true });
    }
  }
}
