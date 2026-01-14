import Profile from "@/components/Profile";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IProject } from "@/type";
import Image from "next/image";
import { ProjectDetailsButton } from "./DetailsButton";

export function ProjectCard({ project }: { project: IProject }) {
  return (
    <Card className=" px-6 py-4 flex flex-col h-full border border-gray-300 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative w-full aspect-[16/9]">
        <Image
          // Use nullish coalescing to ensure src is always a string
          src={
            project.thumbnail && project.thumbnail !== ""
              ? project?.thumbnail
              : "/globe.svg"
          }
          alt="Project Thumbnail"
          fill
          className="object-contain rounded-t-lg"
        />
      </div>

      {/* Text Section */}
      <CardContent className="flex-1 flex flex-col py-4">
        <h1 className="text-lg font-semibold">{project.title}</h1>
        <p className="text-gray-600 text-sm line-clamp-3">
          {project.description}
        </p>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="mt-auto grid grid-cols-2 sm:grid-row sm:items-center sm:justify-between gap-x-20">
        <div className="flex items-center gap-2">
          <Profile />
          <div>
            <h1 className="capitalize text-sm font-medium">
              {project.owner?.name}
            </h1>
            <p className="text-xs text-gray-500">
              {new Date(project.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <ProjectDetailsButton name="View" projectId={project.id} />
      </CardFooter>
    </Card>
  );
}
