import Form, { FormContext, Input } from '~/components/common/Form';
import { ShieldTick, Sms } from 'iconsax-react';
import { useEffect, useState } from 'react';

import Button from '~/components/common/Button';
import { PropsForgotPassForm } from './interfaces';
import { httpRequest } from '~/services';
import i18n from '~/locale/i18n';
import md5 from 'md5';
import styles from './ForgotPassForm.module.scss';
import { toastError } from '~/common/func/toast';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import exampleService from '~/services/exampleService';

function ForgotPassForm({}: PropsForgotPassForm) {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    otp: '',
    password: '',
    password_confirm: '',
  });
  const [countdown, setCountdown] = useState(60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let timer: any;
    if (running && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    if (running && countdown === 0) {
      setRunning(false);
    }
    return () => clearInterval(timer);
  }, [running, countdown]);

  const handleClick = () => {
    if (form?.email) {
      if (!running) {
        sendOtp.mutateAsync();
        setCountdown(60);
        setRunning(true);
      }
    } else {
      toastError({ msg: i18n.t('Vui lòng nhập email') });
    }
  };

  const sendOtp = useMutation({
    mutationFn: () =>
      httpRequest({
        showMessageSuccess: true,
        showMessageFailed: true,
        http: exampleService.example({
          email: form?.email,
        }),
      }),
    onSuccess(data) {
      if (data) {
        // Handle success
      }
    },
  });

  const forgotPass = useMutation({
    mutationFn: () =>
      httpRequest({
        showMessageSuccess: true,
        showMessageFailed: true,
        http: exampleService.example({
          email: form?.email,
          otp: form?.otp,
          password: md5(form.password + process.env.NEXT_PUBLIC_KEY_PASS),
        }),
      }),
    onSuccess(data) {
      if (data) {
        router.push('/auth/login');
      }
    },
  });

  return (
    <Form form={form} setForm={setForm}>
      <Input
        bgGrey
        name="email"
        placeholder="example@gmail.com"
        label="Nhập Email đăng nhập"
        isRequired
        isEmail
      />
      <Input
        bgGrey
        name="otp"
        placeholder={'e.g.000345'}
        // label={i18n.t("Mã xác nhận")}
        label={'Mã xác minh'}
        txtBtn={
          countdown !== 0 && running
            ? `${i18n.t('Thử lại sau')} ${countdown}s`
            : i18n.t('Gửi mã OTP')
        }
        onClick={handleClick}
        isActiveButton={countdown !== 0 && running ? false : true}
        isRequired
      />
      <Input
        bgGrey
        name="password"
        placeholder={i18n.t('Nhập mật khẩu mới')}
        // label={i18n.t('Nhập mật khẩu mới')}
        label={' mật khẩu mới'}
        isRequired
      />
      <Input
        bgGrey
        name="password_confirm"
        placeholder={i18n.t('Xác nhận mật khẩu')}
        // label={i18n.t('Xác nhận mật khẩu')}
        label={'Xác nhận mật khẩu'}
        isRequired
        valueConfirm={form.password}
      />
      <div className={styles.groupBtn}>
        <FormContext.Consumer>
          {({ isDone }) => (
            <Button
              primary
              bold
              rounded_8
              disable={!isDone}
              onClick={() => {
                forgotPass.mutateAsync();
              }}
            >
              {'Đặt lại mật khẩu'}
            </Button>
          )}
        </FormContext.Consumer>
      </div>
      <div className={styles.container}>
        <span>{i18n.t('Đã nhớ mật khẩu !')}</span>
        <span
          className={styles.text_primary}
          onClick={() => {
            router.push('/auth/login');
          }}
        >
          {i18n.t('Đăng nhập ngay')}
        </span>
      </div>
    </Form>
  );
}

export default ForgotPassForm;
