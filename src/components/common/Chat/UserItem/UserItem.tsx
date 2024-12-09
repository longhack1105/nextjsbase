// UserItem.tsx
import React from 'react';
import styles from './UserItem.module.scss';
import ImageFillElement from '../../ImageFill_2';

interface ChatItemProps {
  name: string;
  message: string;
  time: string;
  avatar: string;
  unreadCount?: number;
}

const UserItem: React.FC<ChatItemProps> = ({
  name,
  message,
  time,
  avatar,
  unreadCount,
}) => {
  return (
    <div className={styles.chatItem}>
      <ImageFillElement src={avatar} alt={`${name}'s avatar`} classname={styles.avatar} />
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.name}>{name}</span>
          <span className={styles.time}>{time}</span>
        </div>
        <p className={styles.message}>{message}</p>
      </div>
      {unreadCount && unreadCount > 0 && (
        <span className={styles.unreadCount}>{unreadCount}</span>
      )}
    </div>
  );
};

export default UserItem;
