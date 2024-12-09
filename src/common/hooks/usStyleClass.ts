export const useStyleClass = (props: any, style: any) => {
	let styleProps: Array<any> = [];

	for (let i in props) {
		styleProps.push(i);
	}

	const convert: any = styleProps.map((item) => {
		if (style[item] !== undefined) {
			return {[style[item]]: !!props[item]};
		}
	});
	return convert;
};
