"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Option {
  label: string;
  value: string;
}

interface DropdownRadioFilterProps {
  label: string; // Label shown on dropdown button when no selection (e.g. "Category")
  options: Option[]; // List of options to choose from
  value: string; // current selected value
  onChange: (value: string) => void; // callback when user selects option
}

export function DropdownRadioFilter({
  label,
  options,
  value,
  onChange,
}: DropdownRadioFilterProps) {
  // Show label if no value selected, else show selected option label
  const selectedLabel = value
    ? options.find((opt) => opt.value === value)?.label
    : label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{selectedLabel}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select {label.toLowerCase()}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {options.map(({ label, value }) => (
            <DropdownMenuRadioItem key={value} value={value}>
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
