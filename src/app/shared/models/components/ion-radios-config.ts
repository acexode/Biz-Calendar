import { TemplateRef } from '@angular/core';
import { IonTextItem } from './ion-text-item';

export interface IonRadiosConfig {
  mode: 'chip' | 'item' | 'icon' | 'r';
  inputLabel: IonTextItem;
  itemTemplateRef?: TemplateRef<any>;
  itemRefWrapperClasses?: TemplateRef<any>;
  idKey?: string;
  labelKey?: string;
  name?: string;
  itemClasses?: string;
  groupClasses?: string;
}
