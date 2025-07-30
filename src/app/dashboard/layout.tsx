"use client";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between">
        <div>
          <div className="p-6 font-bold text-lg">Make Do</div>
          <nav className="px-6 flex flex-col gap-2">
            <a href="#" className="block py-2 font-medium">Tasks</a>
          </nav>
        </div>
        <div className="p-6 text-sm flex flex-col gap-2">
          <span>Anna Frank</span>
          <button onClick={handleSignOut} className="text-red-600 font-bold underline">Sign Out</button>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
} 