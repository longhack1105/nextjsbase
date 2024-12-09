import { ChangeEvent, useEffect, useState } from 'react';
import { toastError, toastWarn } from '~/common/func/toast';

import Avatar from '~/components/common/Avatar';
import { MAXIMUM_AVATAR } from '~/constants/config';
import { PropsInputAvatar } from './interfaces';
import i18n from '~/locale/i18n';
import icons from '~/constants/images/icons';
import styles from './InputAvatar.module.scss';

function InputAvatar({ avatar = '', setFile, setAvatar }: PropsInputAvatar) {
  const [image, setImage] = useState<string>(avatar);
  // console.log("aaa" + image);
  const handleImageChange = (e: any) => {
    const file = e?.target?.files[0];

    if (file) {
      const { size, type } = e.target.files[0];
      const maxSize = MAXIMUM_AVATAR; //MB

      if (size / 1000000 > maxSize) {
        toastError({
          msg: i18n.t(`Kích thước tối đa của ảnh là {{maxSize}} MB`, {
            maxSize: maxSize,
          }),
        });
        return;
      } else if (type !== 'image/jpeg' && type !== 'image/jpg' && type !== 'image/png') {
        toastWarn({
          msg: i18n.t(
            `Định dạng tệp không chính xác, đuôi tệp chấp nhận .jpg, .jpeg, .png`,
          ),
        });
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setFile(file);
      setImage((prev: any) => {
        URL.revokeObjectURL(prev);
        return imageUrl;
      });
    }
  };

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);
  useEffect(() => {
    if (avatar && image == '') {
      setImage(avatar);
    }
  }, [avatar, image]);

  return (
    <div className={styles.container}>
      <Avatar className={styles.avatar} src={image || icons.logo_full?.src} />
      <div className={styles.group}>
        <p>{i18n.t('Tải lên hình ảnh')}</p>
        <p>
          {i18n.t(`Dung lượng tối đa ảnh tải lên là {{MAXIMUM_AVATAR}}`, {
            MAXIMUM_AVATAR: MAXIMUM_AVATAR,
          })}
          {i18n.t(`MB (Định dạng .PNG .JPG .JPEG .GIF)`)}
        </p>
        <label className={styles.btn}>
          {i18n.t('Tải lên')}
          <input type="file" hidden onChange={handleImageChange} />
        </label>
      </div>
    </div>
  );
}

export default InputAvatar;
