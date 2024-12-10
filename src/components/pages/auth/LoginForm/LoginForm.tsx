import Form, { FormContext, Input } from '~/components/common/Form';
import { setStateLogin, setToken } from '~/redux/reducer/auth';
import Button from '~/components/common/Button';
import Loading from '~/components/common/Loading';
import { PropsLoginForm } from './interfaces';
import { httpRequest } from '~/services';
import i18n from '~/locale/i18n';
import md5 from 'md5';
import { setInfoUser } from '~/redux/reducer/user';
import { store } from '~/redux/store';
import styles from './LoginForm.module.scss';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import exampleService from '~/services/exampleService';

function LoginForm({}: PropsLoginForm) {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    userName: '',
    password: '',
    ipAddress: '',
    device: 'Web',
  });

  const login = useMutation({
    mutationFn: () =>
      httpRequest({
        showMessageFailed: true,
        http: exampleService.example({
          ...form,
          password: md5(form.password),
        }),
      }),
    onSuccess(data) {
      if (data) {
        store.dispatch(setStateLogin(true));
        store.dispatch(
          setInfoUser({
            userName: data?.data?.userName,
            fullName: data?.data?.fullName,
            avatar: data?.data?.avatar,
            role: data?.data?.roleUuid,
          }),
        );
        store.dispatch(setToken(data.data.accessToken));
      }
    },
  });

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <Form form={form} setForm={setForm} onSubmit={login.mutateAsync}>
        <Loading loading={login.isPending} />
        <Input
          bgGrey
          name="userName"
          placeholder={i18n.t('nguyenvana@gmail.com')}
          label={i18n.t('Tên đăng nhập')}
          isRequired
        />
        <Input
          bgGrey
          name="password"
          placeholder={i18n.t('Mật khẩu đăng nhập')}
          label={i18n.t('Mật khẩu')}
          type="password"
          isRequired
        />
        <div className={styles.forgot_pass}>
          <div className={styles.wrapper_pass}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className={styles.checkbox}
            />
            <p>{i18n.t('Nhớ mật khẩu')}</p>
          </div>
          <div>
            <p
              className={styles.text_pass}
              onClick={() => {
                router.push('/auth/forgot-pass');
              }}
            >
              {i18n.t('Quên mật khẩu?')}
            </p>
          </div>
        </div>
        <div className={styles.groupBtn}>
          <FormContext.Consumer>
            {({ isDone }) => (
              <Button primary bold rounded_8 disable={!isDone}>
                {i18n.t('Đăng nhập')}
              </Button>
            )}
          </FormContext.Consumer>
        </div>
      </Form>
    </div>
  );
}

export default LoginForm;
