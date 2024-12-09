import {useEffect, useRef} from 'react';

import {PropsTippyHeadless} from './interfaces';
import clsx from 'clsx';
import styles from './Tippy.module.scss';

function TippyHeadless({
	children,
	visible,
	onClickOutside,
	render,
	position = 'bottom-center',
}: PropsTippyHeadless) {
	const ref = useRef<any>(null);

	useEffect(() => {
		const handleClick = (e: any) => {
			if (ref.current && !ref.current.contains(e.target)) {
				onClickOutside();
			}
		};
		document.addEventListener('click', handleClick);
		return () => document.removeEventListener('click', handleClick);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={styles.container} ref={ref}>
			<div>{children}</div>
			<div
				className={clsx(styles.main, styles[position], {
					[styles.active]: visible,
				})}
			>
				{render()}
			</div>
		</div>
	);
}

export default TippyHeadless;
