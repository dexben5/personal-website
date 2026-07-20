import Link from "next/link";
import { useState } from "react";

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
  "bg-blue-300 rounded-2xl px-5 py-2 hover:rounded-4xl opacity-70 hover:opacity-100 transition-all shadow-2xl justify-center items-center";

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
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropDown = () => setIsOpen(!isOpen);
  return (
    <div className="relative">
      <button onClick={toggleDropDown} className={buttonStyles}>
        {label}
      </button>
      {isOpen && (
        <div>
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/projects/${item.slug}`}
              className={buttonStyles}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
