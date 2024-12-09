"use client"
import * as loading1 from '../../../../public/static/anim/loading_Bibet.json';

import { Fragment, memo, useEffect } from 'react';
import { RootState, store } from '~/redux/store';
import { getItemStorage, setItemStorage } from '~/common/func/localStorage';
import { setIP, setIsMobile, setLoading } from '~/redux/reducer/site';
import { setStateLogin, setToken } from '~/redux/reducer/auth';

import CryptoJS from 'crypto-js';
import Lottie from 'react-lottie';
import { PropsSplashScreen } from './interfaces';
import axios from 'axios';
import clsx from 'clsx';
import { setInfoUser } from '~/redux/reducer/user';
import styles from './SplashScreen.module.scss';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';

function SplashScreen({}: PropsSplashScreen) {
  const { loading } = useSelector((state: RootState) => state.site);
  const { token, isLogin } = useSelector((state: RootState) => state.auth);
  const { infoUser } = useSelector((state: RootState) => state.user);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading1,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  useEffect(() => {
    (async () => {
      const state = await getItemStorage('admin-forex');
      if (!!state) {
        const bytes = CryptoJS.AES.decrypt(state, process.env.NEXT_PUBLIC_KEY_CERT!);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        store.dispatch(setToken(decryptedData.token));
        // console.log(111, decryptedData)
        store.dispatch(
          setInfoUser({
            ...decryptedData.infoUser,
          }),
        );
        store.dispatch(setStateLogin(decryptedData.isLogin));
      }
      store.dispatch(setLoading(false));

      const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        );
      store.dispatch(setIsMobile(isMobile));

      axios
        .get('https://api.ipify.org?format=json')
        .then((res) => store.dispatch(setIP(res.data.ip)));
    })();
  }, []);

  useEffect(() => {
    if (!loading) {
      const ciphertext = CryptoJS?.AES?.encrypt(
        JSON.stringify({
          token: token,
          isLogin: isLogin,
          infoUser: infoUser,
        }),
        process.env.NEXT_PUBLIC_KEY_CERT!,
      ).toString();
      setItemStorage('admin-forex', ciphertext);
    }
  }, [token, isLogin, loading, infoUser]);

  const Lottie2 = dynamic(() => import('react-lottie'), { ssr: false });

  return (
    <Fragment>
      <div className={clsx(styles.container, { [styles.close]: !loading })}>
        <div className={styles.logo}>
          <Lottie2 options={defaultOptions} />
        </div>
      </div>
    </Fragment>
  );
}

export default memo(SplashScreen);
