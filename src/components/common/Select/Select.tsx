import { createContext, useEffect, useRef, useState } from "react";

import { PropsSelector } from "./interfaces";
import clsx from "clsx";
import styles from "./Select.module.scss";

export const ContextSelect = createContext<any>({});

function Select(props: PropsSelector) {
  const ref = useRef<any>(null);
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<any>(null);

  const handleChange = (data: any) => {
    const e = {
      target: {
        value: data?.value,
        name: props?.name,
        title: data?.title,
        textname: props?.textname,
        valuename: props?.valuename,
      },
    };
    props.onChange && props.onChange(e);
    setValue(data);
  };

  useEffect(() => {
    const handleClick = (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [ref]);

  return (
    <ContextSelect.Provider
      value={{
        onChange: handleChange,
        data: value,
        defaultValue: props?.value,
      }}
    >
      <div className={styles.container}>
        {props?.label ? <label>{props.label}</label> : null}
        <div
          className={clsx(styles.select)}
          onClick={() => !props.readOnly && setShow(!show)}
          ref={ref}
        >
          <div className={clsx(styles.value, { [styles.active]: show })}>
            <p
              className={clsx(styles.text, {
                [styles.placeholder]:
                  props.value == null || props.value == undefined,
              })}
            >
              {props.value != null && props.value != undefined
                ? value?.title
                : props.placeholder}
            </p>
            <span className={styles.icon}>
              {!props.readOnly ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="1.5"
                    d="M19.92 8.95l-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
                  ></path>
                </svg>
              ) : null}
            </span>
          </div>
          <div
            className={clsx(styles.containerOption, {
              [styles.active]: show,
              [styles.overflow]: props.overflow,
            })}
          >
            {props.children}
          </div>
        </div>
      </div>
    </ContextSelect.Provider>
  );
}

export default Select;
