import { IonInputConfig } from 'src/app/shared/models/components/ion-input-config';

interface InputStyleGuideCong {
  disabledConfig?: IonInputConfig;
  filledConfig?: IonInputConfig;
  focusedConfig?: IonInputConfig;
}
export const inputStyleGuideConfigurations: InputStyleGuideCong = {
  disabledConfig: {
    placeholder: 'Cannot edit',
    type: 'email',
    inputMode: 'email',
    size: 100,
    inputLabel: {
      text: 'Disabled',
      classes: '',
      slot: '',
    },
    clearable: true,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: true,
  },
  filledConfig: {
    placeholder: 'Cannot edit',
    type: 'email',
    inputMode: 'email',
    size: 100,
    inputLabel: {
      text: 'Filled',
      classes: '',
      slot: '',
    },
    clearable: true,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: false,
  },
  focusedConfig: {
    placeholder: 'Type here',
    type: 'email',
    inputMode: 'email',
    size: 100,
    inputLabel: {
      text: 'Focused',
      classes: '',
      slot: '',
    },
    clearable: true,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: false,
    isInputFocused: true,
  },
};
