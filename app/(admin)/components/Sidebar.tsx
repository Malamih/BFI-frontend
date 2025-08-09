"use client";
import DashboardLogo from "@/assets/dashboard-logo.svg";
import { Button } from "@/components/ui/button";
import { groups } from "@/lib/data/sidebar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import clsx from "clsx";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import MobileLogo from "@/assets/mobile-logo.svg";

export const Sidebar = () => {
  const [isPending, setIsPending] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const logout = () => {
    setIsPending(true);
    Cookies.remove("token");
    router.push("/auth");
  };

  useEffect(() => {
    if (window.innerWidth < 767) {
      document.body.classList.add("sidebar-collapsed");
    } else {
      document.body.classList.remove("sidebar-collapsed");
    }
    const resize = () => {
      if (window.innerWidth < 767) {
        document.body.classList.add("sidebar-collapsed");
      } else {
        document.body.classList.remove("sidebar-collapsed");
      }
    };

    window.addEventListener("resize", resize);
    return () => {
      document.body.classList.remove("sidebar-collapsed");
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <aside className="fixed top-0 start-0 h-screen flex flex-col w-[var(--sidebar-width)] py-4 border-r border-r-white/20">
      <div className="pb-4 flex justify-center px-2 relative">
        <DashboardLogo className="max-md:hidden" />
        <MobileLogo className="md:hidden" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-l from-transparent via-white to-transparent"></div>
      </div>
      <ul className="groups px-3 mt-6 flex-[1] overflow-auto custom-scroll-area">
        {groups.map((group, i) => {
          return (
            <li key={i}>
              <span className="text-sm text-white/80 inline-block mb-2 max-md:hidden">
                {group.name}
              </span>
              <ul className="flex flex-col gap-2 ms-1">
                {group.links.map((link, i: number) => {
                  return (
                    <li key={i}>
                      <Link
                        href={link.path}
                        className={clsx(
                          "flex items-center max-md:justify-center gap-2 py-2 px-3 rounded-lg text-sm transition duration-150",
                          {
                            "bg-primary": pathname == link.path,
                            "hover:bg-primary/10 ": pathname != link.path,
                          }
                        )}
                      >
                        {link.icon}{" "}
                        <span className="max-md:hidden">{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <Button
        variant={"destructive"}
        className="bg-destructive/60 mx-2"
        onClick={logout}
        disabled={isPending}
      >
        <LogOut />
        <span className="max-md:hidden">Logout</span>
      </Button>
    </aside>
  );
};
