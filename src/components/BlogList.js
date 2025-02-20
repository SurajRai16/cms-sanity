import Link from "next/link";

export default function BlogList({ posts }) {
  return (
    <div>
      <h1 className="text-2xl font-bold">Blog Posts</h1>
      <ul className="mt-4 space-y-2">
        {posts.map((post) => (
          <li key={post.slug.current}>
            <Link 
              href={`/blog/${post.slug.current}`} 
              className="text-blue-600 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
