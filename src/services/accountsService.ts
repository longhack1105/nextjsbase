import axiosClient from '.';

const routeName = process.env.NEXT_PUBLIC_API_BASE_1 + '/api/v1/Account';

const accountsService = {
  getAll: (
    data: {
      role?: number | null;
      from: string | null;
      to: string | null;
      state: number | null;
      limit: number;
      page: number;
      keyword?: string;
      menuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}/list`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.menuKey || '',
      },
    });
  },
  create: (
    data: {
      name: string;
      email: string;
      username: string;
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
  Lock: (
    data: {
      uuid: string;
      state: number;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.post(`${routeName}/lock-open`, data, {
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
    return axiosClient.get(`${routeName}`, {
      params: data,
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  edit: (
    data: {
      uuid: string;
      name: string;
      email: string;
      username: string;
      roleUuid: string;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.put(`${routeName}`, data, {
      params: {
        uuid: data.uuid,
      },
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
  lockAccount: (
    data: {
      uuids: string[];
      state: 1 | 0;
      MenuKey?: string;
    },
    tokenAxios?: any,
  ) => {
    return axiosClient.put(`${routeName}/state`, data, {
      cancelToken: tokenAxios,
      headers: {
        MenuKey: data.MenuKey || '',
      },
    });
  },
};

export default accountsService;
