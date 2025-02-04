import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('/api/orders');
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Order History</h1>
        {loading ? (
          <p>Loading orders...</p>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Order #{order.orderId}</h2>
                    <p className="text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'delivered' ? 'bg-green-200 text-green-800' :
                    order.status === 'shipped' ? 'bg-blue-200 text-blue-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="border-t pt-4">
                  {order.items.map(item => (
                    <div key={item._id} className="flex items-center mb-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-gray-600">
                          {item.quantity} x ৳{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <p className="font-semibold">Total: ৳{order.total}</p>
                    <button 
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => router.push(`/track-order/${order._id}`)}
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
} 