
import { get, has, assignIn } from 'lodash';
import { IonInputConfig } from '../models/components/ion-input-config';

export const inputConfigHelper = (conf: {
  label: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  displayFormat?: string;
  custom?: IonInputConfig;
  inputMode?: string;
}): IonInputConfig => {
  const config: IonInputConfig = {
    type: get(conf, 'type', 'text'),
    placeholder: get(conf, 'placeholder', ''),
    inputLabel: {
      text: get(conf, 'label', ''),
      classes: 'mb-8',
    },
    disabled: conf.disabled || false,
    displayFormat: conf.displayFormat,
    inputMode: get(conf, 'inputMode', 'none'),
  };
  if (has(conf, 'custom')) {
    return assignIn(config, get(conf, 'custom', {}));
  } else {
    return config;
  }
};
