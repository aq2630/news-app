import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useCallback } from "react";
import { fetchNews } from "@/store/slices/newsActions";
import { RootState } from "@/store/store";
import SideDrawer from "@/components/common/SideDrawer/SideDrawer";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state: RootState) => state.news);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      dispatch(fetchNews({ ...filters, searchQuery: query }));
    }, 500),
    [dispatch]
  );

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(event.target.value);
    },
    []
  );

  return (
    <nav className="mb-4">
      <div className="flex gap-3">
        <SideDrawer
        // handleMultiSelect={handleMultiSelect}
        // onValueChange={handleSourceChange}
        // articles={articles}
        // filters={filters}
        // handleDateChange={handleDateChange}
        />
        <h2 className="text-2xl font-bold">News App </h2>
        <div className="flex-1">
          <Input
            placeholder="Search for Articles"
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
