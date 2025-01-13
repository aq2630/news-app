import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";
import { updateFilters } from "../../store/slices/newsSlice";
import { fetchNews } from "@/store/slices/newsActions";
import { RootState } from "@/store/store";
import SideDrawer from "@/components/common/SideDrawer/SideDrawer";
import NewsFeed from "@/components/common/NewsFeed/NewsFeed";
import { ALL_SOURCES } from "@/constants/commonConstants";
import { format } from "date-fns";

export const Home = () => {
  const dispatch = useAppDispatch();
  const { articles, loading, filters, page, hasMore } = useAppSelector(
    (state: RootState) => state.news
  );

  const handleSourceChange = (selectedOptions: string) => {
    if (selectedOptions === "all") {
      dispatch(updateFilters({ sources: ALL_SOURCES }));
    } else {
      dispatch(updateFilters({ sources: [selectedOptions] }));
    }
  };

  const handleDateChange = (dateValue: Date, fieldName: string) => {
    const isoDate = format(new Date(dateValue), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    dispatch(updateFilters({ ...filters, [fieldName]: isoDate }));
  };

  const handleMultiSelect = (selectedOptions: string[], fieldName: string) => {
    dispatch(updateFilters({ ...filters, [fieldName]: selectedOptions }));
  };

  // const debouncedSearch = useCallback(
  //   debounce((query: string) => {
  //     dispatch(fetchNews({ ...filters, searchQuery: query }));
  //   }, 500),
  //   [dispatch]
  // );

  // const handleSearchChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   debouncedSearch(event.target.value);
  // };

  const fetchMoreData = () => {
    if (!loading && hasMore) {
      dispatch(fetchNews({ ...filters, page: page + 1 }));
    }
  };

  useEffect(() => {
    dispatch(fetchNews({ ...filters, page: 1 }));
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <nav>
        <div className="flex gap-3">
          <SideDrawer
            handleMultiSelect={handleMultiSelect}
            onValueChange={handleSourceChange}
            articles={articles}
            filters={filters}
            handleDateChange={handleDateChange}
            // selected={selected}
          />
          <h2 className="text-2xl font-bold">News App </h2>
        </div>
      </nav>

      <NewsFeed
        articles={articles}
        loading={loading}
        hasMore={hasMore}
        fetchMoreData={fetchMoreData}
      />
    </div>
  );
};

export default Home;
