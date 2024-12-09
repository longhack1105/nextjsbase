import {useEffect, useRef} from 'react';

import {PropsClickOpen} from './interfaces';

function ClickOpen({children, onClick, duration = 100}: PropsClickOpen) {
	const ref = useRef<any>(null);

	useEffect(() => {
		if (ref) {
			return () => clearTimeout(ref.current);
		}
	}, []);

	return (
		<div
			onClick={() => {
				onClick(false);
				ref.current = setTimeout(() => onClick(true), duration);
			}}
		>
			{children}
		</div>
	);
}

export default ClickOpen;
