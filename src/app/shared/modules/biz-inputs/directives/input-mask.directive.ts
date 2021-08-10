import {
  Directive,
  ElementRef,
  HostListener,
  Injectable,
  Input,
  Renderer2,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Mask } from '../classes/mask';

@Directive({
  selector: '[appInputMask]',
})
/** Mask used on answer component */
@Injectable()
export class InputMaskDirective extends Mask {
  @Input() maskActive = false;

  constructor(
    private renderer: Renderer2,
    @Self() public ngControl?: NgControl
  ) {
    super();
  }

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent): void {
    const el: HTMLInputElement = event.target as HTMLInputElement;
    if (this.maskActive) {
      const value = this.fitToMask(el.value);
      this.writeValue(value, event.target);
    }
  }

  /**
   * write the new value on input element and form control
   *
   *  @param value value to write
   * @param target input element
   */
  private writeValue(value: string | null, target: any): void {
    target.value = value;
    this.renderer.setProperty(target, 'value', value);
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(value);
      this.ngControl.control.markAsDirty();
      this.ngControl.control.updateValueAndValidity();
    }
  }
}
