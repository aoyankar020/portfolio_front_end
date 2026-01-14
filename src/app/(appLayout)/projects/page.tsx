import { ProjectCard } from "@/components/modules/projects/ProjectCard";
import { IProject } from "@/type";
import { Metadata } from "next";
import Image from "next/image";
export const metadata: Metadata = {
  title: "Projects",
  description: "All Projects",
};
async function Projects() {
  const serverData = await fetch(
    "https://portfolio-server-gamma-nine.vercel.app/api/portfolio/v1/project",
    {
      cache: "no-store",
    }
  );

  const jsonData = await serverData.json();
  const projectsData = await jsonData?.data?.data;
  console.log("Blogs", projectsData);
  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-16 py-6 sm:px-6 lg:px-8  ">
      <div className="text-2xl font-bold mb-10 text-center">
        <h1 className="relative">
          All Projects
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
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  mb-8 justify-between  gap-8">
        {projectsData?.map((project: IProject) => (
          <ProjectCard key={project.id} project={project} />
        )) || <p>No Projects available.</p>}
      </div>
    </div>
  );
}
export default Projects;
