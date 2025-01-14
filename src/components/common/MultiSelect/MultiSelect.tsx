import { FC, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

const MultiSelect: FC<MultiSelectProps> = ({
  options,
  selected,
  onChange,
  placeholder = "Select Categories",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionToggle = (value: string) => {
    const newSelected = selected?.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  return (
    <div className="md:col-span-1 mb-4">
      <Select open={isOpen} onOpenChange={setIsOpen}>
        <SelectTrigger className="w-full">
          <SelectValue
            placeholder={
              selected.length > 0
                ? selected
                    .map(
                      (value) => options.find((o) => o.value === value)?.label
                    )
                    .join(", ")
                : placeholder
            }
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <div
              key={option.value}
              className="flex items-center px-4 py-2 space-x-2 cursor-pointer"
              onClick={() => handleOptionToggle(option.value)}
            >
              <Checkbox checked={selected.includes(option.value)} />
              <label className="text-sm">{option.label}</label>
            </div>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MultiSelect;
