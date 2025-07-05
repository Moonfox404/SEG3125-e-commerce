import Link from "next/link";

const CategoriesNav = () => {
  return (
    <div className="bg-primary text-primary-content">
      <ul className="menu w-full justify-evenly menu-horizontal">
        <li><Link href="/products/sofas-and-couches">Sofas and Couches</Link></li>
        <li><Link href="/products/tables-and-chairs">Tables and Chairs</Link></li>
        <li><Link href="/products/office">Office</Link></li>
        <li><Link href="/products/home-decor">Home Decor</Link></li>
      </ul>
    </div>
  );
};

export default CategoriesNav;
