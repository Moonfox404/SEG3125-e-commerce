import Link from "next/link";

export default async function ProductFromSearchPage({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchKey = (await searchParams).search;

  return (
    <main className="px-5 md:px-10">
      <div className="my-5 breadcrumbs text-sm">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li>Search results for: {searchKey}</li>
        </ul>
      </div>
    </main>
  );
};
