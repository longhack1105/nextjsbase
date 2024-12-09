export interface PropsFilterTable {
  children?: any;
  placeholderInputSearch?: string;
  placeholderTime?: string;
  isTime?: boolean;
  isTimeByMonth?: boolean;
  isSearch?: boolean;
  funcAddNew?: () => void;
  titleAddNew?: string;
  funcExportExcel?: () => void;
  keyTypeDate?: string;
  keydateFrom?: string;
  keyDateTo?: string;
}
