export interface PropsRangeDatePicker {
	onClose: () => void;
	onSetValue: (any: any) => void;
	onSubmit?: () => void;
	value: any;
	open?: boolean;
}
