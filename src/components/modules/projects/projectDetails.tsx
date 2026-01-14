"use client"
import { IProject } from "@/type";
import { ArrowBigLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";



function ProjectDetails({ project }: { project: IProject | null }) {
  const router = useRouter();
  console.log("Project Details:", project);
  if (!project) {
    return (
      <div className="py-20 text-center text-gray-500">Blog not found.</div>
    );
  }
  return (
    <main className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 ">
      <div className="min-h-screen p-20 rounded-3xl shadow-lg bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-2 capitalize text-gray-700 text-center ">
          {project?.title}
        </h1>
        <p className="text-gray-500 text-sm">
           Updated at :   {new Date(project.updatedAt).toLocaleDateString()}
            </p>
        </div>
        <div className="relative w-full aspect-[16/6] rounded-lg bg-amber-200 p-4">
          <Image
            // Use nullish coalescing to ensure src is always a string
            src={
              project.thumbnail && project.thumbnail !== ""
                ? project?.thumbnail
                : "/globe.svg"
            }
            alt="Project img"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4 my-8">
          {/* <Image
               src={"/globe.svg"}
               alt={blog.author.name}
               width={48}
               height={48}
               className="rounded-full"
             /> */}
          <div>
           
          </div>
        </div>
        <article className="prose prose-lg max-w-none">
          <h1 className="text-xl font-semibold mb-6 capitalize text-gray-700 ">
            Description
          </h1>
          <p>{project.description}</p>
        </article>
        <article className="prose prose-lg max-w-none my-6">
          <h1 className="text-xl font-semibold mb-6 capitalize text-gray-700 ">
            Features
          </h1>
          <div className="flex flex-col gap-6">
            {project.features.map((feature, i) => (
              <p
                className=" transition-all duration-300
                  hover:shadow-gray-500/70 
                  hover:-translate-y-0.5
                  hover:scale-3d px-4 py-2 rounded-md bg-gray-100 shadow-lg shadow-gray-100/50 text-gray-800"
                key={i}
              >
                {feature}
              </p>
            ))}
          </div>
        </article>
        <article className="prose prose-lg max-w-none my-6">
          <h1 className="text-xl font-semibold mb-6 capitalize text-gray-700 ">
            Technologies Used
          </h1>
          <div className="inline-grid grid-cols-3 gap-6">
            {project.technologies.map((tec, i) => (
              <p
                className=" transition-all duration-300
                  hover:shadow-gray-500/70 
                  hover:-translate-y-1
                  hover:scale-105 px-4 py-2 rounded-md bg-[#19687C] shadow-lg shadow-[#19687C]/50 text-white"
                key={i}
              >
                {tec}
              </p>
            ))}
          </div>
        </article>

        <article className="prose prose-lg max-w-none">
          <h1 className="text-xl font-semibold mb-6 capitalize text-gray-700 ">
            Links
          </h1>
          <div className="flex gap-6">
            {project.liveSite && (
              <Link
                className="
                  px-5 py-2.5
                  bg-gray-200
                  text-gray-800
                  font-semibold
                  rounded-xl 
                  shadow-lg sadow-[#19687C]/40
                  transition-all duration-300
                  hover:shadow-cyan-500/70 
                  hover:-translate-y-1
                  hover:scale-105
                "
                href={project.liveSite}
              >
                Live Link
              </Link>
            )}

            {project.gitLink && (
              <Link
                className="
                  px-5 py-2.5
                  bg-[#19687C] 
                  text-white 
                  font-semibold
                  rounded-xl 
                  
                  transition-all duration-300
                  hover:shadow-gray-500/70 
                  hover:-translate-y-1
                  hover:scale-105
                "
                href={project.gitLink}
              >
                Repository
              </Link>
            )}
          </div>
        </article>

        <div className="text-center my-10">
        
          <button
      onClick={() => router.back()}
      className=" cursor-pointer p-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
    >
      <ArrowBigLeft />
    </button>
        </div>
      </div>

     
    </main>
  );
}

export default ProjectDetails;
