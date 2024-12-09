import React, { useState, useMemo } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import styles from './FilterWithType.module.scss';

interface FilterWithTypeProps {
  title: string;
  options: Array<{ id: string; name: string }>;
  defaultLabel: string;
  queryParam: string;
}

const FilterWithType: React.FC<FilterWithTypeProps> = ({
  title,
  options,
  defaultLabel = 'Tất cả',
  queryParam,
}) => {
  const router = useRouter();
  const { [queryParam]: selectedQuery, ...rest } = router.query;
  const [open, setOpen] = useState(false);

  const selectedOption = useMemo(
    () => options.find((option) => option.id === selectedQuery) || null,
    [selectedQuery, options],
  );

  const handleOptionSelect = (id: string) => {
    setOpen(false);
    router.replace(
      {
        query: { ...rest, [queryParam]: id },
      },
      undefined,
      { scroll: false },
    );
  };

  const resetFilter = () => {
    setOpen(false);
    router.replace({ query: rest }, undefined, { scroll: false });
  };

  return (
    <div className={styles.filters}>
      <button
        className={clsx(styles.filterButton, { [styles.active]: open })}
        onClick={() => setOpen((prev) => !prev)}
      >
        {title} : {selectedOption ? selectedOption.name : defaultLabel}
        <IoIosArrowDown />
      </button>

      {open && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <div
              key={option.id}
              className={clsx(styles.option, {
                [styles.active]: selectedQuery === option.id,
              })}
              onClick={() => handleOptionSelect(option.id)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterWithType;
