import { Badge } from '@/components/ui/badge'
import React from 'react'
import { Link } from 'react-router-dom'

const SearchResult = ({ course }) => {
  const courseId = "asdf"

  return (
    <div className='flex flex-col md:flex-row md:items-center items-start border-gray-300 py-4 gap-4'>
      <Link to={`/course-details/${courseId}`} className=''>
        <img src=""
          alt=""
          className='h-32 w-full md:w-56 bg-green-500 object-cover rounded'
        />
      </Link>
      <div className='flex flex-col gap-1'> 
        <h1 className='font-bold text-xl'>CourseTitle</h1>
        <p className='text-gray-500 text-sm'> subtitle</p>
        <h1 className='text-gray-500 text-sm'>Instructor:<span className='font-bold text-black'>Sunil MernStack</span></h1>
        <Badge className={'w-fit px-2 py-1'}>Medium</Badge>
      </div>
    </div>
  )
}

export default SearchResult