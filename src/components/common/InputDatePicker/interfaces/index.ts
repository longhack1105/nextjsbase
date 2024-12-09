export interface PropsInputDatePicker {
  date: Date | null;
  setDate: (any: any) => void;
  placeholder?: string;
  onClick?: (date: Date) => void;
  label?: string | React.ReactNode;
}
