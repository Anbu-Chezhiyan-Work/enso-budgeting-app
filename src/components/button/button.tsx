import { Button as AntButton } from "antd";
import type { ButtonProps } from "antd";

interface CustomButtonProps extends ButtonProps {
  label: string;
}

export default function CustomButton({ label, ...props }: CustomButtonProps) {
  return (
    <AntButton
      {...props}
      className={`rounded-md px-4 ${props.className || ""}`}
    >
      {label}
    </AntButton>
  );
}
