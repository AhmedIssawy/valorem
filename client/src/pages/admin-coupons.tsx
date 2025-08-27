import React, { useState } from 'react';
import { useGetCouponsQuery, useCreateCouponMutation, useGetCoursesQuery } from '../app/api/coursesApiSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'react-toastify';

interface Coupon {
  _id: string;
  code: string;
  used: boolean;
  course: {
    _id: string;
    name: string;
    price: number;
  };
  user?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
}

const AdminCouponsPage: React.FC = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [filter, setFilter] = useState<'all' | 'used' | 'unused'>('all');

  const { data: couponsData, isLoading: isLoadingCoupons, refetch } = useGetCouponsQuery({
    page: 1,
    limit: 50,
    used: filter === 'all' ? 'all' : filter === 'used' ? 'true' : 'false'
  });

  const { data: coursesData } = useGetCoursesQuery({ page: 1, limit: 100 });
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();

  const coupons = couponsData?.data?.coupons || [];
  const courses = coursesData?.data || [];

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCourse) {
      toast.error('Please select a course');
      return;
    }

    try {
      await createCoupon({ course: selectedCourse }).unwrap();
      toast.success('Coupon created successfully!');
      setShowCreateForm(false);
      setSelectedCourse('');
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to create coupon');
    }
  };

  if (isLoadingCoupons) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading coupons...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Coupon Management</h1>
          <Button onClick={() => setShowCreateForm(true)}>
            Create New Coupon
          </Button>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All Coupons
          </Button>
          <Button
            variant={filter === 'unused' ? 'default' : 'outline'}
            onClick={() => setFilter('unused')}
          >
            Unused
          </Button>
          <Button
            variant={filter === 'used' ? 'default' : 'outline'}
            onClick={() => setFilter('used')}
          >
            Used
          </Button>
        </div>

        {/* Create Coupon Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Coupon</CardTitle>
              <CardDescription>
                Generate a new coupon for a specific course
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateCoupon} className="space-y-4">
                <div>
                  <label htmlFor="course" className="block text-sm font-medium mb-2">
                    Select Course *
                  </label>
                  <select
                    id="course"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Choose a course</option>
                    {courses.map((course: any) => (
                      <option key={course._id} value={course._id}>
                        {course.name} - ${course.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="submit"
                    disabled={isCreating}
                  >
                    {isCreating ? 'Creating...' : 'Create Coupon'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
                      setSelectedCourse('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Coupons List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon: Coupon) => (
          <Card key={coupon._id} className="h-full">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-mono">{coupon.code}</CardTitle>
                <Badge variant={coupon.used ? 'destructive' : 'default'}>
                  {coupon.used ? 'Used' : 'Available'}
                </Badge>
              </div>
              <CardDescription>
                Created: {new Date(coupon.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm text-gray-600">Course</h4>
                  <p className="font-medium">{coupon.course.name}</p>
                  <p className="text-green-600 font-bold">${coupon.course.price}</p>
                </div>

                {coupon.used && coupon.user && (
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600">Used By</h4>
                    <p className="font-medium">{coupon.user.name}</p>
                    <p className="text-sm text-gray-500">{coupon.user.email}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {coupons.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No coupons found</h3>
          <p className="text-gray-600">
            {filter === 'all' 
              ? 'Create your first coupon to get started!' 
              : `No ${filter} coupons available.`
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminCouponsPage;