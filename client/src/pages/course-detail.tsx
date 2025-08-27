import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCourseByIdQuery, usePlaceOrderMutation } from '../app/api/coursesApiSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';
import { useTranslation } from '../hooks/useTranslation';
import { COURSE_DETAIL_PLACEHOLDER } from '../utils/placeholderImage';
import { Link } from 'react-router-dom';
interface CourseDetail {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  videos?: string[];
}

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  
  // Get settings and translations
  const { t } = useTranslation();

  // Get user info using the auth hook with localStorage
  const { isAuthenticated, user: userInfo, isLoading: isUserLoading } = useAuth();

  const { data: courseData, isLoading, error } = useGetCourseByIdQuery(id!);
  const [placeOrder, { isLoading: isPlacingOrder }] = usePlaceOrderMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-lg text-gray-900 dark:text-white">{t('loading')}</div>
      </div>
    );
  }

  if (error || !courseData?.data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-lg text-red-500 dark:text-red-400">{t('error')}</div>
      </div>
    );
  }

  const course: CourseDetail = courseData.data;

  // Check if user owns this course
  const userOwnsCourse = userInfo?.courses?.some(
    (ownedCourse: any) => ownedCourse._id === id
  );

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !paymentMethod) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const result = await placeOrder({
        courseId: id!,
        paymentMethod,
        email,
      }).unwrap();

      toast.success(result.message || 'Order placed successfully!');
      toast.info(`Payment Phone: ${result.data.paymentPhone}`);
      setShowOrderForm(false);
      
      // Optionally redirect to orders page or show order details
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to place order');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors">
      {/* Header with Valorem brand */}
      <div className="pl-5 pr-4 py-5">
        <button
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors cursor-pointer"
        >
          Valorem
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Course Image */}
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = COURSE_DETAIL_PLACEHOLDER;
              }}
            />
          </div>

          {/* Course Info */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full mb-2 transition-colors">
                {course.category}
              </span>
              <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{course.name}</h1>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">{course.description}</p>
            </div>

            <div className="border-t pt-6">
              <div className="text-3xl font-bold text-green-600 mb-4">
                ${course.price}
              </div>
              
              {!showOrderForm ? (
                <div className="space-y-3">
                  {/* Show Watch Course button if user owns the course */}
                  {userInfo && userOwnsCourse && (
                    <Link to={`/courses/${id}/watch`} className="w-full">
                      <Button 
                        className="w-full text-lg py-3"
                        size="lg"
                      >
                        🎥 Watch Course
                      </Button>
                    </Link>
                  )}
                  
                  {/* Show Purchase button if user doesn't own the course */}
                  {(!isAuthenticated || !userOwnsCourse) && (
                    <Button 
                      onClick={() => {
                        // Wait for loading to complete before checking auth
                        if (isUserLoading) {
                          toast.info('Loading user data...');
                          return;
                        }
                        
                        // Check if user is authenticated after loading
                        if (!isAuthenticated || !userInfo) {
                          toast.error('Please login to purchase courses');
                          navigate('/login');
                          return;
                        }
                        
                        setShowOrderForm(true);
                      }}
                      className="w-full text-lg py-3"
                      size="lg"
                      variant={userOwnsCourse ? "outline" : "default"}
                      disabled={isUserLoading}
                    >
                      {isUserLoading ? "Loading..." : userOwnsCourse ? "Already Purchased" : "Purchase Course"}
                    </Button>
                  )}

                  {/* Show course ownership status */}
                  {userInfo && userOwnsCourse && (
                    <div className="text-center text-sm text-green-600 font-medium">
                      ✅ You own this course
                    </div>
                  )}
                </div>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Complete Your Purchase</CardTitle>
                    <CardDescription>
                      Please provide your email and select a payment method
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePurchase} className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="paymentMethod" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                          Payment Method *
                        </label>
                        <select
                          id="paymentMethod"
                          value={paymentMethod}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                          required
                        >
                          <option value="">Select payment method</option>
                          <option value="credit_card">Credit Card</option>
                          <option value="paypal">PayPal</option>
                          <option value="bank_transfer">Bank Transfer</option>
                          <option value="vfc">VFC</option>
                          <option value="insta_pay">InstaPay</option>
                        </select>
                      </div>

                      {/* VFC Payment Details */}
                      {paymentMethod === 'vfc' && (
                        <div className="hidden sm:block bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4 transition-colors">
                          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">
                            {t('payment.vfc.title')}
                          </h3>
                          <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                            {t('payment.vfc.instruction')}
                          </p>
                          <div className="bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-600 rounded-md p-3 flex items-center justify-between transition-colors">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-mono font-bold text-gray-800 dark:text-gray-200">
                                01033909895
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                navigator.clipboard.writeText('01033909895');
                                toast.success(t('payment.vfc.copied'));
                              }}
                              className="text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors"
                            >
                              📋 {t('payment.vfc.copy')}
                            </Button>
                          </div>
                          <div className="mt-3 text-xs text-blue-600 dark:text-blue-400">
                            <p>💡 {t('payment.vfc.tip')}</p>
                          </div>
                        </div>
                      )}

                      {/* Mobile VFC Payment Details */}
                      {paymentMethod === 'vfc' && (
                        <div className="sm:hidden bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3 transition-colors">
                          <h3 className="text-base font-semibold text-blue-800 dark:text-blue-200 mb-2">
                            {t('payment.vfc.title')}
                          </h3>
                          <p className="text-xs text-blue-700 dark:text-blue-300 mb-2">
                            {t('payment.vfc.instruction')}
                          </p>
                          <div className="bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-600 rounded-md p-2 transition-colors">
                            <div className="flex flex-col space-y-2">
                              <span className="text-base font-mono font-bold text-gray-800 dark:text-gray-200 text-center">
                                01033909895
                              </span>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText('01033909895');
                                  toast.success(t('payment.vfc.copied'));
                                }}
                                className="w-full text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors text-xs"
                              >
                                📋 {t('payment.vfc.copy')}
                              </Button>
                            </div>
                          </div>
                          <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                            <p>💡 {t('payment.vfc.tip')}</p>
                          </div>
                        </div>
                      )}
                      

                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          disabled={isPlacingOrder}
                          className="flex-1"
                        >
                          {isPlacingOrder ? 'Processing...' : 'Place Order'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowOrderForm(false)}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>

        {/* Course Content Preview */}
        {course.videos && course.videos.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Course Content</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {course.videos.map((_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">Lesson {index + 1}</span>
                      <span className="text-sm text-gray-500">Video</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default CourseDetailPage;