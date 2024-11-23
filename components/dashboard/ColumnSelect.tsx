"use client"

// Components Import
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ColumnSelect = ({
  setColumn,
}: {
  setColumn: (column: "Customer Support" | "Customer Acquisition" | "Others") => void
}) => {
  return (
    <Select onValueChange={(value) => setColumn(value as "Customer Support" | "Customer Acquisition" | "Others")}>
      <SelectTrigger className="w-[180px] text-white border-2 border-purple-600 rounded-xl text-xs">
        <SelectValue placeholder="Select Column" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Customer Support">Customer Support</SelectItem>
        <SelectItem value="Customer Acquisition">Customer Acquisition</SelectItem>
        <SelectItem value="Others">Others</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ColumnSelect
