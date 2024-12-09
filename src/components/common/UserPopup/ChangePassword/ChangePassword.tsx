import React, { useEffect, useState } from 'react';
import { ChangePasswordProps } from './interfaces';
import styles from './ChangePassword.module.scss';
import ImageFillElement from '../../ImageFill_2';
import images from '../../../../../public/images';
import { InputBox } from '../../InputBox';
import Button from '../../Button';
import clsx from 'clsx';
import i18n from '~/locale/i18n';
import Popup from '../../Popup';
import Form, { FormContext, Input } from '../../Form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { httpRequest } from '~/services';
import authService from '~/services/authService';
import { QUERY_KEY } from '~/constants/config/enum';
import md5 from 'md5';

const ChangePassword: React.FC<ChangePasswordProps> = ({ open, onClose }) => {
  const queryClient = useQueryClient();

  const initForm = {
    oldPassword: '',
    newPassword: '',
    rePassword: '',
  };
  const [form, setFrom] = useState(initForm);

  useEffect(() => {
    setFrom(initForm);
  }, [open]);

  const changePass = useMutation({
    mutationFn: () =>
      httpRequest({
        showMessageFailed: true,
        showMessageSuccess: true,
        http: authService.changePassword({
          oldPassword: md5(form?.oldPassword),
          newPassord: md5(form?.newPassword),
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

  // useEffect(() => {
  //   const isDataReady = (obj: any) => {
  //     const allFieldsFilled = Object.values(obj).every((value) => value !== '');
  //     const passwordsMatch = obj.password === obj.confirmPassword;

  //     return allFieldsFilled && passwordsMatch;
  //   };

  //   // Sử dụng hàm isDataReady để xác định giá trị của ready
  //   setReady(isDataReady(data));
  // }, [data]);

  return (
    <>
      <Popup open={open} onClose={onClose}>
        <div className={styles.popup}>
          <Form form={form} setForm={setFrom}>
            <ImageFillElement
              src={images.close}
              alt="close"
              width={16}
              height={16}
              classname={styles.close}
              onClick={onClose}
            />
            <div className={styles.box}>
              <h2 className={styles.title}>{i18n.t('Đổi mật khẩu')}</h2>
              <div className={styles.span}>
                <div className={styles.span_text}>
                  {i18n.t(
                    'Mật khẩu đăng nhập ít nhất 8 kí tự bao gồm chữ in hoa, chữ thường và số, kí tự đặc biệt',
                  )}
                  .
                </div>
              </div>
            </div>

            <div className={styles.input_box}>
              <Input
                name="oldPassword"
                bgGrey
                isPassword
                type="password"
                label={i18n.t('Mật khẩu cũ')}
                isRequired
              />
              <Input
                name="newPassword"
                bgGrey
                isPassword
                type="password"
                label={i18n.t('Mật khẩu mới')}
                isRequired
              />
              <Input
                name="rePassword"
                bgGrey
                isPassword
                valueConfirm={form.newPassword}
                type="password"
                label={i18n.t('Xác nhận mật khẩu')}
                isRequired
              />
              {/* <InputBox
                label={i18n.t('Mật khẩu cũ')}
                isButtonCode={false}
                value={data.lastPassword}
                onChange={handleChangeLastPassword}
                icon={images.eye}
                eyeHidden={images.eye_hidden}
              />
              <InputBox
                label={i18n.t('Mật khẩu mới')}
                isButtonCode={false}
                value={data.password}
                onChange={handleChangePassword}
                icon={images.eye}
                eyeHidden={images.eye_hidden}
              />
              <InputBox
                label={i18n.t('Xác nhận mật khẩu')}
                eyeHidden={images.eye_hidden}
                isButtonCode={false}
                icon={images.eye}
                value={data.confirmPassword}
                onChange={handleChangeConfirmPassword}
              /> */}
            </div>
            <div className={styles.action}>
              <FormContext.Consumer>
                {({ isDone }) => (
                  <>
                    <Button
                      primary
                      rounded_8
                      disable={!isDone}
                      onClick={() => {
                        changePass.mutate();
                      }}
                    >
                      {i18n.t('Đặt lại mật khẩu')}
                    </Button>
                  </>
                )}
              </FormContext.Consumer>
            </div>
          </Form>
        </div>
      </Popup>
    </>
  );
};

export default ChangePassword;
