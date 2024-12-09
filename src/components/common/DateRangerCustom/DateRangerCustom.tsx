import { useEffect, useState } from 'react';

import { ArrowDown2 } from 'iconsax-react';
import DateTypeOption from './components/DateTypeOption';
import Moment from 'react-moment';
import { PropsDateRangerCustom } from './interfaces';
import { TYPE_DATE } from '~/constants/config/enum';
import { TippyHeadless } from '../Tippy';
import clsx from 'clsx';
import { getDateRange } from '~/common/func/selectDate';
import moment from 'moment';
import styles from './DateRangerCustom.module.scss';
import { timeSubmit } from '~/common/func/optionConvert';
import { useRouter } from 'next/router';
import i18n from '~/locale/i18n';

function DateRangerCustom({
  titleTime = 'Thời gian',
  keyTypeDate = 'typeDate',
  keydateFrom = 'dateFrom',
  keyDateTo = 'dateTo',
  formStyle,
}: PropsDateRangerCustom) {
  const router = useRouter();

  const {
    [keyTypeDate]: typeDate,
    [keydateFrom]: dateFrom,
    [keyDateTo]: dateTo,
  } = router.query;

  const [show, setShow] = useState<boolean>(false);

  const [date, setDate] = useState<{
    from: Date | null;
    to: Date | null;
  } | null>(null);

  useEffect(() => {
    if (Number(typeDate) != TYPE_DATE.LUA_CHON) {
      setDate(() => getDateRange(Number(typeDate))!);
    } else {
      if (!!dateFrom && !!dateTo) {
        setDate(() => ({
          from: new Date(dateFrom as string),
          to: new Date(dateTo as string),
        }));
      }
    }
  }, [typeDate]);

  useEffect(() => {
    if (date?.from && date?.to) {
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            [keydateFrom]: date?.from ? moment(date?.from).format('YYYY-MM-DD') : '',
            [keyDateTo]: date?.to ? moment(date?.to).format('YYYY-MM-DD') : '',
          },
        },
        undefined,
        { scroll: false },
      );
    }
  }, [date?.from, date?.to]);

  return (
    <TippyHeadless
      visible={show}
      onClickOutside={() => setShow(false)}
      position="bottom-start"
      render={() => (
        <DateTypeOption
          date={date}
          setDate={setDate}
          show={show}
          setShow={setShow}
          keyTypeDate={keyTypeDate}
          keydateFrom={keydateFrom}
          keyDateTo={keyDateTo}
        />
      )}
    >
      <div
        className={clsx(
          styles.style2,
          { [styles.focus]: show },
          { [styles.formStyle]: !!formStyle },
        )}
        onClick={() => setShow(!show)}
      >
        <span>
          {titleTime ? <>{titleTime} :&nbsp;&nbsp;</> : null}
          {date?.from && date?.to ? (
            <span className={styles.value}>
              <Moment date={date?.from} format="DD/MM/YYYY" utc local /> -{' '}
              <Moment date={date?.to} format="DD/MM/YYYY" utc local />
            </span>
          ) : (
            <span className={styles.value}>{i18n.t('Tất cả')}</span>
          )}
        </span>
        <div className={clsx(styles.icon_arrow, { [styles.active_icon]: show })}>
          <ArrowDown2 size={18} color="#3F4752" />
        </div>
      </div>
    </TippyHeadless>
  );
}

export default DateRangerCustom;
