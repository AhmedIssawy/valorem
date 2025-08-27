import React from 'react';
import { Link } from 'react-router-dom';
import { useGetCoursesQuery } from '../app/api/coursesApiSlice';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { COURSE_IMAGE_PLACEHOLDER } from '../utils/placeholderImage';

interface Course {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const CoursesPage: React.FC = () => {
  const { data: coursesData, isLoading, error } = useGetCoursesQuery({ page: 1, limit: 20 });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading courses...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Error loading courses</div>
      </div>
    );
  }

  const courses = coursesData?.data || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-4">Our Courses</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
          Discover our comprehensive collection of courses designed to help you master new skills and advance your career.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course: Course) => (
          <Card key={course._id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = COURSE_IMAGE_PLACEHOLDER;
                  }}
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-4">
              <div className="mb-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {course.category}
                </span>
              </div>
              <CardTitle className="text-lg mb-2 line-clamp-2">{course.name}</CardTitle>
              <CardDescription className="text-2xl font-bold text-green-600">
                ${course.price}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Link to={`/courses/${course._id}`} className="w-full">
                <Button className="w-full">View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No courses available</h3>
          <p className="text-gray-600">Check back later for new courses!</p>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;