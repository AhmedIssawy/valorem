import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetCourseByIdQuery, useGetCourseVideosQuery } from '../app/api/coursesApiSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

interface CourseDetail {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const CourseWatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Get user info using the auth hook with localStorage
  const { isAuthenticated, user: userInfo } = useAuth();

  const { data: courseData, isLoading: isCourseLoading, error: courseError } = useGetCourseByIdQuery(id!);
  const { data: videosData, isLoading: isVideosLoading, error: videosError, refetch } = useGetCourseVideosQuery(id!, {
    skip: !isAuthenticated, // Skip if user is not logged in
  });

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    toast.error('Please login to access courses');
    navigate('/login');
    return null;
  }

  if (isCourseLoading || isVideosLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading course content...</div>
      </div>
    );
  }

  // Handle access denied (user doesn't own the course)
  if (videosError && 'status' in videosError && videosError.status === 403) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8">
            <h1 className="text-2xl font-bold text-red-800 mb-4">Access Denied</h1>
            <p className="text-red-600 mb-6">
              You don't have access to this course. Please purchase it first to watch the content.
            </p>
            <div className="space-x-4">
              <Button onClick={() => navigate(`/courses/${id}`)}>
                View Course Details
              </Button>
              <Button variant="outline" onClick={() => navigate('/courses')}>
                Browse All Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (courseError || videosError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Error loading course content</div>
      </div>
    );
  }

  const course: CourseDetail = courseData.data;
  const videoData = videosData?.data;
  const signedVideoUrl = videoData?.videoUrl;
  const expiresIn = videoData?.expiresIn;

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Course not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/courses')}
              size="sm"
            >
              ← Back to Courses
            </Button>
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
              {course.category}
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">{course.name}</h1>
          <p className="text-gray-600">{course.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  Course Video
                </CardTitle>
                {expiresIn && (
                  <CardDescription className="text-orange-600">
                    🔒 Secure video access expires in {Math.floor(expiresIn / 60)} minutes
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {signedVideoUrl ? (
                  <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                    <video
                      src={signedVideoUrl}
                      controls
                      className="w-full h-full"
                      controlsList="nodownload"
                      onError={() => {
                        toast.error('Video access expired. Refreshing...');
                        refetch();
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ) : (
                  <div className="aspect-video w-full bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-gray-500 mb-4">Loading secure video...</p>
                      <Button onClick={() => refetch()} variant="outline">
                        Retry Loading
                      </Button>
                    </div>
                  </div>
                )}

                {/* Video Info */}
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">🔐 Secure Video Streaming</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Video URL expires in 5 minutes for security</li>
                    <li>• Direct download is disabled</li>
                    <li>• Access is verified for course owners only</li>
                    <li>• Video will auto-refresh if expired</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Course Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>
                  Secure video streaming
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-2">Course</h4>
                    <p className="font-medium">{course.name}</p>
                    <p className="text-sm text-gray-500">{course.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-2">Category</h4>
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm text-gray-600 mb-2">Video Access</h4>
                    <div className="text-sm space-y-1">
                      <p className="text-green-600">✅ Access granted</p>
                      <p className="text-orange-600">🔒 Secure streaming</p>
                      <p className="text-blue-600">⏱️ Auto-refresh on expiry</p>
                    </div>
                  </div>

                  {videoData && (
                    <div>
                      <h4 className="font-semibold text-sm text-gray-600 mb-2">Session Info</h4>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>Expires in: {Math.floor(expiresIn / 60)}m {expiresIn % 60}s</p>
                        <p>Course ID: {videoData.courseId}</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t">
                    <Button 
                      onClick={() => refetch()} 
                      variant="outline" 
                      className="w-full"
                      disabled={isVideosLoading}
                    >
                      {isVideosLoading ? 'Refreshing...' : 'Refresh Video Access'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseWatchPage;