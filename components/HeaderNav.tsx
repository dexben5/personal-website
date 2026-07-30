"use client";

import { usePathname } from "next/navigation";
import HomePage from "./HomePage";
import NavBarButton from "./NavBarButton";
import Image from "next/image";
import { OWNER_NAME } from "@lib/constants";
import { ProjectData } from "@lib/projects";

export default function HeaderNav({
  allProjectsData,
}: {
  allProjectsData: ProjectData[];
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navItems = [
    {
      label: "Projects",
      dropdown: allProjectsData.map(({ slug, title }) => ({
        label: title,
        slug: slug,
      })),
    },
    { label: "About Me", href: "/about" },
  ];

  // tailwind timeout: md:pt-2 on left div
  return (
    <nav className="flex justify-between items-center text-2xl font-bold bg-blue-50/70 md:px-10">
      <div className="flex justify-center items-center m-2">
        <HomePage isHome={isHome}>
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full w-14 h-14 md:w-24 md:h-24"
              height={96}
              width={96}
              alt={OWNER_NAME}
            />
            <h1 className="hidden md:flex items-center font-extrabold text-[2.5rem] leading-[1.2] tracking-[-0.05rem] mb-1.5 ml-3">
              {OWNER_NAME}
            </h1>
          </>
        </HomePage>
      </div>
      <div className="flex justify-end gap-4">
        {navItems.map((item) => (
          <NavBarButton key={item.label} {...item} />
        ))}
      </div>

    </nav>
  );
}
