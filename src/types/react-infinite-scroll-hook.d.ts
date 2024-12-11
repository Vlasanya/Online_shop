declare module "react-infinite-scroll-hook" {
    import { MutableRefObject } from "react";
  
    interface InfiniteScrollHookProps {
      loading: boolean;
      hasNextPage: boolean;
      onLoadMore: () => void;
      disabled: boolean;
      rootMargin: string;
    }
  
    const useInfiniteScroll: (
      props: InfiniteScrollHookProps
    ) => [MutableRefObject<HTMLElement | null>];
  
    export default useInfiniteScroll;
  }
  