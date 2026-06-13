"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { WPPost } from "@/types/wordpress";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

function readTime(content: string) {
  const words = content?.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length ?? 0;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function categoryOf(post: WPPost) {
  return post.categories.nodes[0]?.name ?? "";
}

interface Props {
  posts: WPPost[];
}

export function BlogListingClient({ posts }: Props) {
  const [active, setActive] = useState("All");

  const uniqueCategories = Array.from(
    new Set(posts.flatMap((p) => p.categories.nodes.map((c) => c.name)).filter(Boolean))
  );
  const categories = ["All", ...uniqueCategories];

  const featured = posts[0] ?? null;
  const gridPosts = posts.slice(1);

  const matches = (p: WPPost) => active === "All" || categoryOf(p) === active;
  const showFeatured = featured && matches(featured);
  const visibleGrid = gridPosts.filter(matches);
  const isEmpty = !showFeatured && visibleGrid.length === 0;

  return (
    <div className="blog-glow">
      <main
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 1180,
          margin: "0 auto",
          padding: "clamp(48px, 8vw, 104px) clamp(20px, 5vw, 48px) clamp(72px, 10vw, 140px)",
        }}
      >
        <header style={{ maxWidth: 760 }}>
          <span className="blog-eyebrow">SaaPify Blog</span>
          <h1
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: "clamp(44px, 8vw, 80px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              marginTop: 22,
            }}
          >
            Field notes from the&nbsp;operations layer.
          </h1>
          <p
            style={{
              color: "#8b97ad",
              fontSize: "clamp(16px, 2vw, 20px)",
              marginTop: 22,
              maxWidth: 540,
              lineHeight: 1.6,
            }}
          >
            Insights, updates, and thinking from the SaaPify team.
          </p>
        </header>

        {categories.length > 2 && (
          <div className="blog-filters" role="group" aria-label="Filter posts by category">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`blog-chip${active === cat ? " active" : ""}`}
                onClick={() => setActive(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {showFeatured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="blog-featured"
            aria-label={`Featured: ${featured.title}`}
          >
            <div
              className="blog-featured-media"
              role="img"
              aria-label={featured.featuredImage?.node.altText || `Cover image for ${featured.title}`}
            >
              {featured.featuredImage && (
                <Image
                  src={featured.featuredImage.node.sourceUrl}
                  alt={featured.featuredImage.node.altText || featured.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 58vw"
                />
              )}
            </div>
            <div className="blog-featured-body">
              <span className="blog-featured-tag">Featured · {categoryOf(featured)}</span>
              <h2>{featured.title}</h2>
              {featured.excerpt && (
                <p className="blog-featured-excerpt">{stripHtml(featured.excerpt)}</p>
              )}
              <div className="blog-meta">
                <span className="blog-meta-author">{featured.author.node.name}</span>
                <span className="blog-dot" aria-hidden="true" />
                <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                {featured.content && (
                  <>
                    <span className="blog-dot" aria-hidden="true" />
                    <span>{readTime(featured.content)}</span>
                  </>
                )}
              </div>
            </div>
          </Link>
        )}

        {visibleGrid.length > 0 && (
          <section className="blog-post-grid" aria-label="Blog posts">
            {visibleGrid.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="blog-card"
                aria-label={`Read: ${post.title}`}
              >
                <div
                  className="blog-card-media"
                  role="img"
                  aria-label={post.featuredImage?.node.altText || `Cover image for ${post.title}`}
                >
                  {post.featuredImage && (
                    <Image
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
                    />
                  )}
                </div>
                <div className="blog-card-body">
                  <span className="blog-category">{categoryOf(post)}</span>
                  <h3>{post.title}</h3>
                  {post.excerpt && (
                    <p className="blog-excerpt-sm">{stripHtml(post.excerpt)}</p>
                  )}
                  <div className="blog-card-meta">
                    <span className="blog-meta-author">{post.author.node.name}</span>
                    <span className="blog-dot" aria-hidden="true" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}

        {isEmpty && (
          <p
            style={{
              textAlign: "center",
              marginTop: 48,
              fontSize: 16,
              color: "#8b97ad",
            }}
          >
            No posts in this category yet.
          </p>
        )}
      </main>
    </div>
  );
}
