import { BlogCard } from "@/components/modules/blogs/blogCard";
import { IBlog } from "@/type";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "All Blogs",
  description: "...",
};

async function Blogs() {
  const serverData = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/blog`, {
    cache: "no-store",
  });

  const jsonData = await serverData.json();
  const blogs = await jsonData?.data?.data;
  console.log("A:: Blogs:",blogs)

  return (
    <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8  ">
      <div className="text-2xl font-bold mb-10 text-center">
        <h1 className="relative">
          All Blogs
          <Image
            src="/marker2.png"
            alt="Profile image"
            width={100}
            height={30}
            className=" absolute left-1/2 -top-1/2 object-cover rounded-xl"
            priority
          />
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  mb-8 justify-between  gap-y-4">
        {blogs?.map((blog: IBlog) => (
          <BlogCard key={blog.id} blog={blog} />
        )) || <p>No blogs available.</p>}
      </div>
    </div>
  );
}
export default Blogs;
