export enum QUERY_KEY {
  INFO_USER,
  event,
  level,
  buyer,
  seller,
  store,
  nationals,
  shopping,
  listConfiguration,
  listGiftSort,
  review,
  dashboardIdol,
  detailMissionDiamond,
  profile,
  listOrders,
  listOrdersRefunds,
  configData,
  configUpdate,
  configTransactionData,
  configWalletData,
  categoriesList,
  deposit,
  withdraw,
  tranfer,
  categoriesList2,
  listProduct,
  buyerDetail,
  sellerDetail,
  detailTable,
  home,
  homeShop,
  homeWithdraw,
  account,
  detailProduct,
  detailShopping,
  listRoomChat,
  notify,
  contacts,
  national,
  SOCIALS,
  GET_CONFIG_FINANCE,
  GET_CONFIG_WALLET,
  CURRENCIES,
  TRADE_OPEN,
  TRADE_CLOSE,
  TRADE_CONFIG,
  STATISTICAL,
  STATISTICAL_TRADE,
  STATISTICAL_PROFIT,
  STATISTICAL_FINANCE,
  STATISTICAL_LIST,
  STATISTICAL_TRADE_LIST,
  STATISTICAL_PROFIT_LIST,
  STATISTICAL_TRANSACTION_DEPOSIT_HISTORIES,
  STATISTICAL_TRANSACTION_WITHDRAW_HISTORIES,
}

export enum TYPE_DATE {
  ALL = -1,
  TODAY = 1,
  YESTERDAY = 2,
  THIS_WEEK = 3,
  LAST_WEEK = 4,
  THIS_MONTH = 5,
  LAST_MONTH = 6,
  THIS_YEAR = 7,
  LUA_CHON = 8,
}

export enum STATUS_EVENT {
  SAP_DIEN_RA = 1,
  DANG_DIEN_RA,
  DA_KET_THUC,
}
export enum STATE_VERIFY {
  'Not verify' = 0,
  Verified,
  'Wait verify',
  Reject,
}
export const SEX = [
  {},
  {
    name: 'Nam',
  },
  {
    name: 'Nữ',
  },
  {
    name: 'Khác',
  },
];
export enum TRANSACTION_HISTORY_TYPE {
  'Nạp tiền' = 1,
  'Rút tiền',
  'Rút tiền bị Hủy/Từ chối',
  'Tiền thưởng',
  'Mua hàng',
  'Đơn hàng đã hoàn thành',
  'Hoàn tiền đặt hàng',
  'Đóng băng số dư',
  'Giải phóng số dư đóng băng',
}
export enum GENDER_USER {
  'Nam' = 1,
  'Nữ',
  'Khác',
}
export enum TYPE_HISTORY {
  'Nạp' = 1,
  'Rút',
}
export enum STATE_USER {
  'Vô hiệu hóa' = 0,
  'Đang hoạt động',
}
export enum STATE_BUYER {
  'Hoạt động' = 1,
  'Đã khoá' = 0,
}
export enum STATE_REVIEW {
  'Chờ duyệt' = 0,
  'Đã duyệt',
  'Từ chối',
}
export enum TYPE_CURRENCY {
  'USDT' = 1,
  'BANK',
}
export enum STATE_CURRENCY {
  'Chờ duyệt' = 0,
  'Thành công',
  'Đã huỷ',
}
export enum STATE_WITHDRAW {
  'Chờ xử lý' = 0,
  'Đã duyệt',
  'Thành công',
  'Từ chối',
  'Huỷ bỏ',
}
export enum STATE_PRODUCT {
  'Ẩn' = 0,
  'Hiển thị',
}
export enum STATE_DEPOIST {
  'Chờ duyệt' = 0,
  'Thành công',
  'Đã huỷ',
}

export enum certificate_BUYER {
  'Chưa chứng thực' = 1,
  'Xác thực thành công',
  'Loại bỏ',
}
export enum TYPE_PRODUCT {
  'Mới' = 0,
  'Cũ',
}
export enum TYPE_ITEM {
  'Thường' = 0,
  'Phổ biến',
}
export enum ORDER_STATE_PAYMENT {
  'Chưa thanh toán' = 1,
  'Đã thanh toán',
  'Đã hoàn tiền',
}
export enum ORDER_STATE {
  'Đang chờ xử lý' = 1,
  'Vận chuyển',
  'Hoàn thành',
}
export enum ORDER_STATENEW {
  'Chờ xác nhận' = 0,
  'Đang xử lý',
  'Vận chuyển',
  'Hoàn thành',
  'Yêu cầu hoàn trả',
  'Chờ nhận lại đơn',
  'Hoàn tiền',
  'Từ chối hoàn',
  'Huỷ bỏ đơn hàng',
  'Chưa thanh toán',
}
export enum ORDER_STATE_REFUND {
  'Chờ duyệt' = 1,
  'Đã hoàn trả',
  'Huỷ',
  'Yêu cầu hoàn trả',
  'Chờ nhận lại đơn',
  'Từ chối nhận',
}
export enum PAYMENT_STATE {
  'Chưa giải quyết' = 0,
  'Đã hoàn thành',
  'Đã từ chối',
}
export enum ID_CARD_TYPE {
  'Mặt trước tài liệu' = 3,
  'Mặt sau tài liệu',
  'Tài liệu và khuôn mặt',
}
export enum SHOP_CERTIFICATE_STATE {
  'Chưa chứng thực' = 1,
  'Xác thực thành công',
  'Loại bỏ',
}
export const TYPE_ACTION = [
  {
    id: 1,
    name: 'Xem live',
  },
  {
    id: 2,
    name: 'Chia sẻ live',
  },
  {
    id: 3,
    name: 'Tặng quà',
  },
  {
    id: 5,
    name: 'Nạp kim cương',
  },
];

export const TYPE_ACTION_IDOL = [
  {
    id: 1,
    name: 'Xem live',
  },
  {
    id: 2,
    name: 'Chia sẻ live',
  },
  {
    id: 3,
    name: 'Tặng quà',
  },
  {
    id: 4,
    name: 'Live',
  },
  {
    id: 5,
    name: 'Nạp kim cương',
  },
];
export enum NOTIFY_TYPE {
  'Nạp tiền thành công' = 1,
  'Rút tiền thành công',
  'Nhắc nhở điểm danh',
  'Bạn vừa nhận được đơn hàng mới {{id}} từ hệ thống. Vui lòng kiểm tra chi tiết' = 4,
  'Đơn hàng được xác nhận',
  'Đơn hàng được xử lý',
  'Đơn hàng được vận chuyển',
  'Đơn hàng hoàn thành',
  'Đơn hàng bị hoàn trả',
  'Hoàn tiền đơn hàng',
  'Đơn hàng bị seller từ chối',
};
export enum enumOrderType {
  'Mua' = 0,
  'Bán',
};

export enum enumTradeAdjustState {
  'Đang chờ' = 1,
  'Đang diễn ra',
  'Hoàn thành',
  'Đã hủy',
}

export enum enumDirectionType {
  'Tăng' = 1,
  'Giảm' = 0,
}

export enum enumAccountType {
  'Demo' = 1,
  'Real',
  'System',
}

export enum enumDepositState {
  'Chờ duyệt' = 0,
  'Thành công',
  'Đã huỷ',
}

export enum enumWithdrawState {
  'Chờ xử lý' = 0,
  'Đã duyệt',
  'Thành công',
  'Từ chối',
  'Huỷ bỏ',
}
