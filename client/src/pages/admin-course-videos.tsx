import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCourseByIdQuery } from '../app/api/coursesApiSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { toast } from 'react-toastify';

const AdminCourseVideosPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [videoUrl, setVideoUrl] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const { data: courseData, isLoading, refetch } = useGetCourseByIdQuery(id!);

  const course = courseData?.data;

  const addVideo = async () => {
    if (!videoUrl.trim()) {
      toast.error('Please enter a video URL');
      return;
    }

    setIsAdding(true);
    try {
      const response = await fetch(`/api/admin/courses/${id}/videos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ videoUrl: videoUrl.trim() }),
      });

      if (response.ok) {
        await response.json();
        toast.success('Video added successfully!');
        setVideoUrl('');
        refetch();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to add video');
      }
    } catch (error) {
      toast.error('Failed to add video');
    } finally {
      setIsAdding(false);
    }
  };

  const removeVideo = async (videoIndex: number) => {
    try {
      const response = await fetch(`/api/admin/courses/${id}/videos`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ videoIndex }),
      });

      if (response.ok) {
        toast.success('Video removed successfully!');
        refetch();
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to remove video');
      }
    } catch (error) {
      toast.error('Failed to remove video');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading course...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Course not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Manage Course Videos</h1>
          <p className="text-gray-600">Course: {course.name}</p>
        </div>

        {/* Add Video Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Video</CardTitle>
            <CardDescription>
              Add a video URL from Cloudflare R2, YouTube, or any direct video link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="videoUrl" className="block text-sm font-medium mb-2">
                  Video URL
                </label>
                <input
                  type="url"
                  id="videoUrl"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://0304a825db1f41fe8299eb33eaf219fc.r2.cloudflarestorage.com/valorem/lesson1.mp4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Supported URL Formats:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Your R2 Bucket: https://0304a825db1f41fe8299eb33eaf219fc.r2.cloudflarestorage.com/valorem/video.mp4</li>
                  <li>• YouTube: https://www.youtube.com/watch?v=VIDEO_ID</li>
                  <li>• Direct MP4: https://any-domain.com/video.mp4</li>
                </ul>
              </div>

              <Button 
                onClick={addVideo}
                disabled={isAdding || !videoUrl.trim()}
                className="w-full"
              >
                {isAdding ? 'Adding Video...' : 'Add Video'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Videos */}
        <Card>
          <CardHeader>
            <CardTitle>Current Videos ({course.videos?.length || 0})</CardTitle>
            <CardDescription>
              Manage existing course videos
            </CardDescription>
          </CardHeader>
          <CardContent>
            {course.videos && course.videos.length > 0 ? (
              <div className="space-y-4">
                {course.videos.map((video: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">Lesson {index + 1}</div>
                      <div className="text-sm text-gray-500 break-all">{video}</div>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeVideo(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="mb-4">No videos added yet</p>
                <p className="text-sm">Add your first video using the form above</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Start Guide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>🚀 Quick Start Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-semibold">1. Upload to Your R2 Bucket:</h4>
                <p className="text-gray-600">Upload videos to: https://0304a825db1f41fe8299eb33eaf219fc.r2.cloudflarestorage.com/valorem/</p>
              </div>
              <div>
                <h4 className="font-semibold">2. Your Video URLs Will Be:</h4>
                <p className="text-gray-600">https://0304a825db1f41fe8299eb33eaf219fc.r2.cloudflarestorage.com/valorem/your-video.mp4</p>
              </div>
              <div>
                <h4 className="font-semibold">3. Add to Course:</h4>
                <p className="text-gray-600">Paste the URL in the form above and click "Add Video"</p>
              </div>
              <div>
                <h4 className="font-semibold">4. Test:</h4>
                <p className="text-gray-600">Purchase the course and visit /courses/{id}/watch to test</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminCourseVideosPage;