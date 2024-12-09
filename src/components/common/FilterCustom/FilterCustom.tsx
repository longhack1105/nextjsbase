import { Fragment, memo, useEffect, useMemo, useState } from 'react';

import { ArrowDown2 } from 'iconsax-react';
import { BiCheck } from 'react-icons/bi';
import { PropsFilterCustom } from './interfaces';
import Search from '../Search';
import TippyHeadless from '@tippyjs/react/headless';
import WrapperLoadMore from '../WrapperLoadMore';
import clsx from 'clsx';
import { getNameMethod } from '~/common/func/optionConvert';
import styles from './FilterCustom.module.scss';
import { useRouter } from 'next/router';
import i18n from '~/locale/i18n';

function FilterCustom({
  listFilter,
  name,
  query,
  useInfinite,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  keyName = '',
  dep,
  selectOption,
}: PropsFilterCustom) {
  const router = useRouter();
  const { [query]: queryStr, ...rest } = router.query;
  const [open, setOpen] = useState<boolean>(false);

  const listData = useMemo(() => {
    if (useInfinite && listFilter?.pages) {
      const itemsArrays = listFilter?.pages.map((page: any) => page.item);
      return itemsArrays.reduce((result: any, items: any) => result.concat(items), []);
    }
    return listFilter;
  }, [listFilter, useInfinite]);

  console.log(listData);

  useEffect(() => {
    router.replace(
      {
        query: {
          ...rest,
          [query]: selectOption,
        },
      },
      undefined,
      {
        scroll: false,
      },
    );
  }, [selectOption]);

  return (
    <TippyHeadless
      maxWidth={'100%'}
      interactive
      visible={open}
      onClickOutside={() => setOpen(false)}
      placement="bottom-start"
      render={(attrs: any) => (
        <div className={styles.mainOption}>
          {keyName ? <Search keyName={keyName} /> : null}
          {!selectOption ? (
            <>
              <div
                className={clsx(styles.option, {
                  [styles.option_active]: !queryStr,
                })}
                onClick={() => {
                  setOpen(false);
                  router.replace(
                    {
                      query: {
                        ...rest,
                      },
                    },
                    undefined,
                    {
                      scroll: false,
                    },
                  );
                }}
              >
                <p>{i18n.t('Tất cả')}</p>
                {!queryStr && (
                  <div className={styles.icon_check}>
                    <BiCheck fontSize={18} color="#5755FF" fontWeight={600} />
                  </div>
                )}
              </div>
            </>
          ) : null}

          {useInfinite ? (
            <WrapperLoadMore
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              className={styles.list}
              dep={dep}
            >
              {listData?.map((v: any) => (
                <div
                  className={clsx(styles.option, {
                    [styles.option_active]: queryStr == v.id,
                  })}
                  key={v.id}
                  onClick={() => {
                    setOpen(false);
                    router.replace(
                      {
                        query: {
                          ...router.query,
                          [query]: v.id,
                        },
                      },
                      undefined,
                      { scroll: false },
                    );
                  }}
                >
                  <div className={styles.item}>
                    <p className={styles.name_nation}>{v.name}</p>
                    {queryStr == v.id && (
                      <div className={styles.icon_check}>
                        <BiCheck fontSize={18} color="#5755FF" fontWeight={600} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </WrapperLoadMore>
          ) : (
            listFilter?.map((v: any, i: number) => (
              <div
                key={i}
                className={clsx(styles.option, {
                  [styles.option_active]: queryStr == v.id,
                })}
                onClick={() => {
                  setOpen(false);
                  router.replace(
                    {
                      query: {
                        ...router.query,
                        [query]: v.id,
                      },
                    },
                    undefined,
                    { scroll: false },
                  );
                }}
              >
                <p>{v.name}</p>
                {queryStr == v.id && (
                  <div className={styles.icon_check}>
                    <BiCheck fontSize={18} color="#5755FF" fontWeight={600} />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    >
      <div
        className={clsx(styles.dealer, { [styles.active]: open })}
        onClick={() => setOpen(!open)}
      >
        <div className={styles.value}>
          <p className={styles.name}>{name}:</p>
          <p className={styles.text}>{getNameMethod(listData, queryStr)}</p>
        </div>
        <div className={styles.icon_arrow}>
          <ArrowDown2 size={18} color="#3F4752" />
        </div>
      </div>
    </TippyHeadless>
  );
}

export default memo(FilterCustom);
