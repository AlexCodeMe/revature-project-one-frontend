import { LucideIcon } from "lucide-react";

interface MenuItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

export function MenuItem({
  icon: Icon,
  label,
  onClick,
  variant = "default",
}: MenuItemProps) {
  const baseClasses =
    "flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer";
  const variantClasses = {
    default: "text-gray-700 hover:text-gray-900",
    danger: "text-red-600 hover:text-red-700",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]}`}
      onClick={onClick}
      type="button"
    >
      <Icon className="mr-2 h-4 w-4" />
      <span>{label}</span>
    </button>
  );
}
