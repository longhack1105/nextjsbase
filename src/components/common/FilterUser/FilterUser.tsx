import React from 'react';
import styles from './FilterUser.module.scss';
import FilterWithType from '../FilterWithType/FilterWithType';
import i18n from '~/locale/i18n';

const filterOptionsDay = [
  { id: 'all', name: 'Tất cả' },
  { id: 'today', name: 'Hôm nay' },
  { id: 'week', name: 'Tuần này' },
  { id: 'month', name: 'Tháng này' },
];

const filterOptionsRole = [
  { id: 'all', name: 'Tất cả' },
  { id: 'admin', name: 'Admin' },
  { id: 'manager', name: 'Quản lý' },
  { id: 'sales', name: 'sales' },
  { id: 'cskh', name: 'CSKH' },
];

const filterOptionsStatus = [
  { id: 'all', name: 'Tất cả' },
  { id: 'active', name: 'Hoạt động' },
  { id: 'lock', name: 'Đã khóa' },
];
const FilterUser: React.FC = () => {
  return (
    <div className={styles.toolbar}>
      <div className={styles.filters}>
        <FilterWithType
          title={'Thời gian tạo'}
          options={filterOptionsDay} // Truyền vào danh sách tùy chọn
          defaultLabel="Tất cả" // Nhãn mặc định khi chưa chọn
          queryParam="timeFilter" // Tên query param cho bộ lọc
        />
        <FilterWithType
          title={'Vai trò'}
          options={filterOptionsRole}
          defaultLabel="Tất cả"
          queryParam="roleFilter"
        />
        <FilterWithType
          title={'Trạng thái'}
          options={filterOptionsStatus}
          defaultLabel="Tất cả"
          queryParam="statusUser"
        />
      </div>
      <input
        type="text"
        placeholder="Nhập từ khóa tìm kiếm"
        className={styles.searchBox}
      />
      <button className={styles.clearButton}>Xóa bộ lọc</button>
      <button className={styles.addButton}>+ Thêm mới</button>
    </div>
  );
};

export default FilterUser;
