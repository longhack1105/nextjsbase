import { memo, useEffect, useState } from "react";
import { toastError, toastWarn } from "~/common/func/toast";

import { FaCamera } from "react-icons/fa";
import ImageCustom from "../ImageCustom";
import { IoClose } from "react-icons/io5";
import { PropsImageMutilAdd } from "./interfaces";
import styles from "./ImageMutilAdd.module.scss";

function ImageMutilAdd({ form, setForm, name, readonly }: PropsImageMutilAdd) {
  const handleFileChange = (event: any) => {
    const files = event.target.files;
    const newImages: any = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const { size, type } = file;
      const maxSize = 10; //MB
      if (size / 1000000 > maxSize) {
        toastError({ msg: "Kích thước tối đa của ảnh là ${ maxSize } mb" });
        return;
      } else if (
        type !== "image/jpeg" &&
        type !== "image/jpg" &&
        type !== "image/png"
      ) {
        toastWarn({
          msg: "Định dạng tệp không chính xác, đuôi tệp chấp nhận .jpg, .jpeg, .png",
        });
        return;
      }
      const url = URL.createObjectURL(file);
      newImages.push({ url, file });
    }

    setForm((prev: any) => {
      return {
        ...prev,
        [name]: [...prev?.[name], ...newImages],
      };
    });
  };

  const handleDelete = (index: number) => {
    setForm((prev: any) => {
      URL.revokeObjectURL(prev?.[name]?.[index].url);
      return {
        ...prev,
        [name]: [
          ...prev?.[name]?.slice(0, index),
          ...prev?.[name]?.slice(index + 1),
        ],
      };
    });
  };
  // useEffect(() => {
  //   setForm((prev: any) => ({ ...prev, [name]: [...images] }));
  // }, [images, name]);

  useEffect(() => {
    // setImages(() => form?.[name]);
  }, [form]);

  return (
    <div className={styles.files}>
      <label className={styles.add}>
        <FaCamera color="#8496AC" />
        <input
          hidden
          type="file"
          multiple
          onClick={(e: any) => {
            e.target.value = null;
          }}
          onChange={handleFileChange}
        />
      </label>
      {form?.[name]?.map((image: any, index: any) => (
        <div className={styles.box_image} key={image.url}>
          <ImageCustom className={styles.image} src={image.url} alt="image" />
          <div className={styles.delete} onClick={() => handleDelete(index)}>
            <IoClose size={14} color="#8496AC" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(ImageMutilAdd);
