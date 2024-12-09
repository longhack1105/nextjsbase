import { useEffect, useState } from "react";

import { PropsInputUpFile } from "./interfaces";
import styles from "./InputUpFile.module.scss";
import { toastWarn } from "~/common/func/toast";

function InputUpFile({
  label,
  onSetForm,
  name,
  value,
  accept,
}: PropsInputUpFile) {
  const [nameFile, setNameFile] = useState<string>("Chọn file tải lên");

  const handleSelectFile = (e: any) => {
    const file = e?.target?.files[0];
    if (file) {
      const { type } = e.target.files[0];
      // console.log(e.target.files[0]);

      if (type !== accept) {
        toastWarn({
          msg: `Định dạng tệp không chính xác`,
        });
        return;
      }
      setNameFile(file.name);
      onSetForm((prev: any) => ({ ...prev, [name]: file }));
    }
  };

  useEffect(() => {
    return () => {
      onSetForm((prev: any) => ({ ...prev, [name]: null }));
    };
  }, [name, onSetForm]);

  return (
    <div className={styles.container}>
      {label ? <div className={styles.label}>{label}</div> : null}
      <div className={styles.main}>
        <div className={styles.nameFile}>
          {nameFile != "Chọn file tải lên"
            ? nameFile
            : value
            ? value
            : nameFile}
        </div>
        <label className={styles.btn}>
          Upload file
          <input
            hidden
            type="file"
            accept={accept}
            onChange={handleSelectFile}
            onClick={(e: any) => (e.target.value = null)}
          />
        </label>
      </div>
    </div>
  );
}

export default InputUpFile;
