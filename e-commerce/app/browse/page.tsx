import Link from "next/link";
import BrowseProductsPage from "../page-templates/BrowseProductsPage";
import { MockProducts } from "../mock-data/MockProducts";

export default async function ProductFromSearchPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchKey = (await searchParams).search;

  const searchString = Array.isArray(searchKey) ? searchKey?.at(0) : searchKey as string;

  return (
    <main className="px-5 md:px-10">
      <div className="my-5 breadcrumbs text-sm">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li>Search results for: {searchKey}</li>
        </ul>
      </div>
      <BrowseProductsPage category="all" products={
          MockProducts.filter((product) => (product.name + product.details).toLowerCase().includes((searchString ?? "").toLowerCase()))
        } />
    </main>
  );
};
