import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Options } from "@/@types/options";

interface SelectFilterProps {
  form: UseFormReturn<any>;
  options: Options;
  name: string;
  label: string;
  required: boolean;
  fullWidth: boolean;
}

export default function SelectFilter({
  form,
  options,
  name,
  label,
  required,
  fullWidth,
}: SelectFilterProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={` ${
            fullWidth ? "md:w-1/2 w-full mt-2" : "xs:w-1/2 w-full xs:mt-0 mt-3"
          } flex-none max-w-full px-[calc(1.5rem*0.5)]`}
        >
          <FormLabel>
            {label} {required && <span className="text-red-600">*</span>}
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
            required={required}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((item) => (
                <SelectItem key={item.value} value={item.value.toString()}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
