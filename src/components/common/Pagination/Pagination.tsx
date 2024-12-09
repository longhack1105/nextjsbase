import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import { usePathname, useSearchParams } from 'next/navigation';

import { ArrowDown2 } from 'iconsax-react';
import TippyHeadless from '@tippyjs/react/headless';
import clsx from 'clsx';
import { listLimit } from '~/constants/config';
import { newQueryPath } from '~/common/func/optionConvert';
import style from './Pagination.module.scss';
import useQueryParams from '~/common/hooks/useQueryParams';
import { useRouter } from 'next/router';
import i18n from '~/locale/i18n';

function Pagination({
  total,
  onSetPage,
  pageSize,
  onSetpageSize,
  currentPage,
  disableArrow,
  isShowBtn = true,
  dependencies = [],
  hiddeNote = false,
}: {
  total: number;
  pageSize: number | string | string[];
  currentPage: number;
  onSetPage?: (any: any) => void;
  onSetpageSize?: (any: any) => void;
  isShowBtn?: boolean;
  disableArrow?: boolean;
  hiddeNote?: boolean;
  dependencies?: Array<any>;
}) {
  const router = useRouter();

  const { replace } = useRouter();
  const pathname = usePathname();
  const { isReady } = useQueryParams();
  const searchParams = useSearchParams();

  const [openLimit, setOpenLimit] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(true);

  const items = useMemo(() => {
    const items: React.ReactNode[] = [];
    const max = Math.ceil(total / Number(pageSize));

    for (let i = 1; i <= max; i++) {
      if (
        i === currentPage - 1 ||
        i === currentPage + 1 ||
        i === currentPage ||
        i === 1 ||
        i === max
      ) {
        items.push(
          <li
            key={i}
            className={clsx([style.item, { [style.active]: currentPage === i }])}
            onClick={() => {
              if (!!onSetPage) {
                onSetPage(i);
              } else {
                replace(
                  newQueryPath(pathname, searchParams, {
                    page: i,
                  }),
                );
              }
            }}
          >
            {i}
          </li>,
        );
      }

      if (
        (i === currentPage - 2 && currentPage >= 4) ||
        (i === currentPage + 2 && i < max)
      ) {
        items.push(
          <li
            key={i}
            className={clsx([style.item, { [style.active]: currentPage === i }])}
          >
            ...
          </li>,
        );
      }
    }
    return items;
  }, [total, pageSize, currentPage, onSetPage, replace, pathname, searchParams]);

  const handlePrev = () => {
    if (currentPage > 1) {
      if (!!onSetPage) {
        onSetPage((prev: any) => prev - 1);
      } else {
        replace(
          newQueryPath(pathname, searchParams, {
            page: currentPage - 1,
          }),
        );
      }
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(total / Number(pageSize))) {
      if (!!onSetPage) {
        onSetPage((prev: any) => prev + 1);
      } else {
        replace(
          newQueryPath(pathname, searchParams, {
            page: currentPage + 1,
          }),
        );
      }
    }
  };

  // Set PageSize
  const handleSetPageSize = (limit: number) => {
    setOpenLimit(false);

    if (!!onSetpageSize) {
      onSetpageSize(pageSize);
    } else {
      router.replace(
        {
          ...router,
          query: {
            ...router.query,
            PageSize: limit,
          },
        },
        undefined,
        { scroll: false },
      );
    }
  };

  useEffect(() => {
    const handleStop = () => {
      setFirstLoad(false);
    };
    router.events.on('routeChangeStart', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStop);
    };
  }, []);

  useEffect(() => {
    if (!!onSetpageSize) {
      onSetpageSize(() => 10);
    } else {
      if (!firstLoad) {
        if (Object.keys(router.query).length > 0) {
          router.replace(
            {
              ...router,
              query: {
                ...router.query,
                PageSize: 10,
              },
            },
            undefined,
            { scroll: false },
          );
        }
      }
    }

    if (!!onSetPage) {
      onSetPage(() => 1);
    } else {
      if (isReady) {
        replace(
          newQueryPath(pathname, searchParams, {
            page: 1,
          }),
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return (
    <div className={style.main}>
      {!!total && total != 0 ? (
        <Fragment>
          {hiddeNote ? (
            <div></div>
          ) : (
            <div className={style.text}>
              {i18n.t('Hiển thị')}{' '}
              <p>
                {((Number(currentPage) || 1) - 1) * Number(pageSize) + 1} {`->`}{' '}
                {Math.min((Number(currentPage) || 1) * Number(pageSize), total)}
              </p>{' '}
              {i18n.t('trong tổng số')} <p>{total}</p> {i18n.t('kết quả')}
            </div>
          )}
          <div className={style.page}>
            <Fragment>
              {!disableArrow && isShowBtn && currentPage > 1 && (
                <button className={clsx([style.btn, style.left])} onClick={handlePrev}>
                  <IoChevronBackOutline />
                </button>
              )}
              <ul className={style.list}>{items}</ul>
              {!disableArrow &&
                isShowBtn &&
                currentPage < Math.ceil(total / Number(pageSize)) && (
                  <button className={clsx([style.btn, style.right])} onClick={handleNext}>
                    <IoChevronForwardOutline />
                  </button>
                )}
              <TippyHeadless
                maxWidth={'100%'}
                interactive
                visible={openLimit}
                onClickOutside={() => setOpenLimit(false)}
                placement="bottom-end"
                render={(attrs: any) => (
                  <div className={style.list_limit}>
                    {listLimit.map((v, i) => (
                      <div
                        key={i}
                        className={clsx(style.item_limit, {
                          [style.activeItemLimit]: pageSize == v,
                        })}
                        onClick={() => handleSetPageSize(v)}
                      >
                        {v}
                      </div>
                    ))}
                  </div>
                )}
              >
                <div
                  className={clsx(style.limit, {
                    [style.activeLimit]: openLimit,
                  })}
                  onClick={() => setOpenLimit(!openLimit)}
                >
                  <span>{pageSize}</span>
                  <div className={style.icon_arrow}>
                    <ArrowDown2 size={18} />
                  </div>
                </div>
              </TippyHeadless>
            </Fragment>
          </div>
        </Fragment>
      ) : null}
    </div>
  );
}

export default memo(Pagination);
