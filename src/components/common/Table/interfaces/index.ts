export interface PropsTable {
  data: any;
  classTable?: string;
  column: {
    title: any;
    render: any;
    className?: string;
    checkBox?: boolean;
    textAlign?: any;
    width?: Number;
  }[];
  onSetData?: (any: any) => void;
}
