import type { Metadata } from "next";
import { ContactClient } from "@/components/contact/contact-client";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with SaaPify. Tell us what you're building.",
};

export default function ContactPage() {
  return <ContactClient />;
}
