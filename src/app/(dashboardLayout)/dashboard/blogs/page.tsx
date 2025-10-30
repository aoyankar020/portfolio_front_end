import { BlogCard } from "@/components/modules/blogs/blogCard";
import { DashboardBlogCard } from "@/components/modules/blogs/dashboardBlog";
import { IBlog } from "@/type";

async function AllBlogs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BaseURL}/blog`);
  const responseParse = await response.json();
  const blogs = responseParse?.data?.data;
  console.log(" All Blogs:", blogs);

  return (
    <>
      {/* all Blogs */}
      <section className=" mx-auto    w-9/12 ">
        <div className=" grid grid-cols-3 justify-center gap-8 w-full max-w-full">
          {blogs.map((blog: IBlog) => (
            <DashboardBlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </>
  );
}

export default AllBlogs;
