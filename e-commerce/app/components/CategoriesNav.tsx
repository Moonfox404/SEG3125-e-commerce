import Link from "next/link";

const CategoriesNav = () => {
  return (
    <div className="bg-primary text-primary-content">
      <ul className="menu w-full justify-evenly menu-vertical md:menu-horizontal">
        <li><Link href="/browse/Sofas-and-Couches">Sofas and Couches</Link></li>
        <li><Link href="/browse/Tables-and-Chairs">Tables and Chairs</Link></li>
        <li><Link href="/browse/Office">Office</Link></li>
        <li><Link href="/browse/Home-Decor">Home Decor</Link></li>
      </ul>
    </div>
  );
};

export default CategoriesNav;
