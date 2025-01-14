import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SOURCE_OPTIONS } from "@/constants/commonConstants";
import { FC } from "react";

interface SelectInputProps {
  onValueChange: (selectedOptions: string) => void;
  placeholder: string;
  value: string;
}

const SelectInput: FC<SelectInputProps> = ({
  onValueChange,
  placeholder,
  value,
}) => {
  return (
    <div className="mb-4">
      <Select onValueChange={onValueChange} defaultValue={value}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {SOURCE_OPTIONS.map((source) => (
            <SelectItem key={source.value} value={source.value}>
              {source.label}
            </SelectItem>
          ))}
          {/* <SelectItem value="all">All Sources</SelectItem>
          <SelectItem value="newsapi">NewsAPI</SelectItem>
          <SelectItem value="nyt">New York Times</SelectItem>
          <SelectItem value="guardian">The Guardian</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectInput;
