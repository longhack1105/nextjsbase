import { BiCheck } from "react-icons/bi";
import { ListOptionTimePicker } from "~/constants/config";
import { PropsDateTypeOption } from "./interfaces";
import RangeDatePicker from "~/components/common/RangeDatePicker";
import { TYPE_DATE } from "~/constants/config/enum";
import TippyHeadless from "@tippyjs/react/headless";
import clsx from "clsx";
import styles from "./DateTypeOption.module.scss";
import { useRouter } from "next/router";
import i18n from "~/locale/i18n";

function DateTypeOption({
  date,
  show,
  setDate,
  setShow,
  keyTypeDate = "typeDate",
  keydateFrom = "dateFrom",
  keyDateTo = "dateTo",
}: PropsDateTypeOption) {
  const router = useRouter();

  const { [keyTypeDate]: typeDate } = router.query;

  const setQuery = (value: any) => {
    if (!!value) {
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            [keyTypeDate]: value,
          },
        },
        undefined,
        { shallow: true, scroll: false }
      );
    } else {
      if (!value) {
        const {
          [keyTypeDate]: typeDate,
          [keydateFrom]: dateFrom,
          [keyDateTo]: dateTo,
          ...rest
        } = router.query;
        router.replace(
          {
            pathname: router.pathname,
            query: {
              ...rest,
            },
          },
          undefined,
          { shallow: true, scroll: false }
        );
      }
    }
  };

  return (
    <TippyHeadless
      maxWidth={"100%"}
      interactive
      visible={Number(typeDate) == TYPE_DATE.LUA_CHON}
      placement="right-start"
      render={(attrs) => (
        <div className={styles.main_calender}>
          <RangeDatePicker
            value={date}
            onSetValue={setDate}
            onClose={() => setShow(false)}
            open={show && Number(typeDate) == TYPE_DATE.LUA_CHON}
          />
        </div>
      )}
    >
      <div className={styles.mainOption}>
        <div
          className={clsx(styles.option, {
            [styles.option_active]: typeDate == null,
          })}
          onClick={() => {
            setShow(false);
            setQuery(null);
          }}
        >
          <p>{i18n.t("Tất cả")}</p>
          {typeDate == null && (
            <div className={styles.icon_check}>
              <BiCheck fontSize={18} color="#5755FF" fontWeight={600} />
            </div>
          )}
        </div>
        {ListOptionTimePicker.map((v, i) => (
          <div
            key={i}
            className={clsx(styles.option, {
              [styles.option_active]: Number(typeDate) == v.value,
            })}
            onClick={() => {
              if (v.value != TYPE_DATE.LUA_CHON) {
                setShow(false);
              }
              setQuery(v.value);
            }}
          >
            <p>{i18n.t(v.name)}</p>
            {Number(typeDate) == v.value && (
              <div className={styles.icon_check}>
                <BiCheck fontSize={18} color="#5755FF" fontWeight={600} />
              </div>
            )}
          </div>
        ))}
      </div>
    </TippyHeadless>
  );
}

export default DateTypeOption;
