import { useAuth } from '@/contexts/AuthContext';

const Orders = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="container-custom py-20 text-center">Please <a href="/login" className="text-accent hover:underline">login</a> to view orders.</div>;
  }

  const mockOrders = [
    { id: '1', date: '2024-01-15', total: 599, status: 'Delivered' },
    { id: '2', date: '2024-01-10', total: 899, status: 'Shipped' }
  ];

  return (
    <div className="container-custom py-20">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      <div className="grid gap-6">
        {mockOrders.map(order => (
          <div key={order.id} className="border rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Order #{order.id}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {order.status}
              </span>
            </div>
            <p className="text-muted-foreground mb-2">Placed on {order.date}</p>
            <p className="text-2xl font-bold">${order.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
