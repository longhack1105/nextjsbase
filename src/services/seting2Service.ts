import axiosClient from ".";
const routeName = process.env.NEXT_PUBLIC_API_1 + "/Config";

const seting2Service = {
  getLevel: (
    data: {
      Keyword?: string;
      Limit: number;
      Page: number;
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/level/list`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  create: (
    data: {
      uuid?: string;
      avatar?: string;
      level: number;
      name?: string;
      discountFrom: number;
      discountTo: number;
      capitalRange: number;
      traffic: number;
      bonusUpgrade: number;
      priority: number;
      clientService: number;
      avatarUuid?: string;
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.post(`${routeName}/level/upsert`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  Detail: (
    data: {
      uuid: string;
      MenuKey?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.get(`${routeName}/${data.uuid}`, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  update: (
    data: {
      avatar: string;
      name: string;
      dateOfBirth: any;
      genderId: number;
      phone: string;
      nationalId: number | null;
      address: string;
      MenuKey?: string;
      uuid: string;
      username?: string;
      email?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.put(`${routeName}/${data.uuid}`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  detele: (
    data: {
      MenuKey?: string;
      uuid: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.delete(`${routeName}/level/delete?Uuid=${data?.uuid}`, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
  ResetPass: (
    data: {
      MenuKey?: string;
      uuid: string;
      newPasswordNoHash?: string;
    },
    tokenAxios?: any
  ) => {
    return axiosClient.put(`${routeName}/${data.uuid}/password`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || "",
      },
    });
  },
};
export default seting2Service;
