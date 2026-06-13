// Blog disabled until WordPress is deployed — re-enable by restoring generateStaticParams and page content
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return [];
}

export default function BlogPostPage() {
  notFound();
}
