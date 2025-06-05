import React from "react";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface CustomPasswordInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  icon?: LucideIcon;
  showPassword?: boolean;
  setShowPassword?: (showPassword: boolean) => void;
  iconClassName?: string;
  labelClassName?: string;
}

const CustomPasswordInput = <T extends FieldValues>({
  control,
  name,
  label,
  disabled,
  className,
  error,
  onChange,
  showPassword,
  icon: Icon,
  placeholder,
}: CustomPasswordInputProps<T>) => {
  const {
    field,
    fieldState: { error: fieldError },
  } = useController({ name, control });

  return (
    <FormItem className="relative flex flex-col gap-y-0.5">
      <FormControl className="m-0 p-0">
        <div className="">
          <div id="label-container">
            <div id="label-input-container">
              <FormLabel
                htmlFor={`${name}-input`}
                className="text-foreground pb-2"
              >
                {label}
              </FormLabel>
            </div>

            <div id="icon-input-container" className="relative">
              <div id="icon-container">
                {Icon && (
                  <div className="absolute flex justify-center items-center top-1/2 transform -translate-y-1/2 w-10">
                    <Icon className={cn("text-foreground size-5")} />
                  </div>
                )}
              </div>

              <div id="input-container">
                <Input
                  id={`${name}-input`}
                  type={showPassword ? "text" : "password"}
                  placeholder={placeholder}
                  {...field}
                  disabled={disabled}
                  className={cn(
                    // Core styling
                    "bg-input text-foreground placeholder-muted-foreground border border-border rounded-md",

                    // Focus + ring behavior
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",

                    // Autofill fix (if you're using one)
                    "autofill:bg-transparent autofill:text-foreground",

                    // Custom highlight color
                    "focus-visible:ring-zinc-600",

                    // Conditional padding if there's an icon
                    Icon ? "pl-10" : "pl-2",

                    // Transitions
                    "transition-all duration-300 ease-in-out",

                    // External class
                    className
                  )}
                  onChange={(e) => {
                    field.onChange(e);
                    onChange?.(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </FormControl>

      <FormMessage className="m-0 -mb-4 p-0 text-xs text-red-600">
        {(error || fieldError?.message) && (
          <span>{error || fieldError?.message}</span>
        )}
      </FormMessage>
    </FormItem>
  );
};

export default CustomPasswordInput;
