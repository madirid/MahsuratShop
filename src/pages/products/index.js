import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import FilterSidebar from '../../components/FilterSidebar';

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    category: '',
    size: '',
    priceRange: '',
    color: ''
  });

  // Sample products data - replace with API call
  const products = [
    // Your product data here
  ];

  const filteredProducts = products.filter(product => {
    return (
      (!filters.category || product.category === filters.category) &&
      (!filters.size || product.sizes.includes(filters.size)) &&
      (!filters.color || product.colors.includes(filters.color)) &&
      (!filters.priceRange || (
        product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1]
      ))
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar filters={filters} setFilters={setFilters} />
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
} 