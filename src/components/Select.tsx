import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

type SelectsProps = {
  placeholder?: string
  value?: string
  onValueChange?: (value: string) => void
  options: { label: string; value: string }[]
}

export function Selects({
  placeholder = "Select...",
  value,
  onValueChange,
  options,
}: SelectsProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}