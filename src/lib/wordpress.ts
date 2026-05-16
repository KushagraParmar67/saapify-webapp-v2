import { gql } from "graphql-request";
import { client } from "./graphql-client";
import type { WPPost, WPPage, WPSiteSettings } from "@/types/wordpress";

export async function getAllPosts(): Promise<WPPost[]> {
  const query = gql`
    query GetAllPosts {
      posts(first: 100, where: { status: PUBLISH }) {
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails {
                width
                height
              }
            }
          }
          categories {
            nodes {
              id
              name
              slug
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          seo {
            title
            metaDesc
          }
        }
      }
    }
  `;

  const data = await client.request<{ posts: { nodes: WPPost[] } }>(query);
  return data.posts.nodes;
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const query = gql`
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        date
        excerpt
        content
        featuredImage {
          node {
            sourceUrl
            altText
            mediaDetails {
              width
              height
            }
          }
        }
        categories {
          nodes {
            id
            name
            slug
          }
        }
        author {
          node {
            name
            avatar {
              url
            }
          }
        }
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
          twitterTitle
          twitterDescription
        }
      }
    }
  `;

  const data = await client.request<{ post: WPPost | null }>(query, { slug });
  return data.post;
}

export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const query = gql`
    query GetAllPostSlugs {
      posts(first: 1000, where: { status: PUBLISH }) {
        nodes {
          slug
        }
      }
    }
  `;

  const data = await client.request<{ posts: { nodes: { slug: string }[] } }>(
    query
  );
  return data.posts.nodes;
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const query = gql`
    query GetPageBySlug($slug: ID!) {
      page(id: $slug, idType: URI) {
        id
        title
        slug
        content
        seo {
          title
          metaDesc
          opengraphTitle
          opengraphDescription
          opengraphImage {
            sourceUrl
          }
          twitterTitle
          twitterDescription
        }
      }
    }
  `;

  const data = await client.request<{ page: WPPage | null }>(query, { slug });
  return data.page;
}

export async function getSiteSettings(): Promise<WPSiteSettings> {
  const query = gql`
    query GetSiteSettings {
      generalSettings {
        title
        description
        url
      }
    }
  `;

  const data = await client.request<WPSiteSettings>(query);
  return data;
}
