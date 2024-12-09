export interface PropsSelectGetApi {
  queryKey: string;
  keyDisplay: string;
  keyValue: string;
  label?: string;
  name: string;
  form: any;
  setForm: (form: any) => void;
  http: (any: any) => any;
  placeholder?: string;
  styleGray?: boolean;
}
