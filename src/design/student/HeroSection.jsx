import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("");
    const searchHandler = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            navigate(`/course/search?query=${searchQuery}`)  // in eearch query should be mentioned.
        }
        setSearchQuery("")
    }
    return (
        <div className="relative w-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-16 px-4 text-center">
            <div className="max-w-3xl mx-auto mt-5  ">
                <h1 className='text-4xl text-white mb-4 font-bold '>
                    Find the best courses for you
                </h1>
                <p className='text-white mb-8'> Discover, Learn and Upskill with our wide range of courses</p>
                <form onSubmit={searchHandler} className='mb-4 flex items-center bg-transparent dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto'>
                    <Input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-white rounded-l-full border-non flex-grow focus-visible:ring-0 px-6 py-3 text-gray-900  dark:text-gray-100  placeholder:gray-400 dark:placeholder:gray-500  "
                        placeholder="Search Courses"
                    />
                    <Button type="submit" className="rounded-r-full bg-blue-600 hover:bg-blue-500 ">Search</Button>
                </form>
                <Button className="rounded-full bg-white hover:bg-gray-200 text-blue-600 dark:text-gray-100">Explore Courses</Button>
            </div>
        </div>
    );
};

export default HeroSection;
