import UpdateProjectForm from "@/components/modules/projects/updateProject";
import { IProject } from "@/type";
import Image from "next/image";

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
        <div className="text-center ">
          <h1 className="text-xl uppercase font-semibold">{project?.title} </h1>
        </div>
        <div className="relative w-full aspect-[16/9] rounded-xl">
          <Image
            // Use nullish coalescing to ensure src is always a string
            src={
              project.thumbnail && project.thumbnail !== ""
                ? project?.thumbnail
                : "/globe.svg"
            }
            alt="Blog img"
            fill
            className="object-contain rounded-xl"
          />
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
