import { IonAssistiveText } from './ion-assistive-text-config';
import { IonInputIcon } from './ion-input-icon-option';
import { IonTextItem } from './ion-text-item';

export interface IonInputConfig {
  inputLabel?: IonTextItem;
  placeholder?: string;
  inputName?: string;
  displayFormat?: string;
  type?: string;
  size?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  inputClasses?: string;
  spinnerConfig?: {
    // Number input.
    step?: number;
    textAlign?: boolean;
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
  readonly?: string | boolean;
  bgwhite?: boolean;
  useIcon?: IonInputIcon;
  isInputFocused?: boolean;
  inputHasError?: boolean;
  inputAssistiveText?: IonAssistiveText;
  hidAssistiveText?: boolean;
  removeInputItemBaseLine?: boolean;
  debounce?: number;
  mode?: 'ios' | 'md';
  pattern?: 'text' | 'search' | 'tel' | 'url' | 'email' | 'date' | 'password';
}
