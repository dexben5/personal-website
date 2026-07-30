import {getSortedPostsData} from "@lib/posts";
import Link from "next/link";
import DateFormat from "@components/DateFormat";

export default async function Page() {
  const allPostsData = await getSortedPostsData();

  return (
    <>
      <section className="text-[1.2rem] leading-normal space-y-4">
        <p>
          My name is Dexter. I'm currently an undergraduate student at the University of Wisconsin–Madison studying
          Computer Sciences and Mathematics. I like to ski, lift weights, and I'm working to become a full-stack
          developer.
        </p>
        <p>
          This website is a showcase for my software engineering work as I progress through college and gain
          professional experience. You can expect to find work in areas such as web development with Next.js and React,
          applications created in Java, all created with industry-standard tooling.
        </p>
      </section>
      <section className="text-[1.2rem] leading-normal pt-px">
        <h2 className="text-2xl font-extrabold leading-[1.4] my-4">Blog</h2>
        <ul>
          {allPostsData.map(({id, date, title}) => (
            <li className="pb-5" key={id}>
              <Link className="text-blue-600" href={`/posts/${id}`}>
                {title}
              </Link> <br /> <small className="text-stone-500"> <DateFormat dateString={date} /> </small>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
