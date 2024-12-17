"use client";

import { cn } from "@/lib/utils";
// import { ChevronsRight } from 'lucide-react';
import PurpleLogo from "@/assets/Purple-Box Rebrand.png";
import Image from "next/image";
import { getSupabaseFrontendClient } from "@/lib/supabase/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { DashboardIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const Sidebar = () => {
  const supabase = getSupabaseFrontendClient();
  const router = useRouter();

  const sidebarItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: DashboardIcon,
    },
  ];

  const logout = async () => {
    await supabase.auth.signOut({ scope: "local" });
    router.push("/login");
  };
  return (
    <div
      className={cn(
        "hidden absolute w-[320px] left-0 h-screen bg-primary-dark transition-all duration-500 z-20 lg:flex flex-col p-4 translate-x-[0] border-r-2 border-primary-purple/100"
      )}
    >
      {/* Header */}
      <div className="flex items-center w-full justify-between">
        <div className="pl-2 justify-between flex items-center gap-x-4">
          <Image src={PurpleLogo} alt="Purple Box Logo" className="w-8 h-8" />
          <p className="font-gotham text-white text-[18px]">Purple Box</p>
        </div>
        {/* <div className="hover:bg-white/10 transition-all p-2 rounded-full flex justify-between items-center">
          <ChevronsRight className='text-white transition-all duration-500 cursor-pointer' />
        </div> */}
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-y-4 px-5 py-8">
          {sidebarItems.map((item) => (
            <Link
              key={item.name}
              className="text-white  font-gotham flex items-center gap-2 text-lg"
              href={item.href}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </div>
        <Button className="justify-self-end" onClick={logout}>
          <LogOut />
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
