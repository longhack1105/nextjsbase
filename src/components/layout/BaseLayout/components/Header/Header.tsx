import { ArrowDown2, HambergerMenu } from "iconsax-react";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

import Avatar from "~/components/common/Avatar";
import { ContextBaseLayout } from "../../BaseLayout";
import ImageFill from "~/components/common/ImageFill";
import Link from "next/link";
import { Languages, ListOptionMenu } from "~/constants/config";
import { PropsHeader } from "./interfaces";
import { RootState, store } from "~/redux/store";
import { TContextBaseLayout } from "../../interfaces";
import { TippyHeadless } from "~/components/common/Tippy";
import clsx from "clsx";
import styles from "./Header.module.scss";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import i18n from "~/locale/i18n";
import Dialog from "~/components/common/Dialog";
import { setStateLogin, setToken } from "~/redux/reducer/auth";
import { setInfoUser } from "~/redux/reducer/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "~/constants/config/enum";
import { httpRequest } from "~/services";
import exampleService from "~/services/exampleService";
import { HubConnection } from "@microsoft/signalr";
import { SocketContext } from "~/contexts/SocketProvider";
import ImageFillElement from "~/components/common/ImageFill_2";
import { IoIosArrowDown } from "react-icons/io";

function Header({ title }: PropsHeader) {
  const router = useRouter();
  const { locale } = useRouter();
  const context = useContext<TContextBaseLayout>(ContextBaseLayout);
  const { infoUser } = useSelector((state: RootState) => state.user);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const pathName = router.pathname;
  const [showLogout, setShowLogout] = useState(false);
  const [showNotify, setShowNotify] = useState(false);
  const [notifyTab, setNotifyTab] = useState<number>(0);
  const clientQuery = useQueryClient();
  const socket = useContext<HubConnection | null>(SocketContext);
  const [unRead, setUnRead] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const { isMobile } = useSelector((state: RootState) => state.site);
  const chooseLang = useMemo(() => Languages.find((v) => v.code == locale), [locale]);

  // console.log(chooseLang);

  const checkActive = useCallback(
    (pathname: string) => {
      const currentRoute = router.pathname.split("/")[1];
      return pathname == `/${currentRoute}`;
    },
    [router]
  );
  const { data: notify } = useQuery({
    queryKey: [QUERY_KEY.notify, notifyTab],
    queryFn: () => {
      return httpRequest({
        isList: true,
        http: exampleService.example({
          State: notifyTab == 0 ? null : 0,
        }),
      });
    },
    enabled: !!showNotify,
  });

  useEffect(() => {
    if (notifyTab == 0) {
      setTotalCount(notify?.total);
    }
  }, [notify]);

  const handleRead = useMutation({
    mutationFn: async ({ uuid }: any) => {
      return httpRequest({
        showMessageFailed: true,
        http: exampleService.example({
          uuid,
        }),
      });
    },
    onSuccess(data) {},
  });
  useEffect(() => {
    socket?.on("Notification", (data: any) => {
      setUnRead(data);
      // console.log(data + "------------")
      clientQuery.invalidateQueries({
        queryKey: [QUERY_KEY.notify, notifyTab],
      });
    });

    return () => {
      socket?.off("Notification");
    };
  }, [socket]);
  const clickNotifyHandle = (data: any) => {
    handleRead.mutateAsync({ uuid: data.uuid });
    // setShowNotify(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.groupArrows}>
          <div className={styles.arrow} onClick={() => context?.setShowFull!(!context?.showFull)}>
            <HambergerMenu color="#3F4752" className={styles.icon} />
          </div>
          <h4 className={styles.title}>{title}</h4>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.greeting}>
          <p>{infoUser?.fullName || infoUser?.userName}</p>
        </div>
        <TippyHeadless
          visible={openMenu}
          onClickOutside={() => setOpenMenu(false)}
          position="bottom-end"
          render={() => (
            <div className={styles.option}>
              {ListOptionMenu.map((item, i) => (
                <Link
                  href={item.path}
                  className={clsx(styles.itemGroup, {
                    [styles.active]: checkActive(item.path),
                  })}
                  onClick={() => {
                    item?.index == 1 && setShowLogout(true);
                    setOpenMenu(false);
                  }}
                  key={i}
                >
                  <i>
                    <ImageFill style_1_1="true" src={item.icon} />
                  </i>
                  <p>{i18n.t(item.title)}</p>
                </Link>
              ))}
            </div>
          )}
        >
          <div className={styles.info}>
            <div className={clsx(styles.icon_arrow)} onClick={() => setOpenMenu(!openMenu)}>
              <ImageFillElement src={""} alt="chat" width={32} height={32} />
            </div>
            <div className={clsx(styles.icon_arrow)}>
              <ImageFillElement src={""} alt="chat" width={20} height={20} />
            </div>
            <div className={clsx(styles.icon_arrow)}>
              <ImageFillElement src={""} alt="chat" width={20} height={20} />
            </div>
          </div>
        </TippyHeadless>
        <TippyHeadless
          visible={open}
          onClickOutside={() => setOpen(false)}
          position="bottom-end"
          render={() => (
            <div className={styles.option}>
              {Languages.map((v) => (
                <Link
                  key={v.code}
                  href={`${pathName}?${new URLSearchParams(router.query as Record<string, string>).toString()}`}
                  className={clsx(styles.lang_item, {
                    [styles.active]: chooseLang?.code == v.code,
                  })}
                  locale={v.code}
                  onClick={() => setOpen(false)}
                >
                  <i className={styles.img_icon}>
                    <ImageFill style_1_1="true" src={v?.icon} />
                  </i>
                  <p>{v?.title}</p>
                </Link>
              ))}
            </div>
          )}
        >
          <div className={styles.lang} onClick={() => setOpen(!open)}>
            <ImageFillElement src={""} alt="vietnamese" width={20} height={20} />
            {!isMobile ? <p className={styles.title}>{i18n.t(`${chooseLang?.title}`)}</p> : null}
            <i
              className={clsx(styles.icon_arrow, {
                [styles.active_icon]: open,
              })}
            >
              <IoIosArrowDown />
            </i>
          </div>
        </TippyHeadless>
      </div>
      <Dialog
        title="Xác nhận"
        note="Bạn muốn đăng xuất tài khoản này?"
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

export default Header;
