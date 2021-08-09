import { TextAreaConfig } from 'src/app/shared/models/components/ion-textarea-config';
interface TextAreaStyleGuideCong {
  default?: TextAreaConfig;
  disabledConfig?: TextAreaConfig;
  filledConfig?: TextAreaConfig;
  focusedConfig?: TextAreaConfig;
  errorConfig?: TextAreaConfig;
}
export const ionTextAreaConfigData: TextAreaStyleGuideCong =
{
  default: {
    textAreaLabel: {
      text: 'Text area - default',
      classes: '',
      slot: '',
    },
    placeholder: 'Type Here',
    disabled: false
  },
  disabledConfig: {
    textAreaLabel: {
      text: 'Text area - disabled',
      classes: '',
      slot: '',
    },
    placeholder: 'Type Here',
    disabled: true
  },
  filledConfig: {
    textAreaLabel: {
      text: 'Text area - filled',
      classes: '',
      slot: '',
    },
    placeholder: 'Type Here',
    disabled: false
  },
  focusedConfig: {
    textAreaLabel: {
      text: 'Text area - focused',
      classes: '',
      slot: '',
    },
    placeholder: 'Type Here',
    disabled: false,
    isFocused: true
  },
  errorConfig: {
    textAreaLabel: {
      text: 'Text area - error',
      classes: '',
      slot: '',
    },
    placeholder: 'Type Here',
    disabled: false,
    hasError: true
  },
};

