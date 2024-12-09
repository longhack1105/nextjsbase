export interface PropsPositionContainer {
  children: any;
  open: boolean;
  onClose: () => void;
  disableOverlay?: boolean;
  idParent?: string;
  classStyle?: {
    main: string;
    open: string;
  };
}
