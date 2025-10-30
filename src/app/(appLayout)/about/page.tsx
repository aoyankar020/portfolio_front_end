import Image from "next/image";
import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-2xl font-bold mb-10 text-center">
          <h1>About me</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-10 lg:p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            {/* Left side: Image */}
            <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px]">
              <Image
                src="/profile.jpg"
                alt="Profile image"
                fill
                className="object-cover rounded-xl"
                priority
              />

              {/* Social icons overlay */}
              <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 flex gap-4 sm:gap-6">
                <Link href="#" target="_blank">
                  <BsFacebook
                    className="text-gray-500 hover:text-gray-700 transition-transform duration-300 hover:-translate-y-1"
                    size={24}
                  />
                </Link>
                <Link href="#" target="_blank">
                  <FaGithub
                    className="text-gray-500 hover:text-gray-700 transition-transform duration-300 hover:-translate-y-1"
                    size={24}
                  />
                </Link>
                <Link href="#" target="_blank">
                  <BsFacebook
                    className="text-gray-500 hover:text-gray-700 transition-transform duration-300 hover:-translate-y-1"
                    size={24}
                  />
                </Link>
              </div>
            </div>

            {/* Right side: Text */}
            <div className="flex flex-col justify-center">
              <div className="max-w-prose text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">
                  Hi, I'm John Doe
                </h1>
                <p
                  className="mt-4 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed"
                  style={{ textAlign: "justify" }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <a
                    href="#"
                    className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    My works
                  </a>
                  <a
                    href="#"
                    className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-all duration-300 ease-in-out hover:bg-gray-50 hover:text-gray-900 hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    Download CV
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
