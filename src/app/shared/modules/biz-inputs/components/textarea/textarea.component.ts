import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, Validators, ControlContainer, FormControl } from '@angular/forms';
import { get } from 'lodash';
import { TextAreaConfig } from 'src/app/shared/models/components/ion-textarea-config';
@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
})

export class TextareaComponent implements OnInit, ControlValueAccessor {
  @Input() config: TextAreaConfig;// Avoid custom code that may break Ionic stuff.
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
  formGroup = this.fb.group({
    textarea: this.fb.control(null),
  });
  constructor(private fb: FormBuilder, public controlContainer: ControlContainer) { }
  writeValue(obj: any): void {
    this.value = obj;
    this.formGroup.setValue({ textarea: obj });
    this.formGroup.updateValueAndValidity();
  }
  registerOnChange(fn: any): void {
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
  }

  getFieldValue() {
    const field = this.formGroup.get('textarea');
    return field ? field.value : null;
  }
  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe((vals) => {
      if (this.onChange) {
        this.onChange(this.getFieldValue());
      }
    });
    if (this.isDisable) {
      this.formGroup.disable();
    }
  }

  get isDisable() {
    return get(this.config, 'disabled', false);
  }
  get inputReadonly() {
    return (
      (this.config?.readonly || false) ||
      (this.parentControl?.readonly || false)
    );
  }

}

