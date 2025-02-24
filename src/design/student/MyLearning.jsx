import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import Course from './Course';

const MyLearning = ({course}) => {
    const isLoading =false;
    const myLearningCourses = [];
    return (
        <div className='mx-auto max-w-4xl my-24 p-4 md:p-0'>
            <h1 className='font-bold text-2xl mb-5'>MY Learning</h1>
            {isLoading ? (<div className='grid grid-cols-1 md:grid-cols-2 gap-16 p-16 '>
                {
                    [1, 2,3].map((_, index) => <MyLearningSkeleton key={index} />)
                }

            </div>) : (
                myLearningCourses.length === 0 ? (<p>Your havn't enrolled in any course.</p>) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-16 p-16'>{
                        [1, 2,3].map((course, index) => <Course key={index} course={course} />)} </div>
                )
            )}
        </div>
    )
}

export default MyLearning

const MyLearningSkeleton = () => {
    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden mx-auto w-[300px] h-72">
            <Skeleton className="w-full h-40" />
            <div className="px-5 py-4 space-y-3">
                <Skeleton className="h-5 w-1/2" />
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