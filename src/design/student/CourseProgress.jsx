import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { useCompleteCourseMutation, useGetCourseProgressQuery, useInCompleteCourseMutation, useUpdateLectureProgressMutation } from '@/feature/api/courseProgressApi'
import { CheckCircle, CheckCircle2, CirclePlay } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  // const isCompleted = true;
  const { data, isLoading, isError, refetch } = useGetCourseProgressQuery(courseId);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [updateLectureProgress] = useUpdateLectureProgressMutation()
  const [completeCourse,
    { data: markAsCompletedData,
      isSuccess: completedIsSuccess,
      error: completedError }] = useCompleteCourseMutation(courseId)
  const [inCompleteCourse,
    { data: markAsIncompletedData,
      isSuccess: incompletedIsSuccess,
      error: incompletedError }] = useInCompleteCourseMutation(courseId);

  useEffect(() => {
    if (completedIsSuccess) {
      refetch();
      toast.success(markAsCompletedData?.message)
    }
  }, [refetch,
    completedIsSuccess,
  ])
  useEffect(() => {
    if (incompletedIsSuccess) {
      refetch();
      toast.success(markAsIncompletedData?.message)
    }
  }, [refetch,
    incompletedIsSuccess
  ])
  if (isLoading) {
    return <h1>Processing...</h1>;
  }

  if (isError) {
    return <h1>Failed to load course details.</h1>;
  }

  const { courseDetails, progress, completed } = data?.data || {};
  const { courseTitle, lectures } = courseDetails || {};
  console.log(lectures)
  const initialLecture = currentLecture || lectures?.[0];

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed)
  }
  const lectureProgressHandler = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId })
    refetch();
  }
  //handle select to specific lecture watch
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    lectureProgressHandler(lecture._id);
  }


  const completeCourseHandler = async () => {
    await completeCourse(courseId);
  }
  const inCompleteCourseHandler = async () => {
    await inCompleteCourse(courseId);
  }

  return (
    <div className='max-w-7xl mx-auto p-4 mt-16'>
      {/* Display course name */}
      <div className='flex justify-between mb-4'>
        <h1 className='font-bold text-2xl'>{courseTitle}</h1>
        <Button onClick={completed ? inCompleteCourseHandler :
          completeCourseHandler}>
          {
            completed ?
              <div className='flex justify-center items-center gap-2'>
                <CheckCircle />
                <span>Completed</span>
              </div> : "Mark as completed"
          }
        </Button>
      </div>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4'>
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture?.videoUrl}
              controls
              onPlay={() => lectureProgressHandler(currentLecture._id || initialLecture._id)}
              className='w-full h-auto md:rounded-lg'
            />
          </div>
          <h3 className='font-medium text-lg mt-2'>
            {/* {`Lecture: ${currentLecture?.lectureTitle || initialLecture?.lectureTitle}`} */}
            {
              `Lecture ${lectures.findIndex((lec) => lec._id === (currentLecture?._id ||
                initialLecture._id
              )) + 1}:${currentLecture?.lectureTitle || initialLecture.lectureTitle}`
            }
          </h3>
        </div>
        <div className='flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0'>
          <h2 className='font-semibold text-xl mb-4'>Course Lectures</h2>
          <div className='flex-1 overflow-y-auto'>
            {lectures?.map((lecture) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer hover:bg-gray-200 transition-transform ${lecture._id === currentLecture?._id ? 'bg-gray-200' : null}`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className='flex items-center'>
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 size={24} className='text-green-500 mr-2' />
                    ) : (
                      <CirclePlay size={24} className='text-gray-500 mr-2' />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {
                    isLectureCompleted(lecture._id) && (<Badge className="bg-green-100 text-green-500" variant='outline'>
                      Completed
                    </Badge>)
                  }
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
