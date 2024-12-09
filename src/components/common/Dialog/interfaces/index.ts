export interface PropsDialog {
  titleLock?: string;
  titleUnLock?: string;
  titleCancel?: string;
  open: boolean;
  title: string;
  note?: string;
  Icon?: any;
  isLock?: boolean;
  onClose: () => any;
  onSubmit: () => any;
  [props: string]: any;
}
