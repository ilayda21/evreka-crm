import { useEffect } from "react";

function useInfiniteScroll(
  loaderRef: React.RefObject<HTMLDivElement | null>,
  enabled: boolean,
  onLoadMore: () => void
) {
  useEffect(() => {
    if (!enabled || !loaderRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { threshold: 1 }
    );

    const current = loaderRef.current;
    observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [enabled, loaderRef, onLoadMore]);
}

export default useInfiniteScroll;
