import CategoriesNav from "../components/CategoriesNav";
import NavBar from "../components/NavBar";

export default function ProductLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar withCategories/>
      {children}
    </div>
  );
};
