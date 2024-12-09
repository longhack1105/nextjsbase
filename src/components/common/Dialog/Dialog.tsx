import Button from '../Button';
import Popup from '~/components/common/Popup';
import { PropsDialog } from './interfaces';
import { RiErrorWarningFill } from 'react-icons/ri';
import clsx from 'clsx';
import i18n from '~/locale/i18n';
import styles from './Dialog.module.scss';
import { useStyleClass } from '~/common/hooks/usStyleClass';
import { BsQuestionCircleFill } from 'react-icons/bs';

function Dialog({
  titleSubmit = i18n.t('Đồng ý'),
  titleCancel = i18n.t('Huỷ'),
  ...props
}: PropsDialog) {
  const styleClass = useStyleClass(props, styles);

  return (
    <Popup open={props.open} onClose={props.onClose}>
      <div className={clsx('effectZoom', styles.popup, styleClass)}>
        <div className={styles.iconWarn}>
          {props?.question ? <BsQuestionCircleFill /> : <RiErrorWarningFill />}
        </div>
        <h4 className={styles.titlePopup}>{i18n.t(props.title)}</h4>
        <p className={styles.note}>{i18n.t(props?.note || "")}</p>
        <div className={styles.groupBtnPopup}>
          <div>
            <Button
              className={clsx('click', styles.cancel)}
              grey_3
              rounded_8
              bold
              w_fit
              p_8_12
              min_w_80
              onClick={props.onClose}
            >
              {i18n.t(titleCancel)}
            </Button>
          </div>
          <div>
            <Button
              className="click"
              primary
              bold
              w_fit
              rounded_8
              p_8_12
              min_w_80
              onClick={props.onSubmit}
              {...props}
            >
              {i18n.t(titleSubmit)}
            </Button>
          </div>
        </div>
      </div>
    </Popup>
  );
}

export default Dialog;
