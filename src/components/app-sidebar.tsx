"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
 
  GalleryVerticalEnd,
  GraduationCap,
  
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    
  ],
  navMain: [
    {
      title: "Personal Details",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Profile",
          url: "/dashboard/profile",
        },
        {
          title: "Update Profile",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Blog",
      url: "",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Add Blog",
          url: "/dashboard/blogs/create_blog",
        },
        {
          title: "All Blogs",
          url: "/dashboard/blogs",
        },
      ],
    },
    {
      title: "Education",
      url: "#",
      icon: GraduationCap,
      isActive: true,
      items: [
        {
          title: "Documents",
          url: "#",
        },
        {
          title: "Certificates",
          url: "#",
        },
      ],
    },
    {
      title: "Projects",
      url: "",
      isActive: true,
      icon: Bot,
      items: [
        {
          title: "Add Project",
          url: "/dashboard/projects/create_project",
        },
        {
          title: "All Projects",
          url: "/dashboard/projects",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,

      items: [
        {
          title: "General",
          url: "#",
        },
      
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const session = useSession();
  console.log("Session :",session)
  const userData = session?.data?.user;
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={
            userData
              ? {
                  name: userData.name ?? "",
                  email: userData.email ?? "",
                  image: userData.image ?? "",
                }
              : { name: "", email: "", image: "" }
          }
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
