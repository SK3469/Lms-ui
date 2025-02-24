import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import LectureTab from './LectureTab'

const EditLecture = () => {
  const params = useParams();
  const {courseId}= params;
  return (
   <div>
    <div className='flex  gap-3'>
      <Link to={`/admin/course/${courseId}/lecture`}>
      <Button size='icon' variant='outline' className="rounded-full" >
        <ArrowLeft/>
        </Button>
        </Link>
        <h1 className='font-bold text-2xl'>Update Your Lecture</h1>
    </div>
 <LectureTab/>

   </div>
  )
}

export default EditLecture