import {
  Contact,
  Factory,
  Folders,
  Gavel,
  Handshake,
  HouseIcon,
  Images,
  Info,
  Library,
  Newspaper,
  NotebookPen,
  Target,
  Users2,
} from "lucide-react";

const linkIconWidth = 18;
export const groups = [
  {
    name: "Pages",
    links: [
      {
        name: "Home",
        path: "/dashboard",
        icon: <HouseIcon width={linkIconWidth} />,
      },
      {
        name: "About",
        path: "/dashboard/pages/about",
        icon: <Info width={linkIconWidth} />,
      },
      {
        name: "News And Media",
        path: "/dashboard/pages/news-and-media",
        icon: <Newspaper width={linkIconWidth} />,
      },
      {
        name: "Contact",
        path: "/dashboard/pages/contact",
        icon: <Contact width={linkIconWidth} />,
      },
      {
        name: "Iraqi Industry Guide",
        path: "/dashboard/pages/iraqi-industry-guide",
        icon: <Factory width={linkIconWidth} />,
      },
      {
        name: "Resources",
        path: "/dashboard/pages/resources",
        icon: <Library width={linkIconWidth} />,
      },
    ],
  },
  {
    name: "Collections",
    links: [
      {
        name: "Partners",
        path: "/dashboard/partners",
        icon: <Users2 width={linkIconWidth} />,
      },
      {
        name: "Gallery",
        path: "/dashboard/gallery",
        icon: <Images width={linkIconWidth} />,
      },
      {
        name: "Blogs",
        path: "/dashboard/blogs",
        icon: <NotebookPen width={linkIconWidth} />,
      },
      {
        name: "Programs",
        path: "/dashboard/programs",
        icon: <Target width={linkIconWidth} />,
      },
      {
        name: "Projects",
        path: "/dashboard/projects",
        icon: <Folders width={linkIconWidth} />,
      },
      {
        name: "Jurors",
        path: "/dashboard/jurors",
        icon: <Gavel width={linkIconWidth} />,
      },
    ],
  },
];
