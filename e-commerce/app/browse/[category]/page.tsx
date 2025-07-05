import Link from "next/link";

export default async function ProductFromCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params;

  return (
    <main className="px-5 md:px-10">
      <div className="my-5 breadcrumbs text-sm">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#categories">Categories</Link></li>
          <li>{category.replace(/-/g, " ")}</li>
        </ul>
      </div>
    </main>
  );
};
