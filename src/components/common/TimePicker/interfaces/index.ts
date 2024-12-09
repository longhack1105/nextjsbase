export interface PropsTimePicker {
  value: Time;
  onSetValue: (data: any) => void;
  [props: string]: any;
}

export interface Time {
  formatted24?: string; // 24 hour format
  formatted12?: string; // 12 hour mode
  formattedSimple?: string; // similar to formatted (12h), but no meridiem
  hour?: number; // 24 hour
  hour12?: number;
  minute?: number;
  meridiem?: string;
  isValid?: boolean;
}
