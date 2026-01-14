import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

function Banner() {
  return (
    <>
      <section className="w-full py-20 ">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-center  ">
          {/* Left side - Text content */}
          <div className="max-w-prose text-center  md:text-left lg:text-left">
            <h1 className=" heading  font-bold text-gray-900     text-4xl sm:text-5xl md:text-6xl leading-tight">
              Hello, I am
              <strong className="text-[#19687C]"> Aoyan </strong>
            </h1>

            <p className="mt-4 text-lg md:text-xl   text-gray-600 sm:text-lg/relaxed  text-left ">
              I am a MERN Stack Developer. I specialize in building scalable and
              efficient web applications. I strive to create seamless digital
              experiences through clean code, modern technologies, and
              user-focused design.
            </p>

            <div className="mt-4 flex justify-center md:justify-center lg:justify-start gap-4 sm:mt-6">
              {/* <a
                href="#"
                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                Get Started
              </a> */}

              <Link
                href="/about"
                className="inline-block rounded border border-[#19687C] bg-[#19687C] px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#19687C]"
              >
                Contact Me
              </Link>
              {/* <Link
                href="/contact"
                className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                Contact Me
              </Link> */}
            </div>
          </div>

          {/* Right side - Image */}

          <div className="relative h-80 sm:h-96 sm:w-full md:h-[600px] flex items-center md:items-center lg:items-center justify-center md:justify-end lg:justify-end ">
            <Card
              className="relative w-9/12 md:w-full lg:w-full h-full rounded-2xl shadow-lg 
          transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 p-0"
            >
              <CardContent className="relative w-full h-full p-[40px]">
                <div className="relative w-full h-full">
                  <Image
                    src="/profile2.jpeg"
                    alt="Profile image"
                    fill
                    className="object-cover rounded-xl"
                    priority
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
