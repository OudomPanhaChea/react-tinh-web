import { useEffect, useState } from "react";
import { useAppContext } from "../context/useAppContext";
import ProductCard from "../components/ProductCard";
import type { ProductsType } from "../utils/types";

const AllProducts = () => {
  const { products, searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState<ProductsType[]>([]);

  useEffect(() => {
    if(searchQuery.length > 0) {
      setFilteredProducts(products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col">
      <div className="">
        <p className="text-2xl md:text-3xl font-medium">All Products</p>
        <div className="w-16 h-0.5 rounded-full bg-primary" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6">
        {filteredProducts.filter((product) => product.inStock).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
