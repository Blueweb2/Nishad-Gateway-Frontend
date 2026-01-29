import BlogCardsGrid from "@/components/user/blog/BlogCardsGrid";
import { BLOGS } from "@/lib/data/blogs";

export default function Insights() {
  return <BlogCardsGrid blogs={BLOGS} limit={3} />;
}