import FacebookIcon from "@/assets/icons/facebook.svg";
import TwitterIcon from "@/assets/icons/twitter.svg";
import InstagramIcon from "@/assets/icons/instagram.svg";
import LinkedinIcon from "@/assets/icons/linkedin.svg";

interface SocialLink {
  name: string;
  path: string;
  icon: React.ReactNode;
}

interface Link {
  name: string;
  path: string;
}

export const links: Link[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About BFI",
    path: "/about",
  },
  {
    name: "Programs & Labs",
    path: "/programs&labs",
  },
  {
    name: "Resources",
    path: "/resources",
  },
  {
    name: "Iraqi Industry Guide",
    path: "/iraqi-industry-guide",
  },
  {
    name: "News & Media",
    path: "/news&media",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export const socialLinks: SocialLink[] = [
  {
    name: "facebook",
    path: "/",
    icon: <FacebookIcon />,
  },
  {
    name: "twitter",
    path: "/",
    icon: <TwitterIcon />,
  },
  {
    name: "instagram",
    path: "/",
    icon: <InstagramIcon />,
  },
  {
    name: "linkedin",
    path: "/",
    icon: <LinkedinIcon />,
  },
];
