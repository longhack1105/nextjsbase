import axiosClient from ".";

const routeName = process.env.NEXT_PUBLIC_API_BASE_1 + "/Account";

const accountProfileService = {
  changePassword: (
    data: {
      oldPass: string;
      newPass: string;
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/change-password`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  sendOtp: (
    data: {
      email: string;
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/send-otp-change-email`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  step1: (
    data: {
      email: string;
      MenuKey?: string;
      otp: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/change-email-step1`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  Update: (
    data: {
      fullname: string;
      MenuKey?: string;
      avatar: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/update-info`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  step2: (
    data: {
      email: string;
      MenuKey?: string;
      otp: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/change-email-step2`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  getInfo: (
    data: {
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(`${routeName}/information`, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
};

export default accountProfileService;
