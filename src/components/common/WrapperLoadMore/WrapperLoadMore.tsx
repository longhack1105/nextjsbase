import { useCallback, useEffect, useRef } from 'react';

import { PropsWrapperLoadMore } from './interfaces';
import clsx from 'clsx';
import i18n from '~/locale/i18n';
import styles from './WrapperLoadMore.module.scss';

function WrapperLoadMore({
  className,
  children,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
  textLoad = 'Đang tải thêm...',
  activeWindow,
}: PropsWrapperLoadMore) {
  const ref = useRef<any>(null);

  const handleScroll = useCallback(() => {
    if (typeof window !== 'undefined' && activeWindow) {
      if (
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 20 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    } else if (ref.current) {
      const div = ref.current;
      if (
        div.scrollTop + div.clientHeight >= div.scrollHeight - 20 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    }
  }, [activeWindow, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (typeof window !== 'undefined' && activeWindow) {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [activeWindow, handleScroll]);

  return (
    <div
      className={className}
      ref={ref}
      onScroll={!activeWindow ? handleScroll : undefined}
    >
      {children}
      {isFetchingNextPage && textLoad ? <p className={styles.load}>{textLoad}</p> : null}
      {/* {!hasNextPage ? (
        <p className={clsx(styles.load, styles.end)}>Hết</p>
      ) : null} */}
    </div>
  );
}

export default WrapperLoadMore;
