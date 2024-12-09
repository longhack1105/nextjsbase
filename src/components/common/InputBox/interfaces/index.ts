export interface InputBoxProps {
  label?: string;
  value: string | null;
  onChange?: (value: string) => void;
  isButtonCode?: boolean;
  titleCodeBtn?: string;
  onClick?: () => void;
  isCheckEmail?: boolean;
  isButton?: boolean;
  titleButton?: string;
  onSubmit?: () => void;
  icon?: any;
  isReady?: boolean;
  eyeHidden?: any;
  isButtonInInput?: boolean;
}
