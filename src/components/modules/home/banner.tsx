import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

function Banner() {
  return (
    <>
      <section className="w-full py-20 ">
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-center  ">
          {/* Left side - Text content */}
          <div className="max-w-prose text-center  md:text-left lg:text-left">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Hello, I am
              <strong className="text-indigo-600"> Aoyan </strong>
            </h1>

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              I am a Freelance UI/UX Designer and Developer based in London,
              England. I strive to build immersive and beautiful web
              applications through carefully crafted code and user-centric
              design.
            </p>

            <div className="mt-4 flex justify-center md:justify-center lg:justify-start gap-4 sm:mt-6">
              <a
                href="#"
                className="inline-block rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
              >
                Get Started
              </a>

              <a
                href="#"
                className="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
              >
                Learn More
              </a>
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
                    src="/profile.jpg"
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
