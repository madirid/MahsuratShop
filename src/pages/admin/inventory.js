import AdminLayout from '../../components/admin/AdminLayout';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function InventoryManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/admin/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const updateStock = async (productId, newStock) => {
    try {
      await axios.put(`/api/admin/products/${productId}/stock`, { stock: newStock });
      setProducts(products.map(p => 
        p._id === productId ? { ...p, inStock: newStock } : p
      ));
    } catch (error) {
      console.error('Stock update failed:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Inventory Management</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left py-2">Product</th>
                <th className="text-left py-2">Category</th>
                <th className="text-left py-2">Current Stock</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="border-t">
                  <td className="py-4">{product.name}</td>
                  <td className="py-4">{product.category}</td>
                  <td className="py-4">
                    <input
                      type="number"
                      value={product.inStock}
                      onChange={(e) => updateStock(product._id, e.target.value)}
                      className="w-24 px-2 py-1 border rounded"
                    />
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => updateStock(product._id, product.inStock)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
} 