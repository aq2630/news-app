import { useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MultiSelect from "@/components/common/MultiSelect/MultiSelect";
import SelectInput from "@/components/common/SelectInput/SelectInput";
import { Menu } from "lucide-react";
import { AUTHORS, CATEGORIES } from "@/constants/commonConstants";
import DatePicker from "@/components/common/DatePicker/DatePicker";
import { Button } from "@/components/ui/button";
import { resetFilters, updateFilters } from "@/store/slices/newsSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { format } from "date-fns";
import { RootState } from "@/store/store";

const SideDrawer = () => {
  const dispatch = useAppDispatch();

  const { filters } = useAppSelector((state: RootState) => state.news);

  const handleSourceChange = (selectedOptions: string) => {
    dispatch(updateFilters({ source: selectedOptions }));
  };

  const handleDateChange = (dateValue: Date | undefined, fieldName: string) => {
    const isoDate =
      dateValue && format(new Date(dateValue), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    dispatch(updateFilters({ [fieldName]: isoDate }));
  };

  const handleAuthorSelect = useCallback(
    (selectedOptions: string[]) => {
      dispatch(updateFilters({ authors: selectedOptions }));
    },
    [dispatch]
  );

  const handleCategorySelect = useCallback(
    (selectedOptions: string[]) => {
      dispatch(updateFilters({ categories: selectedOptions }));
    },
    [dispatch]
  );

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Filter and Personalize your Feed</SheetTitle>
          <h4 className="font-semibold">Source</h4>
          <SelectInput
            placeholder="Select Source"
            onValueChange={handleSourceChange}
            value={filters.source}
          />
          <h4 className="font-semibold">Categories</h4>
          <MultiSelect
            options={CATEGORIES}
            selected={filters?.categories || []}
            onChange={handleCategorySelect}
          />
          <h4 className="font-semibold">Author</h4>
          <MultiSelect
            options={AUTHORS}
            selected={filters?.authors || []}
            onChange={handleAuthorSelect}
            placeholder="Select Author"
          />
          <h4 className="font-semibold">Date Ranges</h4>
          <h5>Start Date</h5>
          <DatePicker
            dateValue={filters.dateFrom}
            onSelect={(value) => {
              handleDateChange(value, "dateFrom");
            }}
          />
          <h5>End Date</h5>
          <DatePicker
            dateValue={filters.dateTo}
            onSelect={(value) => {
              handleDateChange(value, "dateTo");
            }}
            fromDate={filters.dateFrom}
          />
          <div className="pt-4">
            <Button variant="outline" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SideDrawer;
