import Image from "next/image";
import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
const About = () => {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 ">
        <div className="text-2xl font-bold mb-10 text-center">
          <h1>About me</h1>
        </div>

        <div className="max-h-screen p-20 rounded-3xl shadow-lg bg-white">
          <div className="grid grid-cols-2 gap-20 h-full">
            {/* Left side */}
            <div className="flex flex-col justify-center">
              <div className="relative w-full h-[600px]">
                <Image
                  src="/profile.jpg"
                  alt="Profile image"
                  fill
                  className="object-cover rounded-xl"
                  priority
                />
                <div className="absolute inset-x-0 w-1/2 mx-auto bg-white rounded-xl shadow-lg p-6 flex justify-center items-center gap-4 -bottom-8">
                  <Link href={"#"} target="_blank">
                    <BsFacebook
                      size={24}
                      className="text-gray-500 hover:text-gray-700  transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-0.5 p-0"
                    />
                  </Link>

                  <Link href={"#"} target="_blank">
                    <FaGithub
                      size={24}
                      className="text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-0.5 p-0"
                    />
                  </Link>

                  <Link href={"#"} target="_blank">
                    <BsFacebook
                      size={24}
                      className="text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-0.5 p-0"
                    />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col justify-center">
              <div className="max-w-prose text-left">
                <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                  {"Hi, I'm John Doe"}
                </h1>
                <p
                  className="mt-4 text-base text-gray-700 sm:text-lg/relaxed"
                  style={{ textAlign: "justify" }}
                >
                  {
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                  }
                </p>

                <div className="mt-4 flex gap-4 sm:mt-6">
                  <a
                    href="#"
                    className="transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-0.5 p-0 inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm  hover:bg-indigo-700"
                  >
                    {"My works"}
                  </a>

                  <a
                    href="#"
                    className=" transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-0.5 p-0 inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm  hover:bg-gray-50 hover:text-gray-900"
                  >
                    {"Download CV"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
