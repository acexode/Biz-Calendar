import { IonTextItem } from './ion-text-item';

export interface TextAreaConfig {
  textAreaLabel?: IonTextItem;
  placeholder?: string;
  inputMode?: 'decimal' | 'email' | 'none' | 'numeric' | 'search' | 'tel' | 'text' | 'url';
  autoGrow?: boolean;
  textAreaClasses?: string;
  maxLength?: number;
  minLength?: number;
  disabled?: boolean;
  readonly?: boolean;
  isInputFocused?: boolean;
  hasError?: boolean;
}
