import { useMemo } from "react";

interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "h-8 w-8 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-12 w-12 text-lg",
};

export function Avatar({ name, imageUrl, size = "md" }: AvatarProps) {
  const initials = useMemo(() => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }, [name]);

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="rounded-full object-cover w-full h-full"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full rounded-full bg-blue-100 text-blue-600 font-medium">
          {initials}
        </div>
      )}
    </div>
  );
}
