export interface PropsDateTypeOption {
  date: {
    from: Date | null;
    to: Date | null;
  } | null;
  setDate: (any: any) => void;
  show: boolean;
  setShow: (any: any) => void;
  keyTypeDate?: string;
  keydateFrom?: string;
  keyDateTo?: string;
}
