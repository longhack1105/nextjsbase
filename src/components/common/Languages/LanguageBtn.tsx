import React, { useMemo, useState } from "react";
import styles from "./LanguageBtn.module.scss";
import Image from "next/image";
import { Languages, NationChooseData } from "~/constants/config";
import { useRouter } from "next/router";
import Link from "next/link";
import ImageFill from "../ImageFill";

const LanguageButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState(NationChooseData[0]);
  const { locale } = useRouter();
  const chooseLang = useMemo(() => Languages.find((v) => v.code == locale), [locale]);
  const router = useRouter();
  const pathName = router.pathname;

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className={styles.chooseLanguageButton}>
      <button className={styles.languageButton} onClick={toggleDropdown}>
        <div className={styles.flag}>
          <Image src={chooseLang?.icon || ""} alt={chooseLang?.title || ""} className={styles.flagBg} width={20} height={20} />
        </div>
        <span className={styles.languageText}>{chooseLang?.title}</span>
        <div className={`${styles.arrowDown} ${isOpen ? styles.arrowUp : ""}`}>
          <Image src={""} width={16} height={16} alt="arrow" />
        </div>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {Languages.map((item: any, index: number) => (
            // <div
            //   key={index}
            //   className={styles.dropdownItem}
            //   onClick={() => {
            //     setLanguage(item);
            //     toggleDropdown();
            //   }}
            // >
            //   <Image src={item.icon} alt="Flag" className={styles.flagIcon} width={20} height={20}/>
            //   <span>{item.title}</span>
            // </div>

            <Link
              key={index}
              href={`${pathName}?${new URLSearchParams(router.query as Record<string, string>).toString()}`}
              className={styles.dropdownItem}
              locale={item.code}
              onClick={() => toggleDropdown()}
            >
              <i className={styles.img_icon}>
                {/* <ImageFill style_1_1="true" src={item?.icon} /> */}
                <Image src={item.icon} alt="Flag" className={styles.flagIcon} width={20} height={20}/>
              </i>
              <p>{item?.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageButton;
