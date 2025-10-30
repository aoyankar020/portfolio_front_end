import ProfileTabs from "@/components/comp-434";
import { ProfileAvatar } from "@/components/modules/profile/ProfileAvater";
import { authOptions } from "@/helpers/authOptions";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

async function Profile() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!session) {
    return (
      <section className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 font-medium">
          You must be signed in to view your profile.
        </p>
      </section>
    );
  }
  return (
    <section className="relative mx-auto shadow-2xl rounded-xl p-6 w-full min-h-screen">
      <div className="relative max-w-full min-h-40 rounded-xl bg-gradient-to-r from-blue-500  to-cyan-500 flex items-center justify-center">
        <h1 className="text-xl uppercase font-semibold text-white">
          Welcome ! {user?.name}
        </h1>

        {/* Avatar centered vertically on the left side */}

        <div className="absolute top-full -translate-y-1/2  ">
          <ProfileAvatar />
        </div>
      </div>

      <div className="my-16 flex flex-col  items-center">
        <div className="text-center w-1/4 flex flex-col gap-2">
          <h1 className="font-bold text-xl">{user?.name}</h1>
          <span className="text-gray-500 font-normal">{user?.email}</span>
        </div>
        <section className="mt-5 w-full text-center">
          <ProfileTabs />
        </section>
      </div>
    </section>
  );
}

export default Profile;
