import { Fragment, useCallback, useContext, useEffect, useState } from 'react';
import { IoChevronDownSharp, IoChevronUpSharp } from 'react-icons/io5';
import { RootState, store } from '~/redux/store';
import { setStateLogin, setToken } from '~/redux/reducer/auth';

import { ContextBaseLayout } from '../../BaseLayout';
import Dialog from '~/components/common/Dialog';
import { GoDot, GoDotFill } from 'react-icons/go';
import ImageFill from '~/components/common/ImageFill';
import Link from 'next/link';
import { Menu, PATH } from '~/constants/config';
import { PropsMenuTab } from './interfaces';
import { TContextBaseLayout } from '../../interfaces';
import TippyHeadless from '@tippyjs/react/headless';
import clsx from 'clsx';
import i18n from '~/locale/i18n';
import icons from '~/constants/images/icons';
import { setInfoUser } from '~/redux/reducer/user';
import styles from './MenuTab.module.scss';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { HubConnection } from '@microsoft/signalr';
import { SocketContext } from '~/contexts/SocketProvider';
import { QUERY_KEY } from '~/constants/config/enum';
import { useQueryClient } from '@tanstack/react-query';

function MenuTab({}: PropsMenuTab) {
  const router = useRouter();
  const clientQuery = useQueryClient();

  const { isMobile } = useSelector((state: RootState) => state.site);
  const { infoUser } = useSelector((state: RootState) => state.user);
  const context = useContext<TContextBaseLayout>(ContextBaseLayout);
  const [showLogout, setShowLogout] = useState(false);
  const [openMenu, setOpenMenu] = useState<any>({});
  const [openSubMenu, setOpenSubMenu] = useState<any>({});
  const socket = useContext<HubConnection | null>(SocketContext);
  const [chatNotify, setChatNotify] = useState<number | null>(null);

  useEffect(() => {
    setOpenSubMenu({});
  }, [context?.showFull]);

  useEffect(() => {
    socket?.on('HaveNewMessage', (data) => {
      setChatNotify(data);
      clientQuery.invalidateQueries({ queryKey: [QUERY_KEY.listRoomChat] });
    });
    return () => {
      socket?.off('HaveNewMessage');
    };
  }, [socket]);

  const checkActive = useCallback(
    (pathname: string) => {
      const currentRoute = router.pathname;
      return currentRoute.includes(pathname);
    },
    [router],
  );

  const checkActiveParent = useCallback(
    (arr: any, path: any, item?: any) => {
      const currentRoute = router.pathname;
      let isPathExist = false;
      for (let i = 0; i < arr?.length; i++) {
        if (currentRoute.includes(arr[i].path)) {
          isPathExist = true;
          break;
        }
      }

      if (path && path !== 'any') {
        return currentRoute === path;
      }

      return isPathExist;
    },
    [router],
  );

  const subMenuTemplate = (item: any) => {
    return (
      <div className={styles.submenuBox}>
        {(openMenu && openMenu[item.index]) ||
        checkActiveParent(item?.children, item?.path) == true
          ? item?.children?.map((children: any, k: any) => (
              <div key={k}>
                <Link
                  href={children.path}
                  className={clsx(styles.sub_menu, {
                    [styles.active]: checkActive(children.path),
                  })}
                >
                  <i>
                    <GoDotFill className={styles.icon_sub} />
                  </i>
                  <p>{i18n.t(children.title)}</p>
                </Link>
              </div>
            ))
          : ''}
      </div>
    );
  };

  const menuTemplate = (item: any) => {
    return (
      <div
        className={clsx(styles.parentMenu, {
          [styles.active]: checkActiveParent(item.children, item?.path),
        })}
        onClick={() => {}}
      >
        <i>
          <ImageFill style_1_1="true" src={item.icon} />
        </i>
        {context?.showFull ? (
          <div className={styles.d_flex}>
            <p>{i18n.t(item.title)}</p>
            {false && !!chatNotify ? (
              <>
                <p className={styles.dot}>{chatNotify}</p>
              </>
            ) : (
              <>
                {item?.children && !checkActiveParent(item?.children, item?.path) ? (
                  !!openMenu[item.index] ? (
                    <IoChevronUpSharp />
                  ) : (
                    <IoChevronDownSharp />
                  )
                ) : null}
              </>
            )}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div
      id="menuTab"
      className={clsx(styles.container, {
        [styles.hidden]: !context?.showFull,
      })}
    >
      <div className={styles.header}>
        <div className={styles.logo}>
          <ImageFill className={styles.img} src={icons.logo_full} alt="logo" priority />
        </div>
      </div>
      <div className={styles.menu}>
        {Menu.map((v, i) => (
          <div className={styles.group} key={i}>
            {context?.showFull ? (
              <div className={styles.groupTitle}>{i18n.t(v.title)}</div>
            ) : null}
            <div className={styles.menuGroup}>
              {v.group.map((item: any, j: any) => {
                return (
                  <div
                    key={j}
                    className={clsx(styles.itemGroup, {
                      [styles.active]: checkActiveParent(item.children, item?.path),
                      [styles.hidden]:
                        item?.isHidden ||
                        (item?.roleBlock
                          ? (item?.roleBlock || []).includes(infoUser?.role || '')
                          : false),
                      [styles.showSub]:
                        !!openMenu[item.index] ||
                        checkActiveParent(item.children, item?.path),
                    })}
                    id={item.index}
                    onClick={() => {
                      if (!(item.children?.length > 0) && !!item.path) {
                        router.push(item.path);
                      }
                      setOpenMenu((prevState: any) => ({
                        [item.index]:
                          prevState && prevState[item.index] != undefined
                            ? !prevState[item.index]
                            : true,
                      }));
                      checkActiveParent(item.children, item?.path, false);
                      if (item?.index == 99) {
                        router.push(item?.path);
                      }
                      setOpenSubMenu((prev: any) => ({
                        ...prev,
                        [`sub${i}_${j}`]: !openSubMenu[`sub${i}_${j}`],
                      }));
                    }}
                  >
                    {context?.showFull ? (
                      <>
                        {menuTemplate(item)}
                        {subMenuTemplate(item)}
                      </>
                    ) : (
                      <TippyHeadless
                        maxWidth={'100%'}
                        interactive
                        visible={
                          (item?.children || []).length > 0
                            ? openSubMenu[`sub${i}_${j}`] || false
                            : false
                        }
                        onClickOutside={() =>
                          setOpenSubMenu((prev: any) => ({
                            ...prev,
                            [`sub${i}_${j}`]: false,
                          }))
                        }
                        placement={'right-start'}
                        render={() => (
                          <div className={styles.popup}>{subMenuTemplate(item)}</div>
                        )}
                      >
                        <div>{menuTemplate(item)}</div>
                      </TippyHeadless>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.logout}>
        <div
          className={clsx(styles.user, {
            [styles.small]: !context?.showFull,
          })}
          onClick={() => setShowLogout(true)}
        >
          <i>
            <ImageFill style_1_1="true" src={icons.icon_logout} />
          </i>
          {context?.showFull ? <p>{i18n.t('Đăng xuất')}</p> : null}
        </div>
      </div>
      <Dialog
        title={i18n.t('Xác nhận')}
        note={i18n.t('Bạn muốn đăng xuất tài khoản này?')}
        open={showLogout}
        onClose={() => setShowLogout(false)}
        onSubmit={() => {
          store.dispatch(setToken(null));
          store.dispatch(setStateLogin(false));
          store.dispatch(setInfoUser(null));
        }}
      />
    </div>
  );
}

export default MenuTab;
