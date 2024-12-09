import { useCallback, useRef } from "react";

import axios from "axios";

/********** custom hook cancel request axios **********/
export const useCancelToken = () => {
  const axiosSource = useRef<any>(null);
  const newCancelToken = useCallback(() => {
    axiosSource.current = axios.CancelToken.source();
    return axiosSource.current?.token;
  }, []);
  const cancel = useCallback(() => {
    return axiosSource?.current?.cancel();
  }, []);
  return { newCancelToken, cancelAxios: cancel };
};
