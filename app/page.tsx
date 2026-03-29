import React from "react";
import PortfolioContent from "@/components/PortfolioContent";
import { getMarkdownContent } from "@/lib/markdown";

export default async function PortfolioPage() {
  const content = getMarkdownContent();

  if (!content) return null;

  return <PortfolioContent content={content} />;
}
