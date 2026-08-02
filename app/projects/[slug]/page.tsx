import parse from "html-react-parser";
import { getAllProjectIds, getProjectData } from "@lib/projects";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectData = await getProjectData(slug);
  return {
    title: projectData.title,
    description: projectData.title + " posted on " + projectData.date,
  };
}

// Dynamic segments not included in generateStaticParams() will return a 404
export const dynamicParams = false;

export async function generateStaticParams() {
  // return a list of possible values for id
  const projects = getAllProjectIds();
  return projects;
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projectData = await getProjectData(slug);

  return (
    <>
      <article className="prose">
        <h1 className="text-[2rem] font-extrabold leading-[1.3] tracking-[-0.05rem] my-4">
          {projectData.title}
        </h1>
        <div>{parse(projectData.contentHtml)}</div>
      </article>
      <Link
        href={projectData.repoLink}
        target="_blank"
        className="px-3 py-2 bg-blue-200 hover:bg-blue-300 transition-all rounded-md"
      >
        View on GitHub
      </Link>
    </>
  );
}
