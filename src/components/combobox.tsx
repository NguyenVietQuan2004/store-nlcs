"use client";

import { useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const valueFilters = [
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "asc",
    label: "Price: Low-High",
  },
  {
    value: "desc",
    label: "Price: High-Low",
  },
];

export function Combobox({ setFilter, filter }: { setFilter: React.Dispatch<React.SetStateAction<any>>; filter: any }) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="mt-2 lg:mt-0 w-full lg:w-[200px] justify-between"
        >
          {filter.sortBy ? (
            valueFilters.find((framework) => framework.value === filter.sortBy)?.label
          ) : (
            <span className="text-sm text-[#707072] font-light">Select filters...</span>
          )}
          <ChevronsUpDown className="ml-2  h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[334px] max-w-full    lg:w-[200px] p-0">
        <Command className="">
          <CommandInput placeholder="Search filters..." autoFocus={false} />
          <CommandList>
            <CommandEmpty>No filter found.</CommandEmpty>
            <CommandGroup>
              {valueFilters.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue: string) => {
                    setFilter((pre: any) => {
                      return currentValue === filter.sortBy ? { ...pre, sortBy: "" } : { ...pre, sortBy: currentValue };
                    });
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn("mr-2 h-4 w-4", filter.sortBy === framework.value ? "opacity-100" : "opacity-0")}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
