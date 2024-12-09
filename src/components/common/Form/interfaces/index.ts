export interface PropsForm {
  children: React.ReactNode;
  value?: any;
  form: any;
  setForm(value: any): void;
  onSubmit?: () => void;
}
