import axiosClient from '.';

const routeName = process.env.NEXT_PUBLIC_API_BASE_1 + '/api/v1/Account';
const routerDevName = process.env.NEXT_PUBLIC_API_1 + '/api/v1/Account';
const routerDevName2 = process.env.NEXT_PUBLIC_API_1 + '/api/v1/Configuration';

const authService = {
  login: (
    data: {
      userName: string;
      password: string;
      MenuKey?: string;
      ipAddress?: string;
      device: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDevName}/login`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getInfo: (
    tokenAxios?: any,
  ) => {
    return axiosClient.get(`${routerDevName}/get-info`, {
      cancelToken: tokenAxios,
      headers: {},
    });
  },
  loginReview: (
    data: {
      uuid: string;
      ip?: string;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDevName}/login-review`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  changeAvatar: (
    data: {
      avatar: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDevName}/change-avatar`, data, {
      cancelToken: tokenAxios,
    });
  },
  changeFullName: (
    data: {
      fullName: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDevName}/change-fullname`, data, {
      cancelToken: tokenAxios,
    });
  },
  changeEmail: (
    data: {
      email: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDevName}/change-email`, data, {
      cancelToken: tokenAxios,
    });
  },
  changePassword: (
    data: {
      oldPassword: string;
      newPassord: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDevName}/change-password`, data, {
      cancelToken: tokenAxios,
    });
  },
  forgotpass: (
    data: {
      email: string;
      password: string;
      MenuKey?: string;
      otp: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}/fogot-password`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  sendOtp: (
    data: {
      email: string;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}/send-otp`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  LockAccount: (
    data: {
      uuid: string;
      MenuKey?: string;
      state: number;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}/change-state`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  Upsert: (
    data: {
      uuid?: string;
      MenuKey?: string;
      email: string;
      username?: string;
      roleId?: string;
      phoneNumber?: string;
      note?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}/add`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  Edit: (
    data: {
      uuid?: string;
      MenuKey?: string;
      email: string;
      username?: string;
      roleId?: string;
      phoneNumber?: string;
      note?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}/edit-account`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  DeleteAccount: (
    data: {
      uuid: string;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.delete(`${routeName}/delete?Uuid=${data?.uuid}`, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  ChangeCodePass: (
    data: {
      uuid: string;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.put(`${routeName}/${data?.uuid}`, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getRole: (
    data: {
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.get(`${routeName}/role`, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getAll: (
    data: {
      limit: number;
      page: number;
      MenuKey?: string;
      keyword?: string;
      roleUuid?: string | null;
      state?: number;
      fromDate?: string | null;
      toDate?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}/list`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  nation: (
    data: {
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDevName2}/national`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  logout: (
    data: {
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}/logout`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  // changePass: (
  //   data: {
  //     oldPass: string;
  //     newPass: string;
  //     MenuKey?: string;
  //   },
  //   tokenAxios?: any
  // ) => {
  //   return axiosClient.post(`${routeName}/change-password`, data, {
  //     cancelToken: tokenAxios,
  //     headers: {
  //       MenuKey: data.MenuKey || "",
  //     },
  //   });
  // },
};

export default authService;
