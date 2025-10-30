import Banner from "@/components/modules/home/banner";

// import Blogs from "./blogs/page";
import About from "./about/page";
import HomeBlogs from "@/components/modules/home/homeBlog";
import HomeProjects from "@/components/modules/home/homeProjects";

export default function Home() {
  return (
    <div className="">
      <div className="  relative max-w-screen  [background:linear-gradient(90deg,rgba(255,255,255,1)_68%,rgba(221,238,247,1)_100%)] bg-no-repeat bg-top-right">
        <div className=" mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8  ">
          <Banner />
          <HomeBlogs />
        </div>
      </div>

      <div className="relative max-w-screen">
        <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 ">
          <About />
          <HomeProjects />
        </div>
      </div>
    </div>
  );
}
