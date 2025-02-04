import { useState } from 'react';
import { initiatePayment } from '../services/payment';

export default function PaymentMethodSelector() {
  const [selectedMethod, setSelectedMethod] = useState('bkash');
  const paymentMethods = ['bkash', 'nagad', 'upay'];

  const handlePayment = async () => {
    try {
      const paymentData = await initiatePayment(
        selectedMethod,
        totalAmount,
        orderDetails
      );
      window.location.href = paymentData.paymentUrl;
    } catch (error) {
      console.error('Payment initiation failed:', error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Select Payment Method</h3>
      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <label key={method} className="flex items-center space-x-2">
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={selectedMethod === method}
              onChange={(e) => setSelectedMethod(e.target.value)}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="capitalize">{method}</span>
            <img 
              src={`/payment-icons/${method}.png`} 
              alt={method}
              className="h-6 ml-2"
            />
          </label>
        ))}
      </div>
      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700"
      >
        Confirm Payment
      </button>
    </div>
  );
} 