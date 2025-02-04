import axios from 'axios';

const PAYMENT_API_URL = process.env.NEXT_PUBLIC_PAYMENT_API_URL;

export const paymentConfig = {
  bkash: {
    merchantNumber: '01727218643',
    apiKey: process.env.BKASH_API_KEY,
    apiSecret: process.env.BKASH_API_SECRET,
    username: process.env.BKASH_USERNAME,
    password: process.env.BKASH_PASSWORD
  },
  nagad: {
    merchantNumber: '01727218643',
    merchantId: process.env.NAGAD_MERCHANT_ID,
    publicKey: process.env.NAGAD_PUBLIC_KEY,
    privateKey: process.env.NAGAD_PRIVATE_KEY
  },
  upay: {
    merchantNumber: '01727218643',
    merchantId: process.env.UPAY_MERCHANT_ID,
    apiKey: process.env.UPAY_API_KEY
  }
};

export const initiatePayment = async (method, amount, orderInfo) => {
  try {
    const response = await axios.post(`${PAYMENT_API_URL}/initiate`, {
      method,
      amount,
      orderInfo,
      merchantNumber: paymentConfig[method].merchantNumber
    });
    return response.data;
  } catch (error) {
    throw new Error(`Payment initiation failed: ${error.message}`);
  }
};

export const verifyPayment = async (method, paymentId) => {
  try {
    const response = await axios.post(`${PAYMENT_API_URL}/verify`, {
      method,
      paymentId
    });
    return response.data;
  } catch (error) {
    throw new Error(`Payment verification failed: ${error.message}`);
  }
}; 