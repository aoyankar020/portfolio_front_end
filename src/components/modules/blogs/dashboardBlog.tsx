import Profile from "@/components/Profile";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IBlog } from "@/type";

import Image from "next/image";

import Link from "next/link";
import { Eye } from "lucide-react";
import { DeleteBlogAlert } from "./deleteBlog";

export function DashboardBlogCard({ blog }: { blog: IBlog }) {
  console.log("Blog Page:", blog);
  return (
    <Card className=" relative w-full  h-[auto] border border-gray-300 rounded-lg shadow-md  transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 ">
      <CardContent className="flex flex-col h-full ">
        {/* Image Section */}
        <div className="relative w-full aspect-[16/9]">
          <Image
            // Use nullish coalescing to ensure src is always a string
            src={
              blog.coverImage && blog.coverImage !== ""
                ? blog?.coverImage
                : "/globe.svg"
            }
            alt="Blog img"
            fill
            className="object-contain rounded-t-lg"
          />
        </div>

        {/* Text Section */}
        <div className="flex flex-col   flex-grow py-4">
          <h1 className=" text-lg  md:text-lg lg:text-xl xl:text-3xl font-semibold">
            {blog.title}
          </h1>
          <p className="text-gray-600 text-sm line-clamp-3">{blog.content}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col  ">
        <div className="flex w-full justify-between items-center">
          <div className="flex items-center justify-start gap-2">
            <Profile />
            <div>
              <h1 className="capitalize">{blog.author.name}</h1>
              <p className="text-sm text-gray-500">
                {new Date(blog.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="ml-auto">
            <div className=" flex items-end  gap-4 ">
              <Link href={`/dashboard/blogs/${blog.id}`}>
                <button className="  cursor-pointer text-white rounded">
                  <Eye className="text-gray-600" />
                </button>
              </Link>
              <DeleteBlogAlert id={blog.id} />
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
