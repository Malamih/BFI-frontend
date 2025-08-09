"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
}

interface LenisContext {
  lenis: Lenis;
  generateLenis: () => void;
}

export const LenisContext = createContext<LenisContext | undefined>(undefined);

export default function SmoothScrolling({ children }: Props) {
  const lenisRef = useRef<Lenis>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);

  const generateLenis = () => {
    let newLenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      wheelMultiplier: 1,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      newLenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    setLenis(newLenis);
  };

  useEffect(() => {
    generateLenis();
    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  console.log("refreshed...");

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        {lenis && (
          <LenisContext.Provider
            value={{ lenis: lenis || undefined, generateLenis }}
          >
            {children}
          </LenisContext.Provider>
        )}
      </div>
    </div>
  );
}

export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) throw new Error("useLenis must be used within ThemeProvider");
  return context;
};
