import { Fragment, useMemo } from "react";

import { PropsSkeletonLoading } from "./interface";

function SkeletonLoading({
  count,
  Item,
  loading,
  children,
}: PropsSkeletonLoading) {
  const listItem: any[] = useMemo(() => {
    const list: any[] = [];
    for (let index = 0; index < count; index++) {
      list.push(Item);
    }
    return list;
  }, [Item, count]);

  return (
    <Fragment>
      {loading
        ? listItem.map((VItem, i) => {
            return <VItem key={i} />;
          })
        : children}
    </Fragment>
  );
}

export default SkeletonLoading;
