export interface WPFeaturedImage {
  node: {
    sourceUrl: string;
    altText: string;
    mediaDetails: {
      width: number;
      height: number;
    };
  };
}

export interface WPCategory {
  id: string;
  name: string;
  slug: string;
}

export interface WPAuthor {
  node: {
    name: string;
    avatar: {
      url: string;
    };
  };
}

export interface WPSeo {
  title: string;
  metaDesc: string;
  opengraphTitle: string;
  opengraphDescription: string;
  opengraphImage: {
    sourceUrl: string;
  } | null;
  twitterTitle: string;
  twitterDescription: string;
}

export interface WPPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  featuredImage: WPFeaturedImage | null;
  categories: {
    nodes: WPCategory[];
  };
  author: WPAuthor;
  seo: WPSeo | null;
}

export interface WPPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  seo: WPSeo | null;
}

export interface WPSiteSettings {
  generalSettings: {
    title: string;
    description: string;
    url: string;
  };
}
