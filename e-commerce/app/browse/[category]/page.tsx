import { MockProducts } from "@/app/mock-data/MockProducts";
import BrowseProductsPage, { CategoryName } from "@/app/page-templates/BrowseProductsPage";
import Link from "next/link";

export default async function ProductFromCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params;
  const parsedCategory = category.replace(/-/g, " ");

  return (
    <main className="px-5 md:px-10">
      <div className="my-5 breadcrumbs text-sm">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#categories">Categories</Link></li>
          <li>{parsedCategory}</li>
        </ul>
        <BrowseProductsPage category={parsedCategory as CategoryName} products={
          Array.from({ length: 20 }, () => MockProducts[0])
        } />
      </div>
    </main>
  );
};
