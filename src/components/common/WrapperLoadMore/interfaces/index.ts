export interface PropsWrapperLoadMore {
  className?: string;
  children: any;
  fetchNextPage: (any?: any) => void;
  hasNextPage: any;
  isFetchingNextPage: any;
  dep?: any[];
  textLoad?: string;
  activeWindow?: boolean;
}
