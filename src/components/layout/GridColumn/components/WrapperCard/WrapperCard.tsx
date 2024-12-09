import clsx from 'clsx';
import styles from './WrapperCard.module.scss';
import {useStyleClass} from '~/common/hooks/usStyleClass';

function WrapperCard({children, ...props}: any) {
	const styleClass = useStyleClass(props, styles);
	return <div className={clsx(styles.container, styleClass)}>{children}</div>;
}

export default WrapperCard;
