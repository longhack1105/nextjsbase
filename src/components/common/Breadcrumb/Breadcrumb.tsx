import {Fragment} from 'react';
import Link from 'next/link';
import {PropsTagPage} from './interfaces';
import {RiArrowRightSLine} from 'react-icons/ri';
import clsx from 'clsx';
import styles from './Breadcrumb.module.scss';

function Breadcrumb({titles, listHref}: PropsTagPage) {
	return (
		<div className={styles.container}>
			{titles.map((v, i) => (
				<Fragment key={i}>
					{i !== 0 ? (
						<span className={styles.icon}>
							<RiArrowRightSLine />
						</span>
					) : null}
					{titles.length - 1 == i ? (
						<span className={clsx(styles.item, styles.last)}>
							{v}
						</span>
					) : (
						<Link
							href={listHref?.[i] ? listHref[i] : '/'}
							key={i}
							className={clsx(styles.item, {
								[styles.last]: i == titles.length - 1,
							})}
						>
							{v}
						</Link>
					)}
				</Fragment>
			))}
		</div>
	);
}

export default Breadcrumb;
