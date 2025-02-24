import BuyCourseButton from '@/components/BuyCourseButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Separator } from '@/components/ui/separator';
import { useGetCourseDetailWithPurchaseStatusQuery } from '@/feature/api/purchaseApi';
import { Lock, PlayCircle } from 'lucide-react';
import React from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';

const CourseDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const courseId = params.courseId;


  // Pass courseId to the hook
  const { data, isLoading, isError } = useGetCourseDetailWithPurchaseStatusQuery(courseId);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <h1>Failed to load course details.</h1>;

  // Safely destructure data
  const { course, purchased } = data || {};

  const continueCourseHandler = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`)
    }
  }

  return (
    <div className='mt-16 space-y-5 min-h-screen'>
      <div className='text-white bg-red-900'>
        <div className='mx-auto max-w-7xl p-4 space-y-1'>
          <h1 className='font-bold text-3xl'>{course?.courseTitle || 'Course Title'}</h1>
          <p className='text-xl'>{course?.courseSubTitle || "No Subtitle"}</p>
          <p>Created By <span className='underline italic'>{course?.creator?.name || 'Unknown'}</span></p>
          <p>Students enrolled: {course?.enrolledStudents?.length || 0}</p>
        </div>
      </div>
      <div className='mx-auto max-w-7xl flex flex-col md:flex-row gap-10 justify-between px-5 my-5 md:px-8'>
        <div className='w-full md:1/2 space-y-3'>
          <h1 className='font-bold text-2xl'>Description</h1>
          {/* use rich text editor feature using dangerouslySetInnerHTML tag */}
          <p className='text-sm font-normal' dangerouslySetInnerHTML={{ __html: course?.description }} />
          <Card>
            <CardHeader>
              <CardTitle>Course Content</CardTitle>
              <CardDescription>{course?.lectures?.length || 0} Lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {course.lectures.map((lecture, index) => (
                <div key={index} lecture={lecture} className='flex items-center gap-4'>
                  <span>
                    {lecture?.isFree ? (<PlayCircle size={16} />) : (<Lock size={16} />)}
                  </span>
                  <h1>{lecture.lectureTitle || 'Lecture Title'}</h1>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className='w-full md:1/2 flex justify-center'>
          <div className='w-1/2'>
            <Card>
              <CardContent className="p-4 flex flex-col">
                <div className='aspect-video mb-4 w-full'>
                  <ReactPlayer
                    height={"100%"}
                    width={"100%"}
                    url={course?.lectures[0].videoUrl}
                    controls={true}
                  />
                </div>
                <h1 className='font-bold'>{course?.lectures[0].lectureTitle || 'Lecture Title'}</h1>
                <Separator className="mb-1" />
                <h1 className='font-bold text-xl'>₹{course?.coursePrice || 0}</h1>
              </CardContent>
              <CardFooter className="flex justify-center p-6">
                {purchased ? (
                  <Button onClick={continueCourseHandler} className="bg-orange-600">Continue Course</Button>
                ) : (
                  <BuyCourseButton courseId={courseId} />
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
