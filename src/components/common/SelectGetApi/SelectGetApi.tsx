import { Fragment, memo, use, useEffect, useMemo, useRef, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import useQueryParams, { useQueryNextJS } from '~/common/hooks/useQueryParams';

import { ArrowDown2 } from 'iconsax-react';
import { FaCheck } from 'react-icons/fa6';
import { PropsSelectGetApi } from './interfaces';
import Search from '../Search';
import WrapperLoadMore from '../WrapperLoadMore';
import clsx from 'clsx';
import styles from './SelectGetApi.module.scss';

function SelectGetApi({
  http,
  queryKey,
  name,
  form,
  setForm,
  keyDisplay = 'name',
  keyValue = 'id',
  label,
  placeholder = 'Chọn một mục',
  styleGray,
}: PropsSelectGetApi) {
  const ref = useRef<any>(null);
  const [open, setOpen] = useState(false);
  const [itemActive, setItemActive] = useState<any>(null);
  const { query } = useQueryParams();
  const { setQuery } = useQueryNextJS();
  // console.log(queryKey);
  const dataGet = useInfiniteQuery({
    queryKey: [queryKey, query?.[queryKey]],
    queryFn: ({ pageParam }) =>
      http({
        keyword: query?.[queryKey] || '',
        page: pageParam,
        pageSize: 14,
      }).then((res: any) => {
        return {
          list: res?.items || [],
          total: res?.items.length || 0,
        };
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      if (pages.length < Math.ceil(lastPage.total / 10)) {
        return pages.length + 1;
      }
      return undefined;
    },
  });

  const handleSelect = (item: any) => {
    setItemActive(item);
    setForm({
      ...form,
      [name]: item[keyValue],
    });
    setOpen(false);
  };

  //handle click outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  //set default value
  useEffect(() => {
    if (form[name] && !itemActive && dataGet?.data?.pages) {
      const item = dataGet?.data?.pages
        .map((group: any) => group.list)
        .flat()
        .find((item) => item[keyValue] === form[name]);
      setItemActive(item);
    }
  }, [form[name], dataGet?.data?.pages]);

  //reser keysearch when close
  useEffect(() => {
    if (!open) {
      setQuery({
        [queryKey]: null,
      });
    }
  }, [open]);

  // console.log(dataGet?.data?.pages);

  return (
    <label className={clsx(styles.container, { [styles.styleGray]: !!styleGray })}>
      {label && <div className={styles.label}>{label}</div>}
      <div className={clsx(styles.content, { [styles.active]: open })} ref={ref}>
        <div
          className={clsx(styles.selected, { [styles.hasValue]: !!form[name] })}
          onClick={() => setOpen(!open)}
        >
          {form[name] ? itemActive?.[keyDisplay] : placeholder}
          <i>
            <ArrowDown2 size={20} />
          </i>
        </div>
        {open ? (
          <div className={styles.option}>
            <Search placeholder="Nhập từ khoá" keyName={queryKey} />
            <WrapperLoadMore
              fetchNextPage={dataGet?.fetchNextPage}
              isFetchingNextPage={dataGet?.isFetchingNextPage}
              hasNextPage={dataGet?.hasNextPage}
              className={styles.list}
              activeWindow
              textLoad={'Đang tải thêm...'}
            >
              {dataGet?.data?.pages.map((group: any, i) => (
                <Fragment key={i}>
                  {group?.list?.map((item: any) => {
                    return (
                      <div
                        className={clsx(styles.item, {
                          [styles.active]: form[name] === item[keyValue],
                        })}
                        key={item[keyValue]}
                        onClick={() => handleSelect(item)}
                      >
                        {item[keyDisplay]}
                        <i>
                          <FaCheck />
                        </i>
                      </div>
                    );
                  })}
                </Fragment>
              ))}
            </WrapperLoadMore>
          </div>
        ) : null}
      </div>
    </label>
  );
}

export default memo(SelectGetApi);
