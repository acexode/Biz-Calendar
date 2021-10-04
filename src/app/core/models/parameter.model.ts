export interface Parameter {
   code: string;
    uid: string;
    name: string;
    value: string | any;
}
export interface ParameterState {
  init: boolean;
  parameters: Array<Parameter> | null;
}
