import React from "react";

export interface PropsSkeletonLoading {
  Item: any;
  count: number;
  loading?: boolean;
  children?: React.ReactNode;
}
