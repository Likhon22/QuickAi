import type { HTMLAttributes, ReactNode } from "react";

import clsx from "clsx";
type QButtonProps = {
  text?: string;
  icon?: ReactNode;

  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
} & HTMLAttributes<HTMLButtonElement>;
const QButton = ({
  text,
  icon,

  disabled = false,
  className,
  type = "button",
  ...props
}: QButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      type={type}
      className={clsx(
        "bg-primary flex items-center text-white gap-2 rounded-full text-sm cursor-pointer px-10 py-2.5 hover:bg-primary/90 hover:scale-105 transition-all duration-150  disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {text && <span className="text-sm">{text}</span>}
      {icon && <span className="text-lg">{icon}</span>}
    </button>
  );
};

export default QButton;
