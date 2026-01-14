import { IProject } from "@/type";

import { ProjectCard } from "../projects/ProjectCard";
import Image from "next/image";

async function HomeProjects() {
  const blogs = await fetch("https://portfolio-server-gamma-nine.vercel.app/api/portfolio/v1/project", {
    next: { revalidate: 30 },
  });
  const jsonData = await blogs.json();
  // ⚡ SAFE: ensure projectData is always an array
  const projectData = (jsonData?.data?.data ?? []).slice(0, 3);
  // const projectData = await jsonData?.data?.data.slice(0, 3);

  return (
    <>
      <div className="w-full py-20">
        <div className="text-2xl font-bold mb-10 text-center">
          <h1 className="relative">
            My Projects
            <Image
              src="/marker2.png"
              alt="Profile image"
              width={100}
              height={30}
              className=" absolute left-1/2 -top-1/2 object-cover rounded-xl"
              priority
            />
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 ">
          {projectData?.map((project: IProject) => (
            <ProjectCard key={project.id} project={project} />
          )) || <p>No Projects available.</p>}
        </div>
      </div>
    </>
  );
}

export default HomeProjects;
