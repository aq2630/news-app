"use client";

import { FC } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SelectSingleEventHandler } from "react-day-picker";

interface DatePickerProps {
  dateValue: Date;
  onSelect: SelectSingleEventHandler;
  fromDate?: Date;
}

const DatePicker: FC<DatePickerProps> = ({ dateValue, onSelect, fromDate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateValue && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {dateValue ? format(dateValue, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={dateValue}
          onSelect={onSelect}
          className="rounded-md border shadow"
          fromDate={fromDate ? fromDate : undefined}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
