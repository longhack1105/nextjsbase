import { useEffect, useState } from "react";

import { GrSearch } from "react-icons/gr";
import { PropsSearch } from "./interfaces";
import clsx from "clsx";
import styles from "./Search.module.scss";
import { useRouter } from "next/router";
import i18n from "~/locale/i18n";

function Search({
  placeholder = "Nhập từ khoá tìm kiếm",
  keyName = "keyword",
}: PropsSearch) {
  const router = useRouter();
  const [keyword, setKeyword] = useState<string>("");
  const [isFocus, setIsfocus] = useState<boolean>(false);

  const { [keyName]: keyQuery, ...rest } = router.query;

  useEffect(() => {
    if (!!keyQuery) setKeyword(keyQuery as string);
  }, [keyQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setType(keyName, keyword);
    }, 500);
    return () => clearTimeout(handler);
  }, [keyword]);

  const setType = (key: string, value: any) => {
    if (!!value) {
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            [key]: value,
          },
        },
        undefined,
        { shallow: true, scroll: false }
      );
    } else {
      if (Object.keys(router.query).length > 0) {
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
    <div className={clsx(styles.container, { [styles.focus]: isFocus })}>
      <div className={styles.icon}>
        <GrSearch color="#3f4752" size={20} />
      </div>
      <input
        type="search"
        value={keyword}
        placeholder={i18n.t("Nhập từ khoá tìm kiếm")}
        onFocus={() => setIsfocus(true)}
        onBlur={() => setIsfocus(false)}
        onChange={(e: any) => setKeyword(e.target.value)}
      />
    </div>
  );
}

export default Search;
