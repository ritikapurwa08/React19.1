import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from "react-hook-form";

interface Option {
  label: string;
  value: string;
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

export default function CustomSelect<T extends FieldValues>({
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

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Select
          value={field.value}
          onValueChange={field.onChange}
          disabled={disabled}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder || "Select option"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage>{error?.message}</FormMessage>
    </FormItem>
  );
}
