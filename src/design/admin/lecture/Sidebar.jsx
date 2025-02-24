import React from 'react'
import { ChartNoAxesColumn,SquareLibrary } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'


const Sidebar = () => {
    return (
   <div className='flex'>
         <div className=' hidden md:block w-[250px] space-y-8 p-5 bg-gray-100 h-screen sticky top-0'>
          <div className='my-20 space-y-4'>
          <Link to={"dashboard"} className='flex items-center gap-3'>               
                    <ChartNoAxesColumn />
                    <span>Dashboard</span>           
            </Link>
             <Link to={"course"} className='flex items-center gap-3'>               
                    <SquareLibrary />
                    <span>Course</span>          
            </Link>
          </div>
        </div>
      <div className='flex-1 p-10 mt-16'>
      <Outlet/>
      </div>
   </div>
    )
}

export default Sidebar