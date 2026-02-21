import BlogHeroCard, { BlogHero } from "./BlogHeroCard";

type Props = {
  blogs: BlogHero[];
  limit?: number;
};

export default function BlogCardsGrid({ blogs, limit }: Props) {
  const visible = limit ? blogs.slice(0, limit) : blogs;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 bg-white" data-navbar="light"  data-menu="dark-text">
      {visible.map((blog) => (
        <BlogHeroCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};