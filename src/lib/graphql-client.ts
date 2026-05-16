import { GraphQLClient } from "graphql-request";

export const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_WORDPRESS_API_URL!,
  {
    fetch: (url: string | URL | Request, init?: RequestInit) =>
      fetch(url, {
        ...init,
        next: { revalidate: 60 },
      } as RequestInit),
  }
);
