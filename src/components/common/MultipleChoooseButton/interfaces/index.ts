export interface Option {
  id: string;
  label: string;
}

export interface DropdownProps {
  label: string;
  options: Option[];
  onSelect: (selected: string) => void;
}
