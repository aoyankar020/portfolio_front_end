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
      <section className="relative mx-auto     ">
        <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 justify-center gap-8  w-full ">
          {/* <div className="bg-red-500">hii</div> */}
          {blogs.map((blog: IBlog) => (
            <DashboardBlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </>
  );
}

export default AllBlogs;
