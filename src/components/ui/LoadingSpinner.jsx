import { Loader } from 'lucide-react'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className='mx-auto flex flex-col justify-center items-center min-h-screen bg-gray-100'>
        <Loader className='w-20 h-20 animate-spin text-blue-600 '/>
        <h1 className='font-medium text-blue-600 mt-4'>Loading, please Wait...</h1>
    </div>
  )
}

export default LoadingSpinner