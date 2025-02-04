import AdminLayout from '../../components/admin/AdminLayout';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

Chart.register(...registerables);

export default function AdminDashboard() {
  const [salesData, setSalesData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const { data } = await axios.get('/api/admin/sales');
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSalesData();
  }, []);

  const chartData = {
    labels: salesData.labels || [],
    datasets: [
      {
        label: 'Sales (৳)',
        data: salesData.data || [],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      }
    ]
  };

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Sales Analytics</h1>
        {loading ? (
          <p>Loading data...</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
              <Bar 
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false
                }}
                height={400}
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium">Total Revenue</h3>
                  <p className="text-2xl font-bold">৳{salesData.totalRevenue}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium">Total Orders</h3>
                  <p className="text-2xl font-bold">{salesData.totalOrders}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <h3 className="font-medium">Average Order Value</h3>
                  <p className="text-2xl font-bold">৳{salesData.averageOrderValue}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 