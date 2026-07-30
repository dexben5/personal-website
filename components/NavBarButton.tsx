import Link from "next/link";
import {useState} from "react";

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

const buttonStyles =
  "bg-blue-300 lg:px-5 md:px-3 sm:px-2 px-1 rounded-2xl py-1 hover:rounded-4xl opacity-70" +
  " hover:opacity-100 transition-all shadow-2xl";

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
      <div className={buttonStyles}>{label}</div>
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

  return (
    <div className="relative inline-block group">
      <button className={buttonStyles}>
        {label}
      </button>

      <div
        className="absolute left-0 top-full pt-2
                   invisible opacity-0 scale-95 -translate-y-2 pointer-events-none
                   transition-all duration-200 ease-out origin-top-left
                   group-hover:visible group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto"
      >
        <div
          className="flex flex-col bg-blue-300 rounded-xl p-2 shadow-2xl space-y-1 w-full">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              className="px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
