import { FC } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import RangePIcker from "@/components/common/DatePicker/DatePicker";
import MultiSelect from "@/components/common/MultiSelect/MultiSelect";
import SelectInput from "@/components/common/SelectInput/SelectInput";
import { Menu } from "lucide-react";
import { NewsFilters } from "@/types/news.types";
import {
  AUTHORS,
  CATEGORIES,
  SOURCE_OPTIONS,
} from "@/constants/commonConstants";
import DatePicker from "@/components/common/DatePicker/DatePicker";

interface SideDrawerProps {
  onValueChange: (selectedOptions: string) => void;
  handleMultiSelect: (selectedOptions: string[], fieldName: string) => void;
  handleDateChange: (date: Date, fieldName: string) => void;
  articles: any[];
  filters: NewsFilters;
}

const SideDrawer: FC<SideDrawerProps> = ({
  onValueChange,
  handleMultiSelect,
  handleDateChange,
  articles,
  filters,
}) => {
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
            onValueChange={onValueChange}
            value={filters.source}
          />
          <h4 className="font-semibold">Categories</h4>
          <MultiSelect
            options={CATEGORIES}
            selected={filters?.categories || []}
            onChange={(selectedOptions) =>
              handleMultiSelect(selectedOptions, "categories")
            }
          />
          <h4 className="font-semibold">Author</h4>
          <MultiSelect
            options={AUTHORS}
            selected={filters?.authors || []}
            onChange={(selectedOptions) =>
              handleMultiSelect(selectedOptions, "authors")
            }
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
        </SheetHeader>
        {/* <RangePIcker filters={filters} /> */}
      </SheetContent>
    </Sheet>
  );
};

export default SideDrawer;
