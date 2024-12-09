import {Fragment} from 'react';
import Portal from '../Portal';
import {PropsLoading} from './interfaces';
import styles from './Loading.module.scss';

function Loading({loading}: PropsLoading) {
	return (
		<Fragment>
			{loading ? (
				<Portal>
					<div className={styles.container}>
						<div className={styles.ldsSpinner}>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
							<div></div>
						</div>
					</div>
				</Portal>
			) : null}
		</Fragment>
	);
}

export default Loading;
