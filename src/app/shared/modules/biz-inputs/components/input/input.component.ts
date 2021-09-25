import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { IonInputConfig } from 'src/app/shared/models/components/ion-input-config';
import { BizInputsService } from '../../services/biz-inputs.service';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { distinctCheckObj } from 'src/app/core/helpers/distinct-check.helper';
import { get } from 'lodash';
import { removeMask } from 'src/app/shared/data/input-mask-remover';
import { listOfErrors, shouldShowErrors } from 'src/app/core/helpers/input.error.helper';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit {
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() config: IonInputConfig;

  // Avoid custom code that may break Ionic stuff.
  // Capture Angular parent control
  @Input() formControl: FormControl;
  @Input() formControlName: string;
  // get ahold of FormControl instance no matter formControl or formControlName is given.
  // If formControlName is given, then controlContainer.control is the parent FormGroup/FormArray instance.
  get parentControl(): any {
    return (
      this.formControl ||
      this.controlContainer.control.get(this.formControlName)
    );
  }

  onChange: (_: any) => void;
  onTouched: () => void;
  value: any;
  clearedOnce = false;
  parentSub;

  formGroup = this.fb.group({
    input: this.fb.control(null),
  });

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public controlContainer: ControlContainer,
    private oS: BizInputsService
  ) { }
  get inputControl() {
    return this.formGroup.get('input');
  }
  get inputReadonly() {
    return (
      (this.config?.readonly || false) ||
      (this.parentControl?.readonly || false)
    );
  }
  writeValue(obj: any, selfW = false): void {
    this.value = obj;
    this.formGroup.setValue({ input: obj });
    this.formGroup.updateValueAndValidity();
    this.cdRef.markForCheck();
    if (!selfW) {
      this.setCustomError();
      this.clearedOnce = false;
    }
  }
  registerParentValidationState() {
    if (this.parentControl) {
      unsubscriberHelper(this.parentSub);
      this.parentSub = this.parentControl.statusChanges
        .pipe(
          filter((v) => (
            v !== 'PENDING' &&
            (v !== this.inputControl.status || v !== this.formGroup.status)
          )),
          distinctUntilChanged(distinctCheckObj)
        )
        .subscribe((_v: any) => {
          this.setCustomError();
          this.formGroup.markAllAsTouched();
        });
    }
  }

  registerOnChange(fn: any): void {
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

  getFieldValue() {
    const field = this.formGroup.get('input');
    if (this.config.maskActive) {
      return field ? removeMask(field.value) : null;
    } else {
      return field ? field.value : null;
    }
  }

  ngOnInit() {
    this.formGroup.valueChanges.subscribe((vals) => {
      if (this.onChange) {
        this.onChange(this.getFieldValue());
        this.setCustomError();
      }
    });
    // disable form =>
    if (this.isDisable) {
      this.formGroup.disable();
    }
    /*  */
    if (this.inputReadonly) {
      this.inputControl.disable();
    }
    this.registerParentValidationState();
    this.setCustomError();
  }

  onMouseDown($event: any) {
    // Replace this with the clearOnEdit property on ion-input.
    // If we only want it cleared on input.
    if (this.config.clearOnEdit && !this.clearedOnce) {
      this.formGroup.get('input').reset(null);
      this.formGroup.updateValueAndValidity();
      this.setCustomError();
      this.clearedOnce = true;
    }
  }
  setCustomError() {
    const hasErr = this.parentControl
      ? !get(this.parentControl, 'valid', true)
      : false;
    if (hasErr) {
      this.inputControl.setErrors(
        this.oS.addInvalidInputError(this.inputControl.errors)
      );
      this.formGroup.setErrors(
        this.oS.addInvalidInputError(this.formGroup.errors)
      );
      let vLen = 0;
      try {
        vLen = this.inputControl.value.toString().length;
      } catch (err) {
        vLen = 0;
      }
      if (vLen > 0 || this.parentControl.touched) {
        this.formGroup.markAllAsTouched();
      }
    } else {
      this.inputControl.setErrors(
        this.oS.clearInvalidInputError(this.inputControl.errors)
      );
      this.formGroup.setErrors(
        this.oS.clearInvalidInputError(this.formGroup.errors)
      );
    }
    this.cdRef.detectChanges();
  }

  get isDisable() {
    return get(this.config, 'disabled', false);
  }

  get useIcon(): boolean {
    return this.config.hasOwnProperty('useIcon') ? true : false;
  }
  get isError(): boolean {
    return shouldShowErrors(this.parentControl || this.inputControl);
  }
  getErrorList() {
    if (this.isError) {
      return listOfErrors(this.parentControl || this.inputControl);
    }
  }
}
