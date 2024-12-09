import { RootState, store } from "~/redux/store";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Calendar } from "iconsax-react";
import Moment from "react-moment";
import { PropsInputDateRanger } from "./interfaces";
import RangeDatePicker from "~/components/common/RangeDatePicker";
// import TippyHeadless from "@tippyjs/react/headless";
import { TippyHeadless } from "../Tippy";
import clsx from "clsx";
import styles from "./InputDateRanger.module.scss";
import { updateSort } from "~/redux/reducer/site";
import { useSelector } from "react-redux";

function InputDateRanger({
  title,
  keyName = "ranger-date",
  value,
  setValue,
  onSubmit,
}: PropsInputDateRanger) {
  const [show, setShow] = useState(false);
  const { [keyName]: date } = useSelector(
    (state: RootState) => state.site
  ).sort;
  const handleChangeValue = useCallback(
    (data: any) => {
      setValue
        ? setValue(data)
        : store.dispatch(updateSort({ name: keyName, value: data }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [keyName]
  );

  useEffect(() => {
    return () => {
      setValue
        ? setValue(null)
        : store.dispatch(updateSort({ name: keyName, value: null }));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyName]);

  const valueCalendar = useMemo(() => (value ? value : date), [date, value]);

  // const dateString = useMemo(() => {
  // 	if (valueCalendar) {
  // 		return (
  // 			<Fragment>
  // 				:{' '}
  // 				<b>
  // 					<Moment format='DD/MM/YYYY' date={valueCalendar.from} />{' '}
  // 					- <Moment format='DD/MM/YYYY' date={valueCalendar.to} />
  // 				</b>
  // 			</Fragment>
  // 		);
  // 	}

  // 	return null;
  // }, [valueCalendar]);

  return (
    <div>
      <TippyHeadless
        visible={show}
        onClickOutside={() => setShow(false)}
        position="bottom-start"
        // placement="right-start"
        render={() => (
          <RangeDatePicker
            onClose={() => setShow(false)}
            onSetValue={handleChangeValue}
            value={valueCalendar}
            open={show}
            onSubmit={onSubmit}
          />
        )}
      >
        <div
          className={clsx(styles.style2, { [styles.focus]: show })}
          onClick={() => setShow(!show)}
        >
          <Calendar color="#888888" variant="Bold" size={24} />
          {valueCalendar?.from ? (
            <div>
              <Moment format="DD/MM/YYYY" date={valueCalendar.from} utc local />{" "}
              - <Moment format="DD/MM/YYYY" date={valueCalendar.to} utc local />
            </div>
          ) : (
            <span>{title}</span>
          )}
        </div>
      </TippyHeadless>
    </div>
  );
}

export default InputDateRanger;

// ) : (
// 	<div
// 		className={clsx(styles.containner, 'btn', {
// 			[styles.active]: show,
// 		})}
// 		onClick={() => setShow(!show)}
// 	>
// 		<Icon size='16' className='icon' />
// 		<p>
// 			{title}
// 			{dateString}
// 		</p>
// 		<ArrowDown2 className={styles.arrow} size='16' />
// 	</div>
// )}
