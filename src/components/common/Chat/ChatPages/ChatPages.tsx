// MainContent.tsx
import React from 'react';
import styles from './ChatPages.module.scss';
import ImageFillElement from '../../ImageFill_2';
import images from '../../../../../public/images';
import { ChatHeading } from '../ChatHeading';
import clsx from 'clsx';
import ChatInput from '../ChatContent/ChatContent';

const MainContent: React.FC = () => {
  const isChat = true;
  return !isChat ? (
    <div className={styles.mainContent}>
      <ImageFillElement src={images.chat_content_blabk} alt="chat_content" />
      <h2 className={styles.title}>Chào mừng đến trade5</h2>
      <p className={styles.description}>
        Ứng dụng giúp bạn giữ an toàn và quản lý các giao dịch của bạn. Tạo các cuộc hội
        thoại và trải nghiệm tốt nhất cho bạn.
      </p>
    </div>
  ) : (
    <div
      className={clsx(styles.mainContent, {
        [styles.body]: isChat,
      })}
    >
      <ChatHeading avatarUrl={images.user_1} name={'Jacop Jones'} id={'02235575'} />
      <ChatInput />
    </div>
  );
};

export default MainContent;
