import { useState } from 'react';
import { useCart } from '../context/CartContext';
import PaymentMethodSelector from '../components/PaymentMethodSelector';

export default function Checkout() {
  const { cartItems, calculateTotal } = useCart();
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    address: '',
    city: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle checkout logic
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Full Name</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={shippingInfo.name}
              onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-2">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full p-2 border rounded"
              value={shippingInfo.phone}
              onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-2">Address</label>
            <textarea
              required
              className="w-full p-2 border rounded"
              value={shippingInfo.address}
              onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            />
          </div>
          <div>
            <label className="block mb-2">City</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={shippingInfo.city}
              onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
            />
          </div>
        </form>

        <div className="bg-gray-50 p-6 rounded">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} ({item.size}) x {item.quantity}</span>
              <span>৳{item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>৳{calculateTotal()}</span>
            </div>
          </div>
          <PaymentMethodSelector />
        </div>
      </div>
    </div>
  );
} 