const CategoriesTabs = () => {
  return (
    <div className="flex items-center p-2 justify-evenly h-full w-full tabs tabs-border text-primary-content bg-primary">
      <input type="radio" name="categories" aria-label="Sofas and Couches" className="tab" />
      <input type="radio" name="categories" aria-label="Tables and Chairs" className="tab" />
      <input type="radio" name="categories" aria-label="Office" className="tab" />
      <input type="radio" name="categories" aria-label="Home Decor" className="tab" />
    </div>
  );
};

export default CategoriesTabs;
