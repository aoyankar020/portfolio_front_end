import { ProjectCard } from "@/components/modules/projects/ProjectCard";
import { IProject } from "@/type";

async function Projects() {
  const serverData = await fetch(
    "http://localhost:5000/api/portfolio/v1/project",
    {
      cache: "no-store",
    }
  );

  const jsonData = await serverData.json();
  const projectsData = await jsonData?.data?.data;
  console.log("Blogs", projectsData);
  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8  ">
      <div className="text-2xl font-bold mb-10 text-center">
        <h1>All Projects</h1>
      </div>
      <div className="grid grid-cols-3  mb-8 justify-between  gap-8">
        {projectsData?.map((project: IProject) => (
          <ProjectCard key={project.id} project={project} />
        )) || <p>No Projects available.</p>}
      </div>
    </div>
  );
}
export default Projects;
