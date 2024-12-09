// components/EmailPopup.js
import React, { useEffect, useState } from 'react';
import styles from './ChangeEmail.module.scss';
import { ChangeEmailPopupProps } from './interfaces';
import ImageFillElement from '../../ImageFill_2';
import images from '../../../../../public/images';
import { InputBox } from '../../InputBox';
import Button from '../../Button';
import i18n from '~/locale/i18n';
import Popup from '../../Popup';
import clsx from 'clsx';
import Form, { FormContext, Input } from '../../Form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '~/services';
import authService from '~/services/authService';
import { QUERY_KEY } from '~/constants/config/enum';
import Loading from '../../Loading';

function ChangeEmail({ isOpen, onClose, currentEmail }: ChangeEmailPopupProps) {
  const queryClient = useQueryClient();

  const initEmail = {
    email: '',
    code: '',
  };
  const [email, setEmail] = useState(initEmail);

  useEffect(() => {
    setEmail(initEmail);
  }, [isOpen]);

  const handleSetEmail = (value: string) => {
    setEmail({ ...email, email: value });
  };
  const handleSetCode = (value: string) => {
    setEmail({ ...email, code: value });
  };
  // if (!isOpen) return null;

  const changeEmail = useMutation({
    mutationFn: () =>
      httpRequest({
        showMessageFailed: true,
        showMessageSuccess: true,
        http: authService.changeEmail({
          email: email?.email,
        }),
      }),
    onSuccess: (data) => {
      // console.log(111,data);
      if (data) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.INFO_USER] });
        onClose();
      }
    },
  });

  return (
    <>
      <Popup open={isOpen} onClose={onClose}>
        <Loading loading={changeEmail.isPending} />
        <div className={styles.popup}>
          <Form form={email} setForm={setEmail}>
            <ImageFillElement
              src={images.close}
              alt="close"
              width={16}
              height={16}
              classname={styles.close}
              onClick={onClose}
            />
            <div className={styles.box}>
              <h2 className={styles.title}>{i18n.t('Thay đổi email')}</h2>
              <div className={styles.span}>
                <div className={styles.span_top}>
                  {i18n.t('Địa chỉ email hiện tại của bạn là')} <b>{currentEmail}</b>.
                </div>
                <div className={styles.span_bottom}>
                  {i18n.t('Chúng tôi sẽ gửi mã xác minh tạm thời tới địa chỉ email này')}.
                </div>
              </div>
              <div className={styles.input_box}>
                {/* <InputBox
                  label="Email đăng nhập"
                  value={email.email}
                  isButtonCode={false}
                  onChange={handleSetEmail}
                  isCheckEmail={true}
                /> */}
                <Input isRequired label="Email" name="email" isEmail />
                <InputBox
                  label="Xác nhận Email"
                  value={email.code}
                  isButtonCode={true}
                  titleCodeBtn={'Nhận mã'}
                  isCheckEmail={false}
                  onChange={handleSetCode}
                />
                <div hidden>
                  <Input isRequired name="code" max={6} min={6} />
                </div>
              </div>

              <div className={clsx(styles.action)}>
                <FormContext.Consumer>
                  {({ isDone }: any) => {
                    console.log(111, isDone);
                    return (
                      <Button
                        primary
                        rounded_8
                        classname={styles.countinue}
                        disable={!isDone}
                        onClick={async () => {
                          changeEmail.mutate();
                        }}
                      >
                        {`${i18n.t('Cập nhật')}`}
                      </Button>
                    );
                  }}
                </FormContext.Consumer>
              </div>
            </div>
          </Form>
        </div>
      </Popup>

      {/* <div className={styles.overlay}>
      
    </div> */}
    </>
  );
}

export default ChangeEmail;
