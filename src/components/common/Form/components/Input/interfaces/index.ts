import isEmail from '~/common/func/isEmail';

export interface PropsInput {
  loginTitle?: boolean;
  blur?: boolean;
  isRequired?: boolean;
  isNumber?: boolean;
  isEmail?: boolean;
  isMoney?: boolean;
  readOnly?: boolean;
  isActiveButton?: boolean;
  max?: boolean | number;
  checkEmail?: boolean;
  min?: boolean | number;

  textRequired?: string;
  textConfirm?: string;
  valueConfirm?: string;
  label?: string | React.ReactNode;
  type?: string;
  note?: string;
  txtBtn?: string;
  placeholder?: string;

  onClick?: () => void;

  [props: string]: any;
}

export interface ContextData {
  isDone: boolean;
  form: any;
  validate: any;
  errorText: any;
  countValidate: any;
  setCountValidate: (any: any) => void;
  setForm: (any: any) => void;
  setErrorText: (any: any) => void;
  setValidate: (any: any) => void;
}
