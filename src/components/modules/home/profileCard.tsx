import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function ProfileCard() {
  return (
    <Card
      className="relative w-9/12 h-full rounded-2xl shadow-lg 
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
  );
}
