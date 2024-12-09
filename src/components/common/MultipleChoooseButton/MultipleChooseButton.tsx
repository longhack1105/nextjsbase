import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './MultipleChooseButton.module.scss';
import { IoIosArrowDown } from 'react-icons/io';
import { DropdownProps, Option } from './interfaces';

const Dropdown: React.FC<DropdownProps> = ({ label, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option.id);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <label className={styles.label}>{label}</label>
      <button
        type="button"
        className={clsx(styles.selectButton, { [styles.open]: isOpen })}
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption.label : 'Admin'}
        <span className={clsx(styles.arrow, { [styles.isSellect]: isOpen })}>
          <IoIosArrowDown className={styles.icon} />
        </span>
      </button>
      {isOpen && (
        <div className={styles.options}>
          {options.map((option) => (
            <div
              key={option.id}
              className={styles.option}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
