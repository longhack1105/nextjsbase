import Link from "next/link";
import { PropsTabNavLink } from "./interface";
import clsx from "clsx";
import styles from "./TabNavLink.module.scss";
import { useRouter } from "next/router";

function filterPaths(keysToKeep: string[], pathObject: any) {
  const filteredPath: any = Object.fromEntries(
    Object.entries(pathObject).filter(([key]) => !keysToKeep.includes(key))
  );
  return filteredPath;
}

function TabNavLink({
  listHref,
  query,
  outline,
  keysToKeep = [],
}: PropsTabNavLink) {
  const router = useRouter();
  const handleActive = (value: string | null) => {
    const { [query]: str, keyword, page, PageSize, ...rest } = router.query;

    if (value == null) {
      return router.replace(
        {
          query: {
            ...filterPaths(keysToKeep, rest),
          },
        },
        undefined,
        {
          scroll: false,
        }
      );
    }

    return router.replace(
      {
        query: {
          ...filterPaths(keysToKeep, rest),
          [query]: value,
        },
      },
      undefined,
      {
        scroll: false,
      }
    );
  };
  return (
    <div className={clsx(styles.container, { [styles.outline]: outline })}>
      {listHref.map((item, i, arr) => (
        <div
          className={clsx(styles.item, {
            [styles.active]: router.query[`${query}`]
              ? router.query[`${query}`] === item.query
              : !item.query || item.query == arr[0].query,
          })}
          key={i}
          onClick={() => handleActive(item.query)}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}

export default TabNavLink;
