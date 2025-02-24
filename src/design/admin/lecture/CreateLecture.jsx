
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useCreateLectureMutation, useGetCourseLectureQuery } from '@/feature/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import Lecture from './Lecture'

const CreateLecture = () => {
    const params = useParams();
    const courseId = params.courseId;
    const navigate = useNavigate();
    const [lectureTitle, setLectureTitle] = useState("")
    const [createLecture, { data, isSuccess, isLoading, error }] = useCreateLectureMutation();

    const { data: lectureData, isLoading: lectureIsLoading, isError: lectureError ,refetch } = useGetCourseLectureQuery(courseId);
    const createLectureHandler = async () => {
        await createLecture({ lectureTitle, courseId })
    }

    // for displaying messages...
    useEffect(() => {
        if (isSuccess) {
            refetch();
            toast.success(data?.message)
        }
        if (error) {
            console.error(error)
            toast.error(error?.data?.message)
        }
    }, [isSuccess, error])

    console.log(lectureData);


    return (
        <div>
            <div className='flex-1  max-h-screen dark:bg-gray-800 '>
                <div className=' flex flex-col gap-3'>
                    <h1 className='font-bold'>Lets add course , add some basic details for your new course</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur.</p>
                </div>
                <div className='flex flex-col gap-3 '>
                    <div>
                        <Label>Title</Label>
                        <Input
                            value={lectureTitle}
                            onChange={(e) => setLectureTitle(e.target.value)}
                            type="text"
                            placeholder="Your Lecture Name" />
                    </div>
                    <div className='flex gap-2'>
                        <Button onClick={() => navigate(`/admin/course/${courseId}`)} variant="outline">Back to course</Button>
                        <Button onClick={createLectureHandler} disabled={isLoading}>{
                            isLoading ? (<><Loader2 className=' w-4 h-4 animate-spin' />Please wait...</>) : "Create Lecture"
                        }</Button>
                    </div>
                </div>
                <div className='mt-10 space-y-2'>
                    {
                        lectureIsLoading ? (
                            <p><LoadingSpinner /></p>
                        ) : lectureError ? (
                            <P>Failed to load Lectures.</P>
                        ) : lectureData.lectures.length === 0 ? (
                            <p>No lectures avilable.</p>
                        ) : lectureData.lectures.map((lecture, index) => (
                            <Lecture key={lecture._id} lecture={lecture} index={index} courseId= {courseId} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateLecture