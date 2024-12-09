import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { RootState, store } from "~/redux/store";
import { getItemStorage, setItemStorage } from "~/common/func/localStorage";

import { PropsSwitchMode } from "./interfaces";
import clsx from "clsx";
import styles from "./SwitchMode.module.scss";
import { toogleDarkMode } from "~/redux/reducer/site";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function SwitchMode({}: PropsSwitchMode) {
  const { darkMode } = useSelector((state: RootState) => state.site);

  useEffect(() => {
    const darkModeOn = getItemStorage("ui-mode");
    if (darkModeOn) {
      store.dispatch(toogleDarkMode());
    }
  }, []);

  useEffect(() => {
    setItemStorage("ui-mode", darkMode);
  }, [darkMode]);

  return (
    <div
      className={clsx(styles.container, { [styles.dark]: darkMode })}
      onClick={() => store.dispatch(toogleDarkMode())}
    >
      <div className={styles.dot}></div>
      <div className={styles.sun}>
        <RiSunFill />
      </div>
      <div className={styles.moon}>
        <RiMoonFill />
      </div>
    </div>
  );
}

export default SwitchMode;
