import { sanityClient } from "@/lib/sanity";
import BlogList from "@/components/BlogList";

async function getPosts() {
  const query = `*[_type == "post"]{ title, slug }`;
  return await sanityClient.fetch(query);
}

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="p-6">
      <BlogList posts={posts} />
    </main>
  );
}
