

import React from 'react'
import Course from './Course'
import { Skeleton } from '@/components/ui/skeleton';
import { useGetPublishedCourseQuery, usePublishCourseMutation } from '@/feature/api/courseApi';

const Courses = () => {
const  {data , isLoading  , error} = useGetPublishedCourseQuery();
if(error) return <h1>Some Error occurred while feching..</h1>
    return (
        <div className='bg-gray-50'>
            <div className='mx-auto max-w-7xl min-h-screen items-center text-center p-16 md:p-0'>
                <h1 className=' font-bold text-3xl p-6'>Our Courses</h1>
                <div className=' grid grid-cols-1 md:grid-cols-4 gap-12 mx-auto  '>
                    {
                        isLoading ? (
                            Array.from({ length: 8 }).map((_, index) => (
                                <CourseSkeleton key={index} />
                            ))
                        ) : (
                            data?.courses && data.courses.map((course, index)=> <Course key={index} course={course}/>)
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Courses

const CourseSkeleton = () => {
    return (
        <div className="bg-white shadow-md  hover:shadow-lg transition-shadow rounded-lg overflow-hidden mx-auto">
            <Skeleton className="w-full h-36" />
            <div className="px-5 py-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="h-4 w-1/4" />
            </div>
        </div>
    );
};

