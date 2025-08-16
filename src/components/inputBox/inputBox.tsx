import { Input as AntInput } from "antd";
import type { InputProps } from "antd";

interface CustomInputProps extends InputProps {
  label?: string;
}

export default function CustomInput({ label, ...props }: CustomInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <AntInput {...props} className={`rounded-md ${props.className || ""}`} />
    </div>
  );
}
