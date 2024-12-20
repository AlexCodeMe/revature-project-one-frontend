import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, UserIcon } from "lucide-react";
import { Avatar } from "./avatar";
import { MenuItem } from "./menu-item";
import { User } from "../../lib/types";

interface UserMenuProps {
  user: User | null;
  onLogout: () => void;
}

export function UserMenu({ user, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Avatar name={user?.firstName + " " + user?.lastName} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <div className="px-4 py-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-gray-900">
                  {user?.username}
                </p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>

            <div className="border-t border-gray-100" />

            <MenuItem
              icon={UserIcon}
              label="Profile"
              onClick={() => console.log("Profile clicked")}
            />
            <MenuItem
              icon={Settings}
              label="Settings"
              onClick={() => console.log("Settings clicked")}
            />

            <div className="border-t border-gray-100" />

            <MenuItem
              icon={LogOut}
              label="Log out"
              onClick={onLogout}
              variant="danger"
            />
          </div>
        </div>
      )}
    </div>
  );
}
