import { logout, setStateLogin, setToken } from '~/redux/reducer/auth';
import { toastError, toastInfo, toastSuccess, toastWarn } from '~/common/func/toast';

import axios from 'axios';
import { delay } from '~/common/func/delay';
import { setInfoUser } from '~/redux/reducer/user';
import { store } from '~/redux/store';

enum RESULT {
  SUCCESSFUL = 0,
}

const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  timeout: 60000,
  timeoutErrorMessage: 'Request timeout',
});

axiosClient.interceptors.request.use(async (config) => {
  const token = store.getState().auth.token;
  config.headers.Authorization = token ? 'Bearer ' + token : null;
  config.headers.Product = 'Admin';
  // console.log("token:" + token);
  return config;
});

axiosClient.interceptors.response.use(
  (response: any) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error: any) => {
    if (error.response && error.response.data) {
      throw error.response.data;
    }

    if (!axios.isCancel(error)) throw error;
  },
);
export default axiosClient;

export const httpRequest = async ({
  http,
  setLoading,
  msgSuccess = 'Thành công',
  showMessageSuccess = false,
  showMessageFailed = false,
  isList = false,
  onError,
}: {
  http: any;
  setLoading?: (any: any) => void;
  onError?: () => void;
  showMessageSuccess?: boolean;
  showMessageFailed?: boolean;
  isList?: boolean;
  msgSuccess?: string;
}) => {
  setLoading && setLoading(() => true);
  try {
    await delay(700);
    const res: any = await http;
    if (res?.error?.code === RESULT.SUCCESSFUL) {
      showMessageSuccess && toastSuccess({ msg: msgSuccess || res?.error?.message });

      if (isList) {
        // console.log({ res });

        return {
          items: res?.items || [],
          total: res?.pagination?.totalCount || 0,
        };
      }

      return res || true;
    } else {
      onError && onError();
      throw res?.error?.message;
    }
  } catch (err: any) {
    console.log(err);

    if (
      err?.statusCode == 401 ||
      err?.status == 401 ||
      err?.error?.code == 401 ||
      err?.err?.response?.status == 401 ||
      err?.response?.status == 401
    ) {
      store.dispatch(logout());
      store.dispatch(setInfoUser(null));
      showMessageFailed && toastError({ msg: 'Hết hạn đăng nhập' });
    } else if (typeof err == 'string') {
      showMessageFailed && toastWarn({ msg: err || 'Có lỗi đã xảy ra' });
    } else if (err?.code == 'ERR_NETWORK' || err?.code == 'ECONNABORTED') {
      showMessageFailed && toastInfo({ msg: 'Kiểm tra kết nối internet' });
    }
  } finally {
    setLoading && setLoading(() => false);
  }
};
