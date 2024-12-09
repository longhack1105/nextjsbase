import { useEffect, useState } from "react";

import clsx from "clsx";
import styles from "./SwitchButton.module.scss";

function SwitchButton({ onChange, value, name, isCanUpdate = true, big }: any) {
  const [checked, setChecked] = useState<boolean>(value);

  useEffect(() => {
    setChecked(value);
  }, [value]);

  useEffect(() => {
    if (onChange && isCanUpdate)
      onChange({
        target: {
          value: checked,
          name: name ? name : null,
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <div
      className={clsx([
        styles.container,
        "click",
        { [styles.checked]: checked },
        { [styles.big]: !!big },
      ])}
      onClick={() => isCanUpdate && setChecked(!checked)}
    ></div>
  );
}

export default SwitchButton;
