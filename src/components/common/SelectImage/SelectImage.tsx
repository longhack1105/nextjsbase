import { memo, useEffect, useMemo, useState } from 'react';

import ImageCustom from '../ImageCustom';
import { IoCloseOutline } from 'react-icons/io5';
import { MdPhotoCamera } from 'react-icons/md';
import { PropsSelectImage } from './interfaces';
import styles from './SelectImage.module.scss';
import { toastWarn } from '~/common/func/toast';
import i18n from '~/locale/i18n';

function SelectImage({ form, setForm, name, readonly, maxSize = 10 }: PropsSelectImage) {
  const [image, setImage] = useState<string | null>(null);

  const handleSelectFile = (e: any) => {
    const file = e?.target?.files[0];
    if (file) {
      const { type, size } = e.target.files[0];
      //Lớn hơn 10MB
      if (size / 1000000 > maxSize) {
        toastWarn({
          msg: `${i18n.t('Dung lượng tối đa ảnh tải lên là')} ${maxSize}MB`,
        });
        return;
      }

      if (!['image/png', 'image/jpg', 'image/jpeg'].includes(type)) {
        toastWarn({
          msg: i18n.t(`Định dạng tệp không chính xác`),
        });
        return;
      }
      setImage((prev: string | null) => {
        if (!!prev) {
          URL.revokeObjectURL(prev);
        }
        return URL.createObjectURL(file);
      });
      setForm((prev: any) => ({ ...prev, [name]: file }));
    }
  };

  useEffect(() => {
    if (typeof form?.[name] == 'string') {
      setImage(() => form?.[name]);
    }
  }, [form, name]);

  return (
    <div className={styles.container}>
      {image ? (
        !readonly ? (
          <div
            className={styles.close}
            onClick={(e) => {
              setImage((prev: string | null) => {
                if (!!prev) {
                  URL.revokeObjectURL(prev);
                }
                return null;
              });
              setForm((prev: any) => ({ ...prev, [name]: null }));
            }}
          >
            <IoCloseOutline />
          </div>
        ) : null
      ) : null}
      <label className={styles.container}>
        {image ? (
          <ImageCustom src={image} alt="logo" className={styles.img} />
        ) : (
          <i>
            <MdPhotoCamera />
          </i>
        )}
        {!readonly && !image ? (
          <input
            type="file"
            hidden
            accept="image/png, image/jpg, image/jpeg"
            onChange={(e) => {
              handleSelectFile(e);
            }}
            onClick={(e: any) => {
              e.target.value = null;
            }}
          />
        ) : null}
      </label>
    </div>
  );
}

export default memo(SelectImage);
