import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  useController,
  type Control,
  type FieldPath,
  type FieldValues,
  type PathValue,
} from "react-hook-form";

interface CustomTextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: PathValue<T, FieldPath<T>>;
}

export default function CustomTextarea<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  disabled,
  className,
  defaultValue,
}: Readonly<CustomTextareaProps<T>>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, defaultValue });

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Textarea
          placeholder={placeholder || label}
          disabled={disabled}
          className={className}
          {...field}
        />
      </FormControl>
      <FormMessage>{error?.message}</FormMessage>
    </FormItem>
  );
}
