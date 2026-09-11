import { permanentRedirect } from "next/navigation";

/** Individual project pages moved to /work/[slug]. */
export default async function ProjectDetailRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  permanentRedirect(`/work/${slug}`);
}
