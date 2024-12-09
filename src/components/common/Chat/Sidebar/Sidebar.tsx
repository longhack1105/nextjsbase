// Sidebar.tsx
import React from 'react';
import styles from './Sidebar.module.scss';
import ImageFillElement from '../../ImageFill_2';
import images from '../../../../../public/images';
import { UserItem } from '../UserItem';

const Sidebar: React.FC = () => {
  const chatData = [
    {
      name: 'Jacob Jones',
      message: 'Admin cho mình hỏi, mình...',
      time: '5 phút trước',
      avatar: images.user_1,
      unreadCount: 2,
    },
    {
      name: 'Eleanor Pena',
      message: 'Admin cho mình hỏi, mình...',
      time: '2 phút trước',
      avatar: images.user_2,
      unreadCount: 3,
    },
    {
      name: 'Annette Black',
      message: 'Admin cho mình hỏi, mình...',
      time: '2 phút trước',
      avatar: images.user_3,
      unreadCount: 1,
    },
    {
      name: 'Jacob Jones',
      message: 'Admin cho mình hỏi, mình...',
      time: '5 phút trước',
      avatar: images.user_1,
      unreadCount: 2,
    },
    {
      name: 'Eleanor Pena',
      message: 'Admin cho mình hỏi, mình...',
      time: '2 phút trước',
      avatar: images.user_2,
      unreadCount: 3,
    },
    {
      name: 'Annette Black',
      message: 'Admin cho mình hỏi, mình...',
      time: '2 phút trước',
      avatar: images.user_3,
      unreadCount: 1,
    },
  ];

  if (chatData.length === 0)
    return (
      <div className={styles.sidebar}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Nhập từ khóa tìm kiếm"
        />
        <div className={styles.noChats}>
          <ImageFillElement src={images.chat_sidebar_blank} alt="chat_sidebar" />
          <p>Không có cuộc hội thoại nào!</p>
        </div>
      </div>
    );
  return (
    <div className={styles.sidebar}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Nhập từ khóa tìm kiếm"
      />
      {chatData.map((item, index) => (
        <UserItem
          key={index}
          name={item.name}
          message={item.message}
          avatar={item.avatar}
          time={item.time}
          unreadCount={item.unreadCount}
        />
      ))}
    </div>
  );
};

export default Sidebar;
