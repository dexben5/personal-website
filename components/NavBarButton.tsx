"use client";

import Link from "next/link";
import {useState, useRef, useEffect} from "react";

type DropdownItem = {
  label: string;
  slug: string;
};
type NavItem = {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
};

type NavBarButtonProps = NavItem & {
  className?: string;
};

// Base button styles without the hover: modifiers
const baseButtonStyles =
  "bg-blue-300 lg:px-5 md:px-3 sm:px-2 px-1 rounded-2xl py-1 transition-all shadow-2xl";

// Styles for standard standalone navbar buttons
const standardButtonStyles =
  `${baseButtonStyles} opacity-70 hover:opacity-100 hover:rounded-4xl active:opacity-100 active:rounded-4xl`;

export default function NavBarButton({
  label,
  href,
  dropdown,
}: NavBarButtonProps) {
  if (dropdown) {
    return (
      <DropDownNavButton label={label} items={dropdown}></DropDownNavButton>
    );
  }

  if (!href) return null;
  return (
    <Link href={href}>
      <div className={standardButtonStyles}>{label}</div>
    </Link>
  );
}

function DropDownNavButton({
  label,
  items,
}: {
  label: string;
  items: DropdownItem[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div ref={containerRef} className="relative inline-block" onMouseEnter={() => setIsOpen(true)}
         onMouseLeave={() => setIsOpen(false)}>
      <button type="button" onClick={handleToggle} className={`${baseButtonStyles} ${isOpen ? "opacity-100" +
        " rounded-4xl" : "opacity-70 rounded-2xl hover:opacity-100 hover:rounded-4xl"}`}>
        {label}
      </button>

      <div
        className={`absolute left-0 top-full pt-2 transition-all duration-200 ease-out origin-top-left ${isOpen ? "visible opacity-100 scale-100 translate-y-0 pointer-events-auto" : "invisible opacity-0 scale-95 -translate-y-2 pointer-events-none"}`}
      >
        <div
          className="flex flex-col bg-blue-300 rounded-xl p-2 shadow-2xl space-y-1 w-full">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              className="px-4 py-2 rounded-lg hover:bg-blue-400 active:bg-blue-400 transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
