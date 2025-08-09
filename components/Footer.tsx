import FooterLogo from "@/assets/icons/footer-logo.svg";
import Container from "./Container";
import Link from "next/link";
import { links, socialLinks } from "@/lib/data";

export const Footer = () => {
  return (
    <footer className="bg-white py-14">
      <Container className="flex justify-between pb-8 border-b border-b-[#707070] max-xl:flex-col max-xl:gap-4">
        <div className="logo">
          <FooterLogo className="mb-4" />
          <p className="font-light text-lg leading-6 text-[#9E9E9E] w-full max-w-2xs">
            Copyright © 2025 BFI | All Rights Reserved
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <ul className="flex items-center gap-8 flex-[1] max-lg:gap-4 max-lg:flex-wrap max-lg:justify-center max-lg:text-center">
            {links.map((link, i: number) => {
              return (
                <li key={i}>
                  <Link href={link.path}>{link?.name}</Link>
                </li>
              );
            })}
          </ul>
          <ul className="flex items-center gap-4 self-end max-xl:self-start max-xl:mt-2">
            {socialLinks.map((link, i: number) => {
              return (
                <li key={i}>
                  <Link
                    href={link.path}
                    className="p-2 w-10 h-10 flex items-center justify-center"
                  >
                    {link.icon}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>
      <div className="text-center mt-8">
        <span className="font-normal text-lg leading-4 text-[#707070]">
          Copyright © 2025{" "}
          <Link
            href={"https://malamih.net"}
            target="_blank"
            className="hover:underline"
          >
            malamih.net
          </Link>{" "}
          | All Rights Reserved
        </span>
      </div>
    </footer>
  );
};
