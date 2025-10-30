import UpdateProjectForm from "@/components/modules/projects/updateProject";
import { IProject } from "@/type";

async function DashboardSingleProject({ params }: { params: { id: string } }) {
  const { id } = params;
  const serverData = await fetch(
    `${process.env.NEXT_PUBLIC_BaseURL}/project/${id}`,
    {
      cache: "no-store",
    }
  );

  const jsonData = await serverData.json();
  const project = await jsonData?.data?.data;
  console.log("Project Data: Dashboard :", project);
  return (
    <>
      <section className=" mx-auto shadow-2xl p-10 rounded-2xl   w-1/2">
        <div className="text-center  pb-10">
          <h1 className="text-xl uppercase font-semibold">{project?.title} </h1>
        </div>
        <div className="px-10 ">
          {/* <BlogForm /> */}
          <UpdateProjectForm key={project.id} project={project} />
        </div>
      </section>
    </>
  );
}

export default DashboardSingleProject;
