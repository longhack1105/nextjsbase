import { ReactNode, useEffect, useMemo, useRef, useState } from "react";

import clsx from "clsx";
import style from "./InputSingle.module.scss";

interface props {
  lenght?: number;
  onSetValue?: (value: any) => void;
  name?: string;
  className?: string;
}

function InputSingle({
  className,
  lenght = 6,
  onSetValue,
  name = "otp_code",
}: props) {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<any>([]);

  /********** setCode **********/
  useEffect(() => {
    let code: Array<string> = [];
    for (let input of ref.current) {
      code.push(input.value);
    }
    const valueCode = code.join("");

    if (!!onSetValue) {
      onSetValue((prev: any) => ({ ...prev, [name]: valueCode }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, name]);

  const handleChange = (e: any) => {
    const { dataset, value } = e.currentTarget;
    const { index } = dataset;

    if (e.currentTarget.value.length > 1) {
      e.currentTarget.value = e.currentTarget.value.slice(1, 2);
    }

    if (e.currentTarget.value == "") {
      e.currentTarget.value = "";
    }

    setCount((prev: number) => prev + 1);

    if (value !== "") {
      if (ref.current[Number(index) + 1]) {
        ref.current[Number(index) + 1].focus();
      }
    } else {
      e.preventDefault();
    }
  };

  /********** handle delete value input **********/
  const handleKeyDown = (e: any) => {
    const { dataset, value } = e.target;
    const { index } = dataset;

    if (e.keyCode === 8) {
      if (value === "") {
        if (ref.current[Number(index) - 1]) {
          ref.current[Number(index) - 1].focus();
        }
      }
    }
  };

  const handlePushRef = (e: any) => {
    ref.current.push(e);
  };

  const renderInputs = useMemo(() => {
    const listRender: Array<ReactNode> = [];
    for (let i = 0; i < lenght; i++) {
      listRender.push(
        <input
          ref={handlePushRef}
          key={i}
          type="number"
          data-index={i}
          maxLength={1}
          onInput={handleChange}
          onKeyDown={handleKeyDown}
        />
      );
    }
    return listRender;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className={clsx(style.input, className)}>{renderInputs}</div>;
}

export default InputSingle;
