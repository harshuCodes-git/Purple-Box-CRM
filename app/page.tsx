import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from 'lucide-react';

export default function Home() {
  return (
    <main className="h-screen w-full flex flex-col gap-y-4 items-center justify-cente">
      <p className="text-white">Welcome To Purple Box</p>
      <Link href="/dashboard">
        <Button className="bg-white flex items-center gap-x-2 hover:gap-x-4 transition-all text-primary-dark/90 hover:bg-white/90">
          <span>Continue To Dashboard</span> <LogIn />
        </Button>
      </Link>
    </main>
  );
}
