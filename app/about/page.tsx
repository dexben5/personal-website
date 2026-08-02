"use client";

import { IconContext } from "react-icons";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import Link from "next/link";

export default function About() {
  return <Links />;
}

function Links() {
  const socialLinks = [
    { name: "GitHub", href: "https://github.com/dexben5", icon: BsGithub },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/dexter-benson",
      icon: BsLinkedin,
    },
  ];

  return (
    <div className="flex flex-col gap-2 w-fit p-4 bg-gray-300 rounded-2xl">
      <h1>Links</h1>
      <IconContext.Provider value={{ size: "36" }}>
        <div>
          <ul className="flex space-x-2">
            {socialLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                className="h-fit w-fit p-2 rounded-lg bg-blue-300"
              >
                <Icon />
              </Link>
            ))}
          </ul>
        </div>
      </IconContext.Provider>
    </div>
  );
}
