import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from "react-hook-form";

import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
  name: string;
  email: string;
}

interface CustomSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  defaultValue?: PathValue<T, FieldPath<T>>;
}

export default function CustomSelectSearch<T extends FieldValues>({
  name,
  control,
  label,
  options,
  placeholder,
  disabled,
  defaultValue,
}: Readonly<CustomSelectProps<T>>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  const [open, setOpen] = useState(false);

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              className="w-full justify-between"
              disabled={disabled}
            >
              {field.value || placeholder || "Select a name and get your email"}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full min-w-80 p-0">
            <Command>
              <CommandInput placeholder="Search name or email..." />
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup
                className={cn(
                  "overflow-y-auto",
                  options.length > 5 ? "max-h-48" : `h-auto`
                )}
              >
                {options.map((option) => (
                  <CommandItem
                    key={option.email}
                    value={option.email}
                    onSelect={() => {
                      field.onChange(option.email);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value === option.email
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col text-left">
                      <span className="font-medium">{option.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {option.email}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </FormControl>
      <FormMessage>{error?.message}</FormMessage>
    </FormItem>
  );
}
