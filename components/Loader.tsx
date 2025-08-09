import clsx from "clsx";
import LogoIconOnly from "@/assets/logo-icon-only.svg";
import { Loader2 } from "lucide-react";

export const Loader = ({ hide }: { hide: boolean }) => {
  return (
    <div
      className={clsx(
        "loader flex flex-col items-center gap-8 justify-center bg-primary fixed top-0 left-0 w-full h-full z-[9999] transition-all duration-500",
        {
          "opacity-0 pointer-events-none scale-95": hide,
          "opacity-100 pointer-events-auto scale-100": !hide,
        }
      )}
    >
      {/* Logo with subtle pulse effect */}
      <div className="animate-pulse">
        <LogoIconOnly className="text-white drop-shadow-lg" />
      </div>

      {/* Faster spinning loader with glowing effect */}
      <Loader2 className="size-12 text-white animate-spin-fast drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
    </div>
  );
};
