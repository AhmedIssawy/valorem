import React, { useState } from 'react';
import { useGetOrdersQuery, useMarkOrderAsPaidMutation } from '../app/api/ordersApiSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'react-toastify';

interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  product: {
    _id: string;
    name: string;
    price: number;
  };
  price: number;
  paymentMethod: string;
  paid: boolean;
  createdAt: string;
}

const AdminOrdersPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all');
  
  const { data: ordersData, isLoading, refetch } = useGetOrdersQuery({
    page: 1,
    limit: 50
  });
  
  const [markAsPaid, { isLoading: isMarkingPaid }] = useMarkOrderAsPaidMutation();

  const orders = ordersData?.data || [];
  
  // Filter orders based on payment status
  const filteredOrders = orders.filter((order: Order) => {
    if (filter === 'paid') return order.paid;
    if (filter === 'unpaid') return !order.paid;
    return true;
  });

  const handleMarkAsPaid = async (orderId: string) => {
    try {
      await markAsPaid(orderId).unwrap();
      toast.success('Order marked as paid and course added to customer!');
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to mark order as paid');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Order Management</h1>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All Orders
          </Button>
          <Button
            variant={filter === 'unpaid' ? 'default' : 'outline'}
            onClick={() => setFilter('unpaid')}
          >
            Pending Payment
          </Button>
          <Button
            variant={filter === 'paid' ? 'default' : 'outline'}
            onClick={() => setFilter('paid')}
          >
            Paid
          </Button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order: Order) => (
          <Card key={order._id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Order #{order._id.slice(-8)}</CardTitle>
                  <CardDescription>
                    {new Date(order.createdAt).toLocaleDateString()} at{' '}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </CardDescription>
                </div>
                <div className="flex gap-2 items-center">
                  <Badge variant={order.paid ? 'default' : 'destructive'}>
                    {order.paid ? 'Paid' : 'Pending'}
                  </Badge>
                  {!order.paid && (
                    <Button
                      onClick={() => handleMarkAsPaid(order._id)}
                      disabled={isMarkingPaid}
                      size="sm"
                    >
                      {isMarkingPaid ? 'Processing...' : 'Mark as Paid'}
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Customer Info */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-2">Customer</h4>
                  <p className="font-medium">{order.user.name}</p>
                  <p className="text-sm text-gray-500">{order.user.email}</p>
                </div>

                {/* Course Info */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-2">Course</h4>
                  <p className="font-medium">{order.product.name}</p>
                  <p className="text-green-600 font-bold">${order.price}</p>
                </div>

                {/* Payment Info */}
                <div>
                  <h4 className="font-semibold text-sm text-gray-600 mb-2">Payment</h4>
                  <p className="font-medium capitalize">
                    {order.paymentMethod.replace('_', ' ')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Status: {order.paid ? 'Completed' : 'Pending'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No orders found</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? 'No orders have been placed yet.' 
              : `No ${filter} orders available.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;