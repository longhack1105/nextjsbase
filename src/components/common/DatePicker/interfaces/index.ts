export interface PropsDatePicker {
  onClose: () => void;
  onSetValue: (any: any) => void;
  value: Date | null;
  open?: boolean;
  onClick?: (date: Date) => void;
}
