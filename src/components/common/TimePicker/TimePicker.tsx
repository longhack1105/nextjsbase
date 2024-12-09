import { PropsTimePicker, Time } from './interfaces';
import { useEffect, useState } from 'react';

import { RxCaretSort } from 'react-icons/rx';
import TimeKeeper from 'react-timekeeper';
import TippyHeadless from '@tippyjs/react/headless';
import clsx from 'clsx';
import styles from './TimePicker.module.scss';
import { FaRegClock } from 'react-icons/fa6';

function TimePicker({ value, onSetValue, label, ...props }: PropsTimePicker) {
  const [time, setTime] = useState<Time>({
    formatted24: '12:00',
  });
  const [show, setShow] = useState(false);
  const [firstChange, setFirstChange] = useState(true);

  useEffect(() => {
    if (!show) {
      setTime(value);
    } else {
      if (!!value) {
        setTime(value);
      }
    }
  }, [show, value]);

  return (
    <div>
      <TippyHeadless
        maxWidth={'100%'}
        interactive
        visible={show}
        onClickOutside={() => setShow(false)}
        placement="bottom"
        render={() => (
          <TimeKeeper
            time={time?.formatted24}
            onChange={(newTime) => {
              setTime(newTime);
              onSetValue(newTime);
              setFirstChange(false);
            }}
            hour24Mode
            switchToMinuteOnHourSelect
            {...props}
          />
        )}
      >
        <div onClick={() => setShow(!show)}>
          {label ? <label className={styles.label}>{label}</label> : null}
          <div className={clsx(styles.container, { [styles.active]: show })}>
            {time?.formatted24}{' '}
            <FaRegClock size={18} style={{ color: 'rgb(63, 71, 82)' }} />
          </div>
        </div>
      </TippyHeadless>
    </div>
  );
}

export default TimePicker;
