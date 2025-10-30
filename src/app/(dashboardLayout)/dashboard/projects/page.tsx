import { DashboardProjectCard } from "@/components/modules/projects/dashboardProjectCard";
import { ProjectCard } from "@/components/modules/projects/ProjectCard";
import { IProject } from "@/type";

async function Projects() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/project`);
  const responseParse = await response.json();
  const projects = responseParse?.data?.data;
  console.log("All Blogs From Dashboard:", projects);
  return (
    <>
      {/* all Blogs */}
      <section className="mx-auto max-w-9/12">
        <div className="text-center  pb-10">
          <h1 className="text-xl uppercase font-semibold">All Projects</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {projects.map((project: IProject) => (
            <DashboardProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Projects;
