import { IonInputConfig } from 'src/app/shared/models/components/ion-input-config';

interface InputStyleGuideCong {
  default?: IonInputConfig;
  disabledConfig?: IonInputConfig;
  filledConfig?: IonInputConfig;
  focusedConfig?: IonInputConfig;
  errorConfig?: IonInputConfig;
  defaultWithIcon?: IonInputConfig;
  filledWithIcon?: IonInputConfig;
  disabledConfigWithIcon?: IonInputConfig;
  focusedConfigWithIcon?: IonInputConfig;
  errorConfigWithIcon?: IonInputConfig;
}
export const inputStyleGuideConfigurations: InputStyleGuideCong = {
  default: {
    placeholder: 'Type here',
    type: 'text',
    inputMode: 'text',
    size: 100,
    inputLabel: {
      text: 'Default',
      classes: '',
      slot: '',
    },
    clearable: false,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: false,
  },
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
    clearable: false,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: true,
  },
  filledConfig: {
    placeholder: 'Type Here',
    type: 'text',
    inputMode: 'text',
    size: 100,
    inputLabel: {
      text: 'Filled',
      classes: '',
      slot: '',
    },
    clearable: false,
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
    clearable: false,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: false,
    isInputFocused: true,
  },
  errorConfig: {
    placeholder: 'Type here',
    type: 'email',
    inputMode: 'email',
    size: 100,
    inputLabel: {
      text: 'Error',
      classes: '',
      slot: '',
    },
    clearable: false,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: false,
    inputHasError: true,
  },
  defaultWithIcon: {
    placeholder: 'PlaceHolder',
    type: 'text',
    inputMode: 'text',
    size: 100,
    inputLabel: {
      text: 'Default',
      classes: '',
      slot: '',
    },
    clearable: false,
    inputClasses: '',
    minLength: 5,
    maxLength: 15,
    bgwhite: true,
    disabled: false,
    useIcon: {
      name: 'chevron-down'
    }
  },
  filledWithIcon: {
    placeholder: 'Type Here',
    type: 'text',
    inputMode: 'text',
    size: 100,
    inputLabel: {
      text: 'Filled',
      classes: '',
      slot: '',
    },
    clearable: false,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: false,
    useIcon: {
      name: 'chevron-down'
    }
  },
  disabledConfigWithIcon: {
    placeholder: 'Cannot edit',
    type: 'email',
    inputMode: 'email',
    size: 100,
    inputLabel: {
      text: 'Disabled',
      classes: '',
      slot: '',
    },
    clearable: false,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: true,
    useIcon: {
      name: 'chevron-down'
    }
  },
  focusedConfigWithIcon: {
    placeholder: 'Type here',
    type: 'email',
    inputMode: 'email',
    size: 100,
    inputLabel: {
      text: 'Focused',
      classes: '',
      slot: '',
    },
    clearable: false,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: false,
    isInputFocused: true,
    useIcon: {
      name: 'chevron-down'
    }
  },
  errorConfigWithIcon: {
    placeholder: 'Type here',
    type: 'email',
    inputMode: 'email',
    size: 100,
    inputLabel: {
      text: 'Error',
      classes: '',
      slot: '',
    },
    clearable: false,
    inputClasses: '',
    minLength: 10,
    maxLength: 10,
    bgwhite: true,
    disabled: false,
    inputHasError: true,
    useIcon: {
      name: 'warning-custom'
    }
  },
};
