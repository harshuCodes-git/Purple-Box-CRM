"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getSupabaseFrontendClient } from "@/lib/supabase/client";
import { EllipsisVertical, LockIcon, LogOutIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileContextButton() {
  const supabase = getSupabaseFrontendClient();
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut({ scope: "local" });
    router.push("/login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="text-white hover:bg-transparent w-fit focus:border-none focus:outline-none active:border-none active:outline-none hover:text-primary-purple"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-primary-dark border-primary-purple text-white">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary-purple" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="group-hover:bg-black"
            onClick={() => router.push("/dashboard/profile")}
          >
            <UserIcon />
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator className="bg-primary-purple" />
        <DropdownMenuItem onClick={logout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
