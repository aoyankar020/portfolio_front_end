import Profile from "@/components/Profile";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { IBlog } from "@/type";

import Image from "next/image";
import { BlogButton } from "./blogButton";

export function BlogCard({ blog }: { blog: IBlog }) {
  return (
    <Card className="w-full max-w-sm h-[auto] border border-gray-300 rounded-lg shadow-md  transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 ">
      <CardContent className="flex flex-col h-full">
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
          <h1 className="text-lg font-semibold">{blog.title}</h1>
          <p className="text-gray-600 text-sm line-clamp-3">{blog.content}</p>
        </div>
      </CardContent>
      <CardFooter className="flex   ">
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
          <BlogButton name="view" blogId={blog.id} />
        </div>
      </CardFooter>
    </Card>
  );
}
