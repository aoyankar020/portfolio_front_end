import { IBlog } from "@/type";

import Image from "next/image";

function BlogDetails({ blog }: { blog: IBlog | null }) {
  if (!blog) {
    return (
      <div className="py-20 text-center text-gray-500">Blog not found.</div>
    );
  }

  return (
    <main className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 ">
      <div className="max-h-screen p-20 rounded-3xl shadow-lg bg-white">
        <h1 className="text-4xl font-semibold mb-6 capitalize text-gray-700 text-center ">
          {blog?.title}
        </h1>
        <div className="relative w-full aspect-[16/6] rounded-lg bg-amber-200 p-4">
          <Image
            // Use nullish coalescing to ensure src is always a string
            src={
              blog.coverImage && blog.coverImage !== ""
                ? blog?.coverImage
                : "/globe.svg"
            }
            alt="Blog img"
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4 my-8">
          <Image
            src={"/globe.svg"}
            alt={blog.author.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold">
              {blog.author.name}{" "}
              {blog.author.email && (
                <span className="inline-block ml-1 text-blue-500">✔</span>
              )}
            </p>
            <p className="text-gray-500 text-sm">
              {new Date(blog.createdAt).toLocaleDateString()} • views
            </p>
          </div>
        </div>
        <article className="prose prose-lg max-w-none">
          <p>{blog.content}</p>
        </article>
      </div>

      {/* {blog.thumbnail && (
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="rounded-lg object-cover shadow-md"
          />
        </div>
      )} */}
    </main>
  );
}

export default BlogDetails;
