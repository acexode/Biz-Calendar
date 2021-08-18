import { IonInputIcon } from './ion-input-icon-option';
import { IonTextItem } from './ion-text-item';

export interface IonSelectConfig {
  inputLabel: IonTextItem;
  multiple?: boolean;
  idKey?: string;
  labelKey?: string;
  alertOptions?: any;
  mode?: any;
  forceListItems: boolean;
  placeholder?: string;
  disabled?: boolean;
  hasEmptyValue?: boolean;
  emptyValue?: any;
  useIcon?: IonInputIcon;
}
