import { IonInputIcon } from './ion-input-icon-option';
import { IonTextItem } from './ion-text-item';

export interface IonInputConfig {
  inputLabel?: IonTextItem;
  placeholder?: string;
  inputName?: string;
  type?: string;
  size?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  inputClasses?: string;
  spinnerConfig?: {
    // Number input.
    step?: number;
  };
  maskActive?: boolean;

  // Text types.
  clearable?: boolean;
  clearOnEdit?: boolean;

  // General properties.
  maxLength?: number;
  minLength?: number;
  autoComplete?: boolean;
  autoCorrect?: boolean;
  autoCapitalize?: string;
  inputMode?: 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url';
  readonly?: string;
  bgwhite?: boolean;
  useIcon?: IonInputIcon;
  isInputFocused?: boolean;
  inputHasError?: boolean;
}