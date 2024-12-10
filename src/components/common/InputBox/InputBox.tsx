import React, { useEffect, useState } from 'react';
import styles from './InputBox.module.scss';
import { InputBoxProps } from './interfaces/index';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { RootState, store } from '~/redux/store';
import { setIsActiveCodeBtn } from '~/redux/reducer/site';
import useDebounce from '~/common/hooks/useDebounce';
import ImageFill from '../ImageFill';
import ImageFillElement from '../ImageFill_2';
import Button from '../Button';

const InputBox: React.FC<InputBoxProps> = ({
  label,
  isButtonCode,
  titleCodeBtn,
  value,
  onChange,
  onClick,
  isCheckEmail = false,
  isButton,
  titleButton,
  onSubmit,
  isReady,
  icon,
  isButtonInInput = false,
  eyeHidden,
}) => {
  const [isCheck, setIsCheck] = useState<boolean>(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCounting, setIsCounting] = useState(false); // Trạng thái để kiểm soát việc đếm ngược
  const debouncedTimeLeft = useDebounce(timeLeft, 10000); // Cập nhật mỗi 10 giây
  const [isHidden, setIsHidden] = useState<boolean>(true);

  useEffect(() => {
    console.log(eyeHidden);

    if (eyeHidden) setIsHidden(false);
    else setIsHidden(true);
  }, []);

  useEffect(() => {
    if (!isCounting || timeLeft === 0) {
      if (timeLeft === 0) setIsCounting(false); // Dừng đếm khi timeLeft đạt 0
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000); // Giảm 1 giây mỗi giây

    return () => clearInterval(intervalId);
  }, [isCounting, timeLeft]);

  useEffect(() => {
    if (debouncedTimeLeft > 0) {
    }
  }, [debouncedTimeLeft]);

  const handleStartCountdown = () => {
    setTimeLeft(60);
    setIsCounting(true);
  };
  useEffect(() => {
    if (isCheckEmail && value && emailRegex.test(value)) {
      store.dispatch(setIsActiveCodeBtn(true));
    } else {
      store.dispatch(setIsActiveCodeBtn(false));
    }
  }, [value, isCheckEmail]);
  const isActiveCodeBtn = useSelector((state: RootState) => state?.site?.isActiveCodeBtn);

  useEffect(() => {
    if (isButtonCode && value && value.length === 6) {
      setIsCheck(true);
    } else setIsCheck(false);
  }, [isButtonCode, value]);
  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>
      <div
        className={clsx(styles.inputGroup, {
          [styles.inputGroup_2]: isButtonInInput,
        })}
      >
        <input
          type={!isHidden ? 'password' : 'text'}
          value={value ? value : ''}
          onChange={(e) => onChange?.(e.target.value)}
          className={clsx(styles.input, {
            [styles.input_2]: isButtonInInput,
          })}
        />
        {isButtonCode && isCounting && (
          <button
            className={clsx(styles.button_countdown, {
              [styles.active]: isActiveCodeBtn,
            })}
          >
            (Gửi lại) {`${timeLeft} s`}
          </button>
        )}
        {isButtonCode && isCheck && (
          <div className={styles.check}>
            <ImageFillElement src={""} width={16} height={16} />
          </div>
        )}
        {isButtonCode && !isCounting && (
          // <button
          //   className={clsx(styles.button, {
          //     [styles.active]: isActiveCodeBtn,
          //   })}
          //   onClick={() => handleStartCountdown()}
          // >
          //   {titleCodeBtn}
          // </button>
          <div
            className={clsx(styles.buttonMain, {
              [styles.active]: true,
            })}
          >
            <Button primary rounded_8 onClick={() => handleStartCountdown()}>
              {titleCodeBtn}
            </Button>
          </div>
        )}

        {isButton && (
          // <button
          //   className={clsx(styles.button, {
          //     [styles.active]: isReady,
          //     [styles.button_2]: isButtonInInput,
          //   })}
          // >
          //   {titleButton}
          // </button>
          <div
            className={clsx(styles.buttonMain, {
              [styles.active]: isReady,
            })}
          >
            <Button primary rounded_8 onClick={onSubmit}>
              {titleButton}
            </Button>
          </div>
        )}

        {icon && (
          <ImageFillElement
            src={!isHidden ? eyeHidden : icon}
            classname={styles.icon}
            onClick={() => setIsHidden(!isHidden)}
          />
        )}
      </div>
    </div>
  );
};

export default InputBox;
