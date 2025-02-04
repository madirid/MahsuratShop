import { useState } from 'react';
import Link from 'next/link';

const categories = {
  Men: ['T-Shirts', 'Shirts', 'Pants', 'Accessories'],
  Women: ['Tops', 'Dresses', 'Pants', 'Accessories'],
  Kids: ['Boys', 'Girls', 'Infants']
};

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src="/logo.png" alt="MahsuratShop" />
            </Link>
            
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {Object.keys(categories).map((category) => (
                <div
                  key={category}
                  className="relative group"
                  onMouseEnter={() => setActiveCategory(category)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  <button className="px-3 py-2 text-gray-700 hover:text-gray-900">
                    {category}
                  </button>
                  
                  {activeCategory === category && (
                    <div className="absolute z-50 left-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                      {categories[category].map((subCategory) => (
                        <Link
                          key={subCategory}
                          href={`/category/${category.toLowerCase()}/${subCategory.toLowerCase()}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {subCategory}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="hidden md:ml-4 md:flex md:items-center">
              <Link href="/cart" className="px-3 py-2 text-gray-700 hover:text-gray-900">
                Cart
              </Link>
              <Link href="/account" className="px-3 py-2 text-gray-700 hover:text-gray-900">
                Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav> 