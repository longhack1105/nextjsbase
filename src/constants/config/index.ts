import { TYPE_DATE, TRANSACTION_HISTORY_TYPE } from './enum';
import i18n from '~/locale/i18n';
import icons from '../images/icons';

export const MAXIMUM_FILE = 10; //MB

export const allowFiles = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/jpg',
  'image/png',
];

export enum PATH {
  Any = 'any',
  Login = '/auth/login',
  Home = '/',
  ListAdmin = '/listadmin',

  ///
  TRADE_OPEN = '/trade/open',
  TRADE_PENDING = '/trade/pending',
  TRADE_CLOSE = '/trade/close',
  TRADE_CONFIG = '/trade/config-trade',
  SETTING_INFO_USER = '/setting/info-user',
  SETTING_SUPPORT = '/setting/custom-system',
  SETTING_TRANSACTION = '/setting/deposit-and-withdrawal',
  SETTING_WALLET = '/setting/address-wallet',
  USER_DEMO = '/user/demo',
  USER_VERIFY = '/user/verify',
  USER_REQUEST = '/user/request',
  USER_CHECKED = '/user/checked',
  DEPOSIT = '/transaction/deposit',
  WITHDRAW = '/transaction/withdraw',
  HISTORY_TRANSACTION = '/transaction/history',
}

export enum POPUP_KEY {
  Any = 'any',
  SHOPPING_DETAIL = 'shopping-detail',
}

export enum ROLE {
  CSKH01 = 'b0183cea-2e1b-11ef-afcc-42010a94001a',
  SUB_ADMIN = '32884dca-2df3-11ef-afcc-42010a94001a',
}

export const Menu = [
  {
    title: 'menu',
    group: [
      {
        title: 'Tổng quan',
        icon: "",
        path: PATH.Home,
        index: 1,
        roleBlock: [ROLE.CSKH01],
      },
    ],
  },
  {
    title: 'Quản lý',
    group: [
      {
        title: 'Giao dịch',
        icon: "",
        roleBlock: null,
        index: 2,
        children: [
          {
            title: 'Đang mở',
            path: PATH.TRADE_OPEN,
            index: 12,
          },
          {
            title: 'Đang chờ',
            path: PATH.TRADE_PENDING,
            index: 13,
          },
          {
            title: 'Đã đóng',
            path: PATH.TRADE_CLOSE,
            index: 14,
          },
          {
            title: 'Cấu hình tăng giảm',
            path: PATH.TRADE_CONFIG,
            index: 15,
          },
        ],
      },
      {
        title: 'Nhà giao dịch',
        icon: "",
        path: PATH.Any,
        index: 3,
        roleBlock: [ROLE.CSKH01],
        children: [
          {
            title: 'Đã xác minh',
            path: PATH.USER_VERIFY,
            index: 12,
          },
          {
            title: 'Trải nghiệm',
            path: PATH.USER_DEMO,
            index: 13,
          },
          {
            title: 'Yêu cầu xác minh',
            path: PATH.USER_REQUEST,
            index: 14,
          },
          {
            title: 'Đã kiểm duyệt',
            path: PATH.USER_CHECKED,
            index: 15,
          },
        ],
      },
      {
        title: 'Tài chính',
        icon: "",
        path: PATH.Any,
        index: 4,
        roleBlock: [ROLE.CSKH01],
        children: [
          {
            title: 'Nạp tiền',
            path: PATH.DEPOSIT,
            index: 12,
          },
          {
            title: 'Rút tiền',
            path: PATH.WITHDRAW,
            index: 13,
          },
          {
            title: 'Lịch sử',
            path: PATH.HISTORY_TRANSACTION,
            index: 14,
          },
        ],
      },
      
      // {
      //   title: 'Chat',
      //   icon: images.message,
      //   path: PATH.Any,
      //   index: 5,
      //   roleBlock: [ROLE.CSKH01],
      // },
    ],
  },
  {
    title: 'Hệ thống',
    group: [
      {
        title: 'Tài khoản',
        icon: "",
        path: PATH.ListAdmin,
        index: 6,
        roleBlock: [ROLE.CSKH01],
      },
      {
        title: 'Cài đặt chung',
        icon: "",
        index: 7,
        children: [
          {
            title: 'Tài khoản',
            icon: "",
            path: PATH.SETTING_INFO_USER,
            index: 8,
          },
          {
            title: 'Hỗ trợ',
            icon: "",
            path: PATH.SETTING_SUPPORT,
            index: 9,
            roleBlock: [ROLE.CSKH01],
          },
          {
            title: 'Nạp & Rút tiền',
            icon: "",
            path: PATH.SETTING_TRANSACTION,
            index: 10,
            roleBlock: [ROLE.CSKH01],
          },
          {
            title: 'Địa chỉ ví USDT',
            icon: "",
            path: PATH.SETTING_WALLET,
            index: 11,
            roleBlock: [ROLE.CSKH01],
          },
        ],
      },
    ],
  },
];
export const Languagese = [
  {
    title: 'Vietnamese',
    code: 'vi',
    icon: '/static/images/vietnam.png',
  },
  {
    title: 'English',
    code: 'en',
    icon: '/static/images/english.png',
  },
  {
    title: 'China',
    code: 'zh-CN',
    icon: '/static/images/china.png',
  },
];

export const ListOptionMenu: {
  title: string;
  icon: any;
  path: string;
  index?: 1;
}[] = [
  {
    title: 'Cá nhân',
    icon: "",
    path: PATH.SETTING_INFO_USER,
  },
  {
    title: 'Đăng xuất',
    icon: "",
    path: '',
    index: 1,
  },
];

export const ListOptionTimePicker: {
  name: string;
  value: number;
}[] = [
  {
    name: 'Hôm nay',
    value: TYPE_DATE.TODAY,
  },
  {
    name: 'Tuần này',
    value: TYPE_DATE.THIS_WEEK,
  },
  {
    name: 'Tuần trước',
    value: TYPE_DATE.LAST_WEEK,
  },
  {
    name: 'Tháng này',
    value: TYPE_DATE.THIS_MONTH,
  },
  {
    name: 'Tháng trước',
    value: TYPE_DATE.LAST_MONTH,
  },
  {
    name: 'Năm này',
    value: TYPE_DATE.THIS_YEAR,
  },
  {
    name: 'Lựa chọn',
    value: TYPE_DATE.LUA_CHON,
  },
];

export const ConfigLevel = [
  {
    type: 0,
    title: 'Level 1 - 5',
  },
  {
    type: 1,
    title: 'Level 1 - 10 (Mặc định)',
  },
  {
    type: 2,
    title: 'Level 1 - 20',
  },
];

export const listLimit = [10, 20, 50, 100];

export const MAXIMUM_AVATAR = 10; // MB

export const NationChooseData = [
  {
    title: 'Tiếng Việt',
    value: 'vi',
    src: "",
  },
  {
    title: 'English',
    value: 'en',
    src: "",
  },
  {
    title: 'China',
    value: 'zh-CN',
    src: "",
  },
];
