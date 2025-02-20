import { sanityClient } from "@/lib/sanity";
import PortableText from "@/components/PortableText";

export async function generateStaticParams() {
  const query = `*[_type == "post"]{ slug }`;
  const posts = await sanityClient.fetch(query);
  
  return posts.map((post) => ({ slug: post.slug.current }));
}

async function getPost(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title, body, mainImage { asset->{url} }, publishedAt
  }`;

  return await sanityClient.fetch(query, { slug });
}

export default async function BlogPost({ params }) {
  const post = await getPost(params.slug);

  if (!post) return <p>Post not found.</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{new Date(post.publishedAt).toDateString()}</p>
      {post.mainImage && <img src={post.mainImage.asset.url} alt={post.title} />}
      <PortableText value={post.body} />
    </article>
  );
}
