import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${product.slug}`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{product.name}</h3>
          <div className="flex items-center mt-2">
            <span className="text-lg font-bold text-red-600">
              ৳{product.salePrice || product.price}
            </span>
            {product.salePrice && (
              <span className="ml-2 text-gray-500 line-through">
                ৳{product.price}
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        onClick={() => addToCart(product, product.sizes[0], 1)}
        className="w-full bg-blue-600 text-white py-2 hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
} 