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

  return (
    <nav className="overflow-auto flex flex-wrap justify-center items-center text-2xl font-bold gap-36 bg-blue-50/70">
      <div className="flex justify-center items-center pt-2">
        <HomePage isHome={isHome}>
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className="rounded-full"
              height={96}
              width={96}
              alt={OWNER_NAME}
            />
            <h1 className="font-extrabold text-[2.5rem] leading-[1.2] tracking-[-0.05rem] my-4">
              {OWNER_NAME}
            </h1>
          </>
        </HomePage>
      </div>
      {navItems.map((item) => (
        <NavBarButton key={item.label} {...item} />
      ))}
    </nav>
  );
}
