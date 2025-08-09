"use client";
import Logo from "@/assets/logo.svg";
import Container from "./Container";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { links } from "@/lib/data";
import { useState } from "react";

export const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <header
        className="bg-white py-5 w-full sticky top-0 left-0 flex items-center justify-center z-20"
        style={{ height: "var(--header-height)" }}
      >
        <Container className="flex justify-between items-center">
          <div className="logo">
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <ul className="links items-center gap-4 xl:gap-6 justify-between hidden lg:flex">
            {links?.map((link, i: number) => {
              return (
                <li key={i}>
                  <Link
                    href={link.path}
                    className={clsx(
                      "font-greta-arabic hover:[&_span]:-translate-y-1 py-2 px-2",
                      {
                        "text-primary": pathname == link.path,
                      }
                    )}
                  >
                    <span className="inline-block transition duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Burger Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none cursor-pointer hover:bg-gray-100 rounded-lg transition-colors duration-200"
            aria-label="Toggle menu"
          >
            <span
              className={clsx(
                "block h-1 w-7 bg-black transition-all duration-300 ease-in-out rounded-full",
                {
                  "rotate-45 translate-y-2.5": isOpen,
                }
              )}
            />
            <span
              className={clsx(
                "block h-1 w-7 bg-black transition-all duration-300 ease-in-out rounded-full",
                {
                  "opacity-0 scale-0": isOpen,
                }
              )}
            />
            <span
              className={clsx(
                "block h-1 w-7 bg-black transition-all duration-300 ease-in-out rounded-full",
                {
                  "-rotate-45 -translate-y-2.5": isOpen,
                }
              )}
            />
          </button>
        </Container>
      </header>

      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300",
          {
            "opacity-100": isOpen,
            "opacity-0 pointer-events-none": !isOpen,
          }
        )}
        onClick={closeMenu}
      />

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-40 lg:hidden transition-transform duration-300 ease-in-out",
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen,
          }
        )}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div></div>
            <button
              onClick={closeMenu}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav>
            <ul className="space-y-4">
              {links?.map((link, i: number) => (
                <li key={i}>
                  <Link
                    href={link.path}
                    onClick={closeMenu}
                    className={clsx(
                      "font-greta-arabic block py-3 px-4 rounded-lg transition-all duration-200 hover:bg-gray-50",
                      {
                        "text-primary bg-primary/10": pathname === link.path,
                        "text-gray-700 hover:text-primary":
                          pathname !== link.path,
                      }
                    )}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
