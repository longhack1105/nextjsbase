import React from 'react';
import styles from './ChatHeading.module.scss';
import ImageFillElement from '../../ImageFill_2';
import images from '../../../../../public/images';
interface UserCardProps {
  name: string;
  id: string;
  avatarUrl: string;
}

const UserCard: React.FC<UserCardProps> = ({ name, id, avatarUrl }) => {
  return (
    <div className={styles.card}>
      <ImageFillElement
        src={avatarUrl}
        alt={`${name} avatar`}
        classname={styles.avatar}
      />
      <div className={styles.info}>
        <p className={styles.name}>{name}</p>
        <p className={styles.id}>ID: {id}</p>
      </div>
      <div className={styles.trash_btn}>
        <ImageFillElement
          src={images.trash}
          classname={styles.icon}
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};

export default UserCard;
