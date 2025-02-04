import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AuthForm({ type }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/register';
      const { data } = await axios.post(endpoint, formData);
      
      localStorage.setItem('token', data.token);
      router.push('/account');
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      {type === 'register' && (
        <div>
          <label>Phone Number</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
      )}
      <div>
        <label>Email</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? 'Processing...' : type === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
} 