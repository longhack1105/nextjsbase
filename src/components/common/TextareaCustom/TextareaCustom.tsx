import {
  FaAlignCenter,
  FaAlignJustify,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaLink,
  FaList,
  FaUnderline,
} from 'react-icons/fa6';
import { useRef, useState } from 'react';

import ContentEditable from 'react-contenteditable';
import { MdFormatColorText } from 'react-icons/md';
import { PropsTextareaCustom } from './interfaces';
import clsx from 'clsx';
import styles from './TextareaCustom.module.scss';
import i18n from '~/locale/i18n';

function addLink() {
  const linkURL = prompt(i18n.t('Nhập đường dẫn liên kết:'), 'https://');
  const sText = document.getSelection();
  document.execCommand(
    'insertHTML',
    false,
    '<a href="' +
      linkURL +
      '" target="_blank" style="color: #1677ff; text-decoration: underline; cursor: pointer;">' +
      sText +
      '</a>',
  );
}

function TextareaCustom({
  label,
  value,
  name,
  setForm,
  placeholder = i18n.t('Nhập mô tả ngắn ...'),
  isShowStyle = true,
}: PropsTextareaCustom) {
  const [colorText, setColorText] = useState('#000');

  const handleChange = (evt: any) => {
    setForm((prev: any) => ({ ...prev, [name]: evt.target.value }));
  };

  function execCommand(command: string) {
    document.execCommand(command, false, undefined);
  }

  return (
    <div className={styles.container}>
      {label ? (
        <label htmlFor="textarea" className={styles.label}>
          {label}
        </label>
      ) : null}
      {isShowStyle == true ? (
        <>
          <div className={styles.groupStyles}>
            <div className={styles.fontStyles}>
              <div className={styles.listType}>
                <button
                  className={styles.item}
                  onClick={(e) => {
                    e.preventDefault();
                    execCommand('bold');
                  }}
                >
                  <FaBold />
                </button>
                <button
                  className={styles.item}
                  onClick={(e) => {
                    e.preventDefault();
                    execCommand('italic');
                  }}
                >
                  <FaItalic />
                </button>
                <button
                  className={styles.item}
                  onClick={(e) => {
                    e.preventDefault();
                    execCommand('underline');
                  }}
                >
                  <FaUnderline />
                </button>
              </div>
              <div className={styles.listType}>
                <button
                  className={styles.item}
                  onClick={(e) => {
                    e.preventDefault();
                    execCommand('justifyCenter');
                  }}
                >
                  <FaAlignCenter />
                </button>
                <button
                  className={styles.item}
                  onClick={(e) => {
                    e.preventDefault();
                    execCommand('justifyLeft');
                  }}
                >
                  <FaAlignLeft />
                </button>
                <button
                  className={styles.item}
                  onClick={(e) => {
                    e.preventDefault();
                    execCommand('justifyRight');
                  }}
                >
                  <FaAlignRight />
                </button>
              </div>
              <div className={styles.listType}>
                <button
                  className={styles.item}
                  onClick={(e) => {
                    e.preventDefault();
                    execCommand('insertUnorderedList');
                  }}
                >
                  <FaList />
                </button>
                <div className={styles.color}>
                  <button
                    style={{ color: colorText }}
                    className={styles.item}
                    onClick={(e) => {
                      e.preventDefault();
                      document.execCommand('foreColor', false, colorText);
                    }}
                  >
                    <MdFormatColorText />
                  </button>
                  <input
                    type="color"
                    value={colorText}
                    onChange={(e) => {
                      setColorText(e.target.value);
                    }}
                  />
                </div>
                <button
                  className={styles.item}
                  onClick={(e) => {
                    e.preventDefault();
                    addLink();
                  }}
                >
                  <FaLink />
                </button>
              </div>
            </div>
            <div></div>
          </div>
        </>
      ) : null}

      <ContentEditable
        html={value}
        onChange={handleChange}
        className={clsx(styles.textarea, 'editor-custom')}
        tagName="atrd"
        placeholder={placeholder}
      />
      {/* <textarea
        id="textarea"
        value={value}
        name={name}
        placeholder={placeholder}
        className={clsx(styles.textarea, { [styles.focus]: focus })}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) =>
          setForm((prev: any) => ({
            ...prev,
            [name]: e.target.value,
          }))
        }
      ></textarea> */}
    </div>
  );
}

export default TextareaCustom;
