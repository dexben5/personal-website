import type {Metadata} from "next";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";
import HeaderNav from "@components/HeaderNav";
import BackToHome from "@components/BackToHome";
import MazeDriver from "@components/MazeDriver";
import { getSortedProjectsData } from "@lib/projects";
import "@styles/global.css";
import React from "react";

const siteTitle = "Dexter Benson's Website";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: `%s | ${siteTitle}`,
  },
  description:
    "Welcome to Dexter Benson's website, a home for my journey as a software engineer",
};
const allProjectsData = await getSortedProjectsData();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body>
          <header className="top-0 left-0 w-full z-40">
            <HeaderNav allProjectsData={allProjectsData} />
          </header>
          <div className="lg:max-w-2/5 sm:max-w-full mx-auto mt-12 mb-24 px-4">
            <main>{children}</main>
            <BackToHome />
          </div>
          <MazeDriver/>
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </>
  );
}
