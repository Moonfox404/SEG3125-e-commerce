import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="min-h-screen p-6 sm:p-12 bg-corns ink">
        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-lg shadow">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
            About Furniture Forest
          </h1>
          <p className="mb-4 text-gray-700">
            Furniture Forest was founded in 2025 with a simple mission: to bring
            high-quality, stylish, and sustainable furniture to Canadian homes.
            From our flagship showroom in Ottawa to our nationwide online store,
            we believe that every piece should merge form and function.
          </p>
          <p className="mb-4 text-gray-700">
            Our collection features handcrafted solid wood tables, modular sofas
            made with eco-friendly fabrics, and decor accents inspired by
            nature. We partner with local artisans and ethical manufacturers to
            ensure every item meets our rigorous quality and environmental
            standards.
          </p>
          <h2 className="text-xl sm:text-2xl font-semibold text-primary mt-6 mb-2">
            Our Values
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Sustainability: Using responsibly sourced materials.</li>
            <li>Craftsmanship: Attention to detail in every design.</li>
            <li>Accessibility: Fair pricing without compromising quality.</li>
            <li>
              Community: Supporting Canadian artisans and small businesses.
            </li>
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
