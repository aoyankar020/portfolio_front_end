import { IBlog } from "@/type";
import { BlogCard } from "../blogs/blogCard";
import Image from "next/image";

async function HomeBlogs() {
  const blogs = await fetch("https://portfolio-server-gamma-nine.vercel.app/api/portfolio/v1/blog", {
    next: { revalidate: 30 },
  });
  const jsonData = await blogs.json();
  const blogData = (jsonData?.data?.data ?? []).slice(0, 3);
  // const blogData = await jsonData?.data?.data.slice(0, 3);
  console.log("Blog Data", blogData);
  return (
    <>
      <div className="w-full py-20">
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
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 ">
          {blogData?.map((blog: IBlog) => (
            <BlogCard key={blog.id} blog={blog} />
          )) || <p>No blogs available.</p>}
        </div>
      </div>
    </>
  );
}

export default HomeBlogs;
