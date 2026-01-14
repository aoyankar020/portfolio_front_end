import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
export const metadata: Metadata = {
  title: "About Me",
  description: "...",
};
const About = () => {
  return (
    <div className="w-full ">
      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 ">
        {/* Section Title */}
        <div className=" text-2xl font-bold mb-10 text-center">
          <h1 className="relative">
            About me
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

        {/* Card */}
        <div className="bg-white rounded-3xl sm:rounded-none shadow-lg  sm:p-20 lg:p-20">
          <div className="p-10 lg:p-5 grid grid-cols-1 md:grid-cols-2  gap-10 md:gap-20  items-center">
            {/* Left side: Image */}
            <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px]">
              <Image
                src="/profile2.jpeg"
                alt="Profile image"
                fill
                className="object-cover rounded-xl"
                priority
              />

              {/* Social icons overlay */}
              <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 flex gap-4 sm:gap-6">
                <Link
                  href="https://www.facebook.com/aoyan.kar.2025"
                  target="_blank"
                >
                  <BsFacebook
                    className="text-gray-500 hover:text-gray-700 transition-transform duration-300 hover:-translate-y-1"
                    size={24}
                  />
                </Link>
                <Link href="https://github.com/aoyankar020" target="_blank">
                  <FaGithub
                    className="text-gray-500 hover:text-gray-700 transition-transform duration-300 hover:-translate-y-1"
                    size={24}
                  />
                </Link>
                <Link href="https://wa.me/+8801705516339" target="_blank">
                  <FaWhatsapp
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
                  Hi, I’m Aoyan Kar
                </h1>
                <p
                  className="mt-4 text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed"
                  style={{ textAlign: "justify" }}
                >
                  I’m a passionate <b>MERN</b> Stack Developer from Bangladesh.
                  I graduated from Daffodil International University, where I
                  built a strong foundation in software development and web
                  technologies. Currently, I’m focused on backend development,
                  crafting scalable APIs and robust server-side solutions to
                  power modern web applications. I’m always eager to learn new
                  technologies and improve my skills to deliver efficient and
                  innovative software solutions.
                </p>

                {/* Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/projects"
                    className="inline-block rounded border border-[#19687C] bg-[#19687C] px-5 py-3 font-medium text-white shadow-sm transition-all duration-300 ease-in-out hover:bg-[#19687C] hover:-translate-y-0.5 hover:shadow-2xl"
                  >
                    My works
                  </Link>
                  <a
                    href="/AoyanCV.pdf"
                    download="AoyanCV.pdf"
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
