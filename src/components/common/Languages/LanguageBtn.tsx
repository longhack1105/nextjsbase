import React, { useState } from 'react';
import styles from './LanguageBtn.module.scss';
import Image from 'next/image';
import images from '../../../../public/images';
import { NationChooseData } from '~/constants/config';

const LanguageButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(NationChooseData[0]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={styles.chooseLanguageButton}>
      <button className={styles.languageButton} onClick={toggleDropdown}>
        <div className={styles.flag}>
          <Image src={language.src} alt="Vietnam Flag" className={styles.flagBg} />
        </div>
        <span className={styles.languageText}>{language.title}</span>
        <div className={`${styles.arrowDown} ${isOpen ? styles.arrowUp : ''}`}>
          <Image src={images.arrow} width={16} height={16} alt="arrow" />
        </div>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {NationChooseData.map((item: any, index: number) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => {
                setLanguage(item);
                toggleDropdown();
              }}
            >
              <Image src={item.src} alt="Flag" className={styles.flagIcon} />
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
