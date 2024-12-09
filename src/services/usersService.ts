import axiosClient from '.';

const routeName = process.env.NEXT_PUBLIC_API_1 + '/User';
const routerDEvName = process.env.NEXT_PUBLIC_API_1 + '/api/v1';
const usersService = {
  getAll: (
    data: {
      state?: number | null;
      limit: number;
      page: number;
      keyword?: string;
      MenuKey?: string;
      from?: string | null;
      to?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDEvName}/Members`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getVerify: (
    data: {
      State?: number | null;
      limit: number;
      page: number;
      keyword?: string;
      MenuKey?: string;
      from?: string | null;
      to?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDEvName}/Members/verification`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getDemo: (
    data: {
      state?: number | null;
      limit: number;
      page: number;
      keyword?: string;
      MenuKey?: string;
      from?: string | null;
      to?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDEvName}/Members/demo`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getVerifyed: (
    data: {
      State?: number | null;
      limit: number;
      page: number;
      keyword?: string;
      MenuKey?: string;
      from?: string | null;
      to?: string | null;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDEvName}/Members/verified`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  create: (
    data: {
      avatar: string;
      name: string;
      dateOfBirth: string;
      genderId: number;
      phone: string;
      nationalId: number;
      description: string;
      discountPercentage: number;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getOne: (
    data: {
      uuid: string;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.get(`${routeName}/${data.uuid}`, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  edit: (
    data: {
      uuid: string;
      avatar: string;
      name: string;
      dateOfBirth: string;
      genderId: number;
      phone: string;
      nationalId: number;
      description: string;
      discountPercentage: number;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.put(`${routeName}/${data.uuid}`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  changeState: (
    data: {
      uuid: string;
      MenuKey?: string;
      state: number;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDEvName}/Members/change-status/${data.uuid}`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  changeVerify: (
    data: {
      uuid: string;
      state: number;
      MenuKey?: string;
      note?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDEvName}/Members/verify`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getBlockPost: (
    data: {
      uuid: string;
      Page: number;
      MenuKey?: string;
      Limit: number;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.get(`${routeName}/posts/${data.uuid}`, {
      params: data,
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  lockPost: (
    data: {
      uuid: string;

      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.put(`${routeName}/posts/${data.uuid}`, {
      params: data,
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getAllReport: (
    data: {
      uuid: string;
      Limit: number;
      Page: number;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.get(`${routeName}/posts/${data.uuid}`, {
      params: data,
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getAllLive: (
    data: {
      uuid: string;
      IsReport: boolean;
      Limit: number;
      Page: number;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.get(`${routeName}/${data.uuid}/lives`, {
      params: data,
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  requestStop: (
    data: {
      uuid: string;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.put(`${routeName}/live/${data.uuid}`, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getAllGift: (
    data: {
      uuid: string;
      Limit: number;
      Page: number;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.put(`${routeName}/${data.uuid}/give-gifts`, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  getAllStatistic: (
    data: {
      uuid: string;
      Limit: number;
      Page: number;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.put(`${routeName}/${data.uuid}/statistic`, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  changePassword: (
    data: {
      uuid: string;
      newPasswordBeforeMd5: string;
      newPasswordAfterMd5: string;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.put(`${routeName}/${data.uuid}/password`, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  addVirtualBuyer: (
    data: {
      name?: string;
      avatar?: string;
      email?: string | null;
      phoneNumber?: string | null;
      password?: string;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}/add-virtual-buyer`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  addVirtualSeller: (
    data: {
      avatar?: string;
      nameShop?: string;
      fullName?: string;
      idCard?: string;
      nationalCode?: string;
      password?: string;
      email?: string;
      phoneNumber?: string;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}/add-virtual-seller`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  detailVirtualBuyer: (
    data: {
      uuid?: string | null;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}/detail-virtual-buyer`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  updateVirtualBuyer: (
    data: {
      uuid?: string;
      name?: string;
      avatar?: string;
      email?: string;
      phoneNumber?: string;
      password?: string;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}/update-virtual-buyer`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },

  updateVirtualSeller: (
    data: {
      uuid: string;
      avatar: string;
      nameShop: string;
      fullName: string;
      idCard: string;
      nationalCode: string;
      password: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.put(`${routeName}/virtual-seller/${data.uuid}`, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  changeBalance: (
    data: {
      uuid: string;
      amount: number;
      type: number;
      depositCode: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.put(`${routeName}/seller/${data.uuid}/change-balance`, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  changeBuyerBalance: (
    data: {
      uuid: string;
      amount: number;
      type: number;
      depositCode: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.put(`${routeName}/buyer/${data.uuid}/change-balance`, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  freezeBalance: (
    data: {
      uuid: string;
      amount: number;
      note: string;
      type: number;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDEvName}/Members/freeze-balance`, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },

  unFreezeBalance: (
    data: {
      uuid: string;
      amount: number;
      note: string;
      type: number;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDEvName}/Members/freeze-balance`, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  unFreezeBalanceBuyer: (
    data: {
      uuid: string;
      unFreezeAmount: number;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.put(`${routeName}/buyer/${data.uuid}/unfreeze-balance`, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },

  delete: (
    data: {
      uuid?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.delete(`${routeName}/${data?.uuid}`, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
  resetPass: (
    data: {
      uuid: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDEvName}/members/reset-pass/${data.uuid}`, data, {
      cancelToken: tokenAxios,
    });
  },
  note: (
    data: {
      uuid: string;
      comment: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDEvName}/members/comment`, data, {
      cancelToken: tokenAxios,
    });
  },
  detail: (
    data: {
      uuid?: string | null;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDEvName}/members/${data.uuid}`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  identitymember: (
    data: {
      uuid: string;
      fullName: string;
      identifyCard: string;
      nationalCode: string;
      phoneNumber: string;
      verificationPhoto: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routerDEvName}/members/update-identity-member`, data, {
      cancelToken: tokenAxios,
      // headers: {
      //   MenuKey: data.MenuKey || "",
      // },
    });
  },
};

export default usersService;
