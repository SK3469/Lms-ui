import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Lecture = ({ lecture, courseId, index }) => {
    const navigate = useNavigate();
    return (
        <div className='flex justify-between items-center bg-gray-50 p-2 rounded-xl  '>
            <h1 className='font-bold '>Lecture - {index + 1}: {lecture.lectureTitle}</h1>
            <Edit
                onClick={() => navigate(`${lecture._id}`)}
                className=' cursor-pointer text-gray-600 dark:bg-gray-50 hover:text-blue-600' />
        </div>
    )
}

export default Lecture