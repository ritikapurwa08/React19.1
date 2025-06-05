import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

interface CustomCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  disabled?: boolean;
}

export default function CustomCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  disabled,
}: Readonly<CustomCheckboxProps<T>>) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <FormItem className="flex items-center gap-x-2">
      <FormControl>
        <Checkbox
          checked={value}
          onCheckedChange={onChange}
          disabled={disabled}
        />
      </FormControl>
      <FormLabel>{label}</FormLabel>
      <FormMessage>{error?.message}</FormMessage>
    </FormItem>
  );
}
