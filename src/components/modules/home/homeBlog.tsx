import { IBlog } from "@/type";
import { BlogCard } from "../blogs/blogCard";

async function HomeBlogs() {
  const blogs = await fetch("http://localhost:5000/api/portfolio/v1/blog", {
    next: { revalidate: 30 },
  });
  const jsonData = await blogs.json();
  const blogData = await jsonData?.data?.data.slice(0, 3);
  console.log("Blog Data", blogData);
  return (
    <>
      <div className="w-full py-20">
        <div className="text-2xl font-bold mb-10 text-center">
          <h1 className="uppercase">My Blogs</h1>
        </div>
        <div className="grid grid-cols-3 gap-8 ">
          {blogData?.map((blog: IBlog) => (
            <BlogCard key={blog.id} blog={blog} />
          )) || <p>No blogs available.</p>}
        </div>
      </div>
    </>
  );
}

export default HomeBlogs;
