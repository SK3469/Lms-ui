import { Button } from '@/components/ui/button'
import React from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CourseTab from './CourseTab'

const EditCourse = () => {
   const  navigate= useNavigate()
  return (
    <div className=' flex-1'>
        <div className='flex justify-between'>
            <h1 className='font-bold text-xl'>Add details information regarding course</h1>
            
            <Button onClick={()=>navigate(`lecture`)} variant="link">Go to lectures page</Button>
        </div>
       <CourseTab/>
    </div>
  )
}

export default EditCourse