import type { Metadata } from "next";
import { CaapClient } from "@/components/caap/caap-client";

export const metadata: Metadata = {
  title: "CaaP – Customization as a Product",
  description:
    "Tailored SaaPify customizations designed to improve store performance, customer experience, and operational efficiency.",
};

export default function CaapPage() {
  return <CaapClient />;
}
