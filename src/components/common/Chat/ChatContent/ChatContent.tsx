import React, { useState } from 'react';
import styles from './ChatContent.module.scss';
import ImageFillElement from '../../ImageFill_2';
import images from '../../../../../public/images';

const ChatContent: React.FC = () => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message logic here
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Bắt đầu cuộc trò chuyện"
        className={styles.input}
      />
      <button onClick={handleSend} className={styles.sendButton}>
        <ImageFillElement src={images.chat_send} alt={'send'} width={24} height={24} />
      </button>
    </div>
  );
};

export default ChatContent;
