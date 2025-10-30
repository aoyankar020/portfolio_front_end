import { IProject } from "@/type";

import { ProjectCard } from "../projects/ProjectCard";

async function HomeProjects() {
  const blogs = await fetch("http://localhost:5000/api/portfolio/v1/project", {
    next: { revalidate: 30 },
  });
  const jsonData = await blogs.json();
  const projectData = await jsonData?.data?.data.slice(0, 3);

  return (
    <>
      <div className="w-full py-20">
        <div className="text-2xl font-bold mb-10 text-center">
          <h1 className="uppercase">My Projects</h1>
        </div>
        <div className="grid grid-cols-3 gap-8 ">
          {projectData?.map((project: IProject) => (
            <ProjectCard key={project.id} project={project} />
          )) || <p>No Projects available.</p>}
        </div>
      </div>
    </>
  );
}

export default HomeProjects;
