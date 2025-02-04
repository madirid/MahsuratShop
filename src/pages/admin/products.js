import AdminLayout from '../../components/admin/AdminLayout';
import ProductForm from '../../components/admin/ProductForm';

export default function AdminProducts() {
  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Manage Products</h1>
        <ProductForm />
        {/* Product list table */}
      </div>
    </AdminLayout>
  );
} 