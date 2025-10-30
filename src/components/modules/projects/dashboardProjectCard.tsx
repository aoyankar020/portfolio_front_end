import Profile from "@/components/Profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IProject } from "@/type";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DeleteProjectAlert } from "./deleteProjectAlert";

export function DashboardProjectCard({ project }: { project: IProject }) {
  console.log("All Projects:", project);
  return (
    <Card className="flex flex-col h-full border border-gray-300 rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2">
      {/* Image Section */}
      <div className="relative w-full h-48">
        <Image
          src="/globe.svg"
          alt="Blog img"
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
      <CardFooter className="mt-auto grid  grid-cols-2 sm:grid-row sm:items-center sm:justify-between w-full">
        <div className="flex items-center gap-2">
          <Profile />
          <div>
            <h1 className="capitalize text-sm font-medium">
              {project?.owner?.name}
            </h1>
            <p className="text-xs text-gray-500">
              {new Date(project.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className=" flex items-end ml-auto gap-x-2">
          <Link href={`/dashboard/projects/${project.id}`}>
            <button className="  cursor-pointer text-white rounded">
              <Eye className="text-gray-600" />
            </button>
          </Link>
          <DeleteProjectAlert id={project.id} />
        </div>
      </CardFooter>
    </Card>
  );
}
