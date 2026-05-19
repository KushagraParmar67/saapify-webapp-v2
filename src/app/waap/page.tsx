import type { Metadata } from "next";
import { WaapClient } from "@/components/waap/waap-client";

export const metadata: Metadata = {
  title: "Website as a Product",
  description:
    "Productized website packages with predictable pricing, clear scope, and guaranteed delivery.",
};

export default function WaapPage() {
  return <WaapClient />;
}
