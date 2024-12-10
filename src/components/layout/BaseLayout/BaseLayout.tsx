import { PropsBaseLayout, TContextBaseLayout } from "./interfaces";
import { createContext, useContext, useEffect, useState } from "react";

import Header from "./components/Header";
import MenuTab from "./components/MenuTab";
import RequireAuth from "~/components/protected/RequiredAuth";
import clsx from "clsx";
import styles from "./BaseLayout.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

export const ContextBaseLayout = createContext<TContextBaseLayout>({});

function BaseLayout({ children, title }: PropsBaseLayout) {
  const [showFull, setShowFull] = useState(true);
  const { isMobile } = useSelector((state: RootState) => state.site);

  useEffect(() => {
    setShowFull(!isMobile);
  }, [isMobile]);

  return (
    <RequireAuth>
      <ContextBaseLayout.Provider value={{ showFull, setShowFull }}>
        <div className={clsx(styles.container, { [styles.hidden]: !showFull, [styles.mobile]: isMobile })}>
          <div className={styles.header}>
            <Header title={title} />
          </div>
          <div className={clsx(styles.tab)}>
            <MenuTab />
          </div>
          <div className={styles.main}>{children}</div>
        </div>
      </ContextBaseLayout.Provider>
    </RequireAuth>
  );
}

export default BaseLayout;
