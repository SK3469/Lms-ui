import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Link } from 'react-router-dom'

const Course = ({course}) => {
    return (

       <Link to ={`/course-detail/${course._id}`}>
        <Card className=" w-full overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-150">
            <div className='relative'>
                <img src={course.courseThumbnail}
                    className='h-36 w-full object-cover ' />
            </div>
            <CardContent className="px-4 py-4 space-y-2">
                <h1 className='font-bold text-2xl truncate text-center mb-2'>{course.courseTitle}</h1>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Avatar className="h-8 w-8 ">
                            <AvatarImage src={course.creator?.photoUrl||"https://github.com/shadcn.png"} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className='font-medium text-sm '>{course.creator?.name}</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-600 text-white dark:bg-gray-800  rounded-full">{course.courseLevel ||"NA"}</Badge>
                </div>
                <div className='text-left font-extrabold '>
                    <span> ₹{course.coursePrice || "FREE"}</span>
                </div>
            </CardContent>
        </Card></Link>

    )
}

export default Course