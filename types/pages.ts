export type Page = {
  _id: string;
  pageName: string;
  sections: {
    hero: {
      headline: string;
      subheadline: string;
      image: string;
    };
    intro: {
      headline: string;
      subheadline: string;
    };
    bfiCannes: {
      headline: string;
      subheadline: string;
    };
    about: {
      headline: string;
      subheadline: string;
      description: string;
      video: string;
    };
    corePillars: {
      headline: string;
      subheadline: string;
      pillars: any[]; // إذا كانت الأعمدة لها شكل معين يمكن تحديده بدقة
    };
    overview: {
      partners: {
        title: string;
        description: string;
        icon: string;
      };
      vision: {
        title: string;
        description: string;
        icon: string;
      };
      mission: {
        title: string;
        description: string;
        icon: string;
      };
    };
    resources_and_industry_tools: {
      headline: string;
      description: string;
      videos: any[]; // إذا كانت الفيديوهات كائنات معينة يمكن تحديد نوعها
    };
  };
};

export type getPagesResponse = {
  success: boolean;
  count: number;
  payload: BFIPage[];
};

// Base types for common structures
interface HeroSection {
  headline: string;
  subheadline: string;
  image: string;
}

interface OverviewItem {
  title: string;
  description: string;
  icon?: string;
}

type Pillar = {
  title: string;
  description: string;
  icon: string;
};

interface Offer {
  // Define offer structure based on your needs
  [key: string]: any;
}

interface Expectation {
  // Define expectation structure based on your needs
  [key: string]: any;
}

// Page-specific section types
interface AboutSections {
  hero: HeroSection;
  who_we_are: {
    headline: string;
    subheadline: string;
  };
  overview: {
    vision: OverviewItem;
    mission: OverviewItem;
    why_bfi: OverviewItem;
    image: string;
  };
}

interface ContactSections {
  form: {
    headline: string;
    subheadline: string;
    email: string;
    location: string;
    title: string;
    description: string;
  };
}

interface HomeSections {
  hero: HeroSection;
  intro: {
    headline: string;
    subheadline: string;
    image: string;
  };
  bfiCannes: {
    headline: string;
    subheadline: string;
  };
  about: {
    headline: string;
    subheadline: string;
    description: string;
    video: string;
  };
  corePillars: {
    headline: string;
    subheadline: string;
    pillars: Pillar[];
  };
  overview: {
    partners: OverviewItem;
    vision: OverviewItem;
    mission: OverviewItem;
  };
  resources_and_industry_tools: {
    headline: string;
    description: string;
    videos: string[];
  };
}

interface IraqiIndustryGuideSections {
  content: string;
  title: string;
  gateway: {
    headline: string;
    subheadline: string;
  };
  guid: {
    headline: string;
    offers: Offer[];
  };
  expectation: {
    headline: string;
    subheadline: string;
  };
  suggestion: string;
}

interface NewsAndMediaSections {
  hero: HeroSection;
}

interface ResourcesSections {
  title: string;
  standard_support: {
    headline: string;
    subheadline: string;
  };
  expectation: {
    headline: string;
    expectations: Expectation[];
  };
  toolkit: {
    headline: string;
    subheadline: string;
  };
  suggestion: string;
  content: string;
}

// Main page type definitions
interface AboutPage {
  _id: string;
  pageName: "about";
  sections: AboutSections;
}

interface ContactPage {
  _id: string;
  pageName: "contact";
  sections: ContactSections;
}

interface HomePage {
  _id: string;
  pageName: "home";
  sections: HomeSections;
}

interface IraqiIndustryGuidePage {
  _id: string;
  pageName: "iraqiIndustryGuide";
  sections: IraqiIndustryGuideSections;
}

interface NewsAndMediaPage {
  _id: string;
  pageName: "news_and_media";
  sections: NewsAndMediaSections;
}

interface ResourcesPage {
  _id: string;
  pageName: "resources";
  sections: ResourcesSections;
}

// Union type for all pages
type BFIPage =
  | AboutPage
  | ContactPage
  | HomePage
  | IraqiIndustryGuidePage
  | NewsAndMediaPage
  | ResourcesPage;

// API response type
interface BFIApiResponse {
  success: boolean;
  count: number;
  payload: BFIPage[];
}

// Constants for page names
export const PAGE_NAMES = {
  ABOUT: "about",
  CONTACT: "contact",
  HOME: "home",
  IRAQI_INDUSTRY_GUIDE: "iraqiIndustryGuide",
  NEWS_AND_MEDIA: "news_and_media",
  RESOURCES: "resources",
} as const;

// Type for page names
export type PageName = (typeof PAGE_NAMES)[keyof typeof PAGE_NAMES];

// Constants for section names by page
export const SECTION_NAMES = {
  ABOUT: {
    HERO: "hero",
    WHO_WE_ARE: "who_we_are",
    OVERVIEW: "overview",
  },
  CONTACT: {
    FORM: "form",
  },
  HOME: {
    HERO: "hero",
    INTRO: "intro",
    BFI_CANNES: "bfiCannes",
    ABOUT: "about",
    CORE_PILLARS: "corePillars",
    OVERVIEW: "overview",
    RESOURCES_AND_INDUSTRY_TOOLS: "resources_and_industry_tools",
  },
  IRAQI_INDUSTRY_GUIDE: {
    TITLE: "title",
    GATEWAY: "gateway",
    GUID: "guid",
    EXPECTATION: "expectation",
    SUGGESTION: "suggestion",
  },
  NEWS_AND_MEDIA: {
    HERO: "hero",
  },
  RESOURCES: {
    TITLE: "title",
    STANDARD_SUPPORT: "standard_support",
    EXPECTATION: "expectation",
    TOOLKIT: "toolkit",
    SUGGESTION: "suggestion",
  },
} as const;

// Export all types
export type {
  BFIPage,
  BFIApiResponse,
  AboutPage,
  ContactPage,
  HomePage,
  IraqiIndustryGuidePage,
  NewsAndMediaPage,
  ResourcesPage,
  AboutSections,
  ContactSections,
  HomeSections,
  IraqiIndustryGuideSections,
  NewsAndMediaSections,
  ResourcesSections,
  HeroSection,
  OverviewItem,
  Pillar,
  Offer,
  Expectation,
};

// Helper function to get page by name with proper typing
export function getPageByName<T extends PageName>(
  pages: BFIPage[],
  pageName: T
): Extract<BFIPage, { pageName: T }> | undefined {
  return pages.find(
    (page): page is Extract<BFIPage, { pageName: T }> =>
      page.pageName === pageName
  );
}

// Type guards for each page type
export function isAboutPage(page: BFIPage): page is AboutPage {
  return page.pageName === "about";
}

export function isContactPage(page: BFIPage): page is ContactPage {
  return page.pageName === "contact";
}

export function isHomePage(page: BFIPage): page is HomePage {
  return page.pageName === "home";
}

export function isIraqiIndustryGuidePage(
  page: BFIPage
): page is IraqiIndustryGuidePage {
  return page.pageName === "iraqiIndustryGuide";
}

export function isNewsAndMediaPage(page: BFIPage): page is NewsAndMediaPage {
  return page.pageName === "news_and_media";
}

export function isResourcesPage(page: BFIPage): page is ResourcesPage {
  return page.pageName === "resources";
}
