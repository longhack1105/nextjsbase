import { ContextData, PropsInput } from './interfaces';
import { RiCheckFill, RiCloseCircleFill, RiEyeLine, RiEyeOffLine } from 'react-icons/ri';
import { convertCoin, price } from '~/common/func/convertCoin';
import { useContext, useEffect, useState } from 'react';

import { FormContext } from '../../contexts';
import clsx from 'clsx';
import isEmail from '~/common/func/isEmail';
import { isValidPassword } from '~/common/func/optionConvert';
import styles from './Input.module.scss';
import i18n from '~/locale/i18n';

function Input({
  loginTitle = false,
  label,
  note,
  type = 'text',
  placeholder = '',
  name,
  blur = true,
  showDone = false,
  onClean = false,
  bgGrey = false,
  readOnly = false,
  checkEmail,
  className,
  ...props
}: PropsInput) {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const data = useContext<ContextData>(FormContext);

  const isPassword = type === 'password';

  /********** Xử lí khi submit, kiểm tra validate input **********/
  useEffect(() => {
    if (data.countValidate > 0) {
      handleSetMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.countValidate]);

  /********** Xử lí khi value input thay đổi, kiểm tra validate input **********/
  useEffect(() => {
    data.setValidate((prev: any) => ({
      ...prev,
      [name]: handleValidate(),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.form]);

  /********** Kiểm tra thay đổi value confirm **********/
  useEffect(() => {
    if (
      props.valueConfirm &&
      data.form[name] !== props.valueConfirm &&
      data.form[name] !== ''
    ) {
      return data.setErrorText((prev: any) => ({
        ...prev,
        [name]: props.textConfirm || 'Mật khẩu không trùng khớp',
      }));
    } else {
      data.setErrorText((prev: any) => ({
        ...prev,
        [name]: null,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.valueConfirm]);

  const handleClickbtn = () => {
    if (props.isActiveButton && props.onClick) {
      props.onClick();
    }
  };

  const handleToggleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleClean = () => {
    data.setForm((prev: any) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handlerFocused = () => {
    setIsFocus(true);
    data.setErrorText((prev: any) => ({
      ...prev,
      [name]: null,
    }));
  };

  const handleChange = (e: any) => {
    const { value, name } = e.target;

    if (props?.isMoney) {
      if (!Number(price(value))) {
        return data.setForm((prev: any) => ({
          ...prev,
          [name]: 0,
        }));
      }
      return data.setForm((prev: any) => ({
        ...prev,
        [name]: convertCoin(Number(price(value))),
      }));
    }

    if (props?.isMoneyDecimal) {
      if (value.charAt(value.length - 1) == '.') {
        var value_ = value.replaceAll('.', '') + '.';
        return data.setForm((prev: any) => ({
          ...prev,
          [name]: value_,
        }));
      }

      if (!Number(price(value))) {
        return data.setForm((prev: any) => ({
          ...prev,
          [name]: 0,
        }));
      }

      return data.setForm((prev: any) => ({
        ...prev,
        [name]: convertCoin(Number(price(value))),
      }));
    }

    return data.setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlerBlur = () => {
    setIsFocus(false);
    if (blur) {
      handleSetMessage();
      /********** return validate passed **********/
      return data.setValidate((prev: any) => ({
        ...prev,
        [name]: handleValidate(),
      }));
    }
  };

  /********** Hiển thị message thông báo validate **********/
  const handleSetMessage = () => {
    data.setErrorText((prev: any) => ({
      ...prev,
      [name]: null,
    }));
    if (
      (props.isRequired && `${data.form[name]}`.trim() === '') ||
      (!data.form[name] && data.form[name] != 0 && props.isRequired)
    ) {
      return data.setErrorText((prev: any) => ({
        ...prev,
        [name]: props.textRequired || 'Vui lòng nhập trường này',
      }));
    }
    if (!!data.form[name]) {
      if (props.isNumber) {
        if (!Number(data.form[name])) {
          return data.setErrorText((prev: any) => ({
            ...prev,
            [name]: 'Vui lòng chỉ nhập số',
          }));
        }
      }

      if (props.isPhone) {
        if (data.form[name]?.length !== 10) {
          return data.setErrorText((prev: any) => ({
            ...prev,
            [name]: 'Định dạng số điện thoại không đúng',
          }));
        }

        for (let i of data.form[name]) {
          if (isNaN(Number(i))) {
            return data.setErrorText((prev: any) => ({
              ...prev,
              [name]: 'Định dạng số điện thoại không đúng',
            }));
          }
        }
      }

      if (props.valueConfirm && data.form[name] !== props.valueConfirm) {
        return data.setErrorText((prev: any) => ({
          ...prev,
          [name]: props.textConfirm || 'Mật khẩu không trùng khớp',
        }));
      }

      if (props.isPassword && !isValidPassword(data.form[name])) {
        return data.setErrorText((prev: any) => ({
          ...prev,
          [name]: props.textValidatePassword || 'Mật khẩu 6-50 ký tự',
        }));
      }

      if (props.isEmail && !isEmail(data.form[name])) {
        return data.setErrorText((prev: any) => ({
          ...prev,
          [name]: 'Định dạng email không chính xác',
        }));
      }
      if (
        type != 'number' &&
        props.max &&
        `${data.form[name]}`.trim().length > Number(props.max)
      ) {
        return data.setErrorText((prev: any) => ({
          ...prev,
          [name]: `Nhập tối đa ${props.max} kí tự`,
        }));
      } else if (type == 'number') {
        if (props.max && data.form[name] > Number(props.max)) {
          return data.setErrorText((prev: any) => ({
            ...prev,
            [name]: `Nhập tối đa ${props.max}`,
          }));
        }
      }

      if (
        type != 'number' &&
        props.min &&
        `${data.form[name]}`.trim().length < Number(props.min)
      ) {
        return data.setErrorText((prev: any) => ({
          ...prev,
          [name]: `Nhập tối thiểu ${props.min} kí tự`,
        }));
      } else if (type == 'number') {
        if (props.min && data.form[name] < Number(props.min)) {
          return data.setErrorText((prev: any) => ({
            ...prev,
            [name]: `Nhập tối thiểu ${props.min}`,
          }));
        }
      }

      if ((props.minNum || props.minNum == 0) && data.form[name] < Number(props.minNum)) {
        return data.setErrorText((prev: any) => ({
          ...prev,
          [name]: `Nhập tối thiểu ${props.minNum}`,
        }));
      }
      if ((props.maxNum || props.maxNum == 0) && data.form[name] > Number(props.maxNum)) {
        return data.setErrorText((prev: any) => ({
          ...prev,
          [name]: `Nhập tối đa ${props.maxNum}`,
        }));
      }
    }
  };

  /********** Check validate **********/
  const handleValidate = () => {
    if (
      (props.isRequired && `${data.form[name]}`.trim() === '') ||
      (!data.form[name] && data.form[name] != 0 && props.isRequired)
    ) {
      return false;
    }

    if (!!data.form[name] && `${data.form[name]}`.trim() !== '') {
      if (props.isNumber) {
        if (!Number(data.form[name])) {
          return false;
        }
      }

      if (props.isPhone) {
        if (data.form[name]?.length !== 10) {
          return false;
        }

        for (let i of data.form[name]) {
          if (isNaN(Number(i))) {
            return false;
          }
        }
      }

      if (props.isPassword && !isValidPassword(data.form[name])) {
        return false;
      }

      if (props.valueConfirm && data.form[name] !== props.valueConfirm) {
        return false;
      }

      if (props.isEmail && !isEmail(data.form[name])) {
        return false;
      }

      if (props.max && `${data.form[name]}`.trim().length > Number(props.max)) {
        return false;
      }

      if (props.min && `${data.form[name]}`.trim().length < Number(props.min)) {
        return false;
      }

      if ((props.minNum || props.minNum == 0) && data.form[name] < Number(props.minNum)) {
        return false;
      }
      if ((props.maxNum || props.maxNum == 0) && data.form[name] > Number(props.maxNum)) {
        return false;
      }
    }
    return true;
  };

  return (
    <div
      className={clsx(styles.container, {
        [styles.error]: data?.errorText[name] !== null,
        [styles.focus]: isFocus,
      })}
    >
      {label ? (
        <label
          className={clsx(
            {
              [styles.titleAccount]: !loginTitle,
            },
            { [styles.label]: loginTitle },
          )}
        >
          {label}
          {props?.isShowRequiredLabel ? <span></span> : null}
        </label>
      ) : null}
      <div
        className={clsx({
          [styles.group]: true,
          [styles.iconGroup]: props.icon,
          [styles.focus]: isFocus,
          [styles.done]: showDone && data.isDone,
          [styles.bgGrey]: bgGrey,
          [styles.bgReadOnly]: readOnly,
        })}
      >
        {props.icon && <div className={styles.icon}>{props.icon}</div>}
        <div className={styles.inputGroup}>
          <input
            onFocus={handlerFocused}
            onChange={handleChange}
            onBlur={handlerBlur}
            className={clsx(styles.inputElement, className)}
            type={showPass ? 'text' : type}
            name={name}
            value={data.form[name]}
            placeholder={placeholder}
            autoComplete="off"
            readOnly={readOnly}
            disabled={readOnly}
          />
          {onClean && !!data.form[name] && props.isRequired ? (
            <span className={styles.toggleType} onClick={handleClean}>
              <RiCloseCircleFill color="#5e6167" />
            </span>
          ) : null}
          {!isPassword && onClean ? (
            <span className={styles.toggleType} onClick={handleToggleShowPass}>
              <RiCheckFill color={data.isDone ? '#83BF6E' : '#ffffff'} />
            </span>
          ) : null}
          {isPassword ? (
            <span className={styles.toggleType} onClick={handleToggleShowPass}>
              {showPass ? <RiEyeLine /> : <RiEyeOffLine />}
            </span>
          ) : null}
        </div>
        {props.txtBtn ? (
          <div
            className={clsx(styles.btn, {
              [styles.active]: props.isActiveButton,
            })}
            onClick={handleClickbtn}
          >
            {props.txtBtn}
          </div>
        ) : null}

        {props.unit ? (
          <div className={clsx(styles.btn, styles.unit)}>{props.unit}</div>
        ) : null}
      </div>
      {checkEmail && (
        <p className={styles.checkEmail}>
          {i18n.t('Bạn sẽ nhận được một mật khẩu về tài khoản email này')}
        </p>
      )}
      <p className={styles.errorText}>{data?.errorText[name]}</p>
      {note ? <small className={styles.note}>{note}</small> : null}
    </div>
  );
}

export default Input;
