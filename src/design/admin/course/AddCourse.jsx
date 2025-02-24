import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateCourseMutation } from '@/feature/api/courseApi.js'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddCourse = () => {

    const navigate = useNavigate();
    const [courseTitle, setCourseTitle] = useState("")
    const [category, setCategory] = useState("");
    const [createCourse, { data, isSuccess, isLoading, error }] = useCreateCourseMutation();
    const getSelectedCategory = (value) => {
        setCategory(value)
    }
    const createCourseHanlder = async () => {
        await createCourse({ courseTitle, category })
    }
    //for displaying messages...
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message)
            navigate("/admin/course")
        }
        if (error) {
            console.error(error) 
            toast.error(error?.data?.message)
        }
    }, [isSuccess, error])

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
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            type="text"
                            placeholder="Your Course Name" />
                    </div>
                    <div>
                        <Label>Category</Label>
                        <Select onValueChange={getSelectedCategory}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent  >
                                <SelectGroup>
                                    <SelectLabel>Select</SelectLabel>
                                    <SelectItem value="nextjs">NextJs</SelectItem>
                                    <SelectItem value="reactjs">ReactJs</SelectItem>
                                    <SelectItem value="html-css">Html/Css</SelectItem>
                                    <SelectItem value="rust">Rust</SelectItem>
                                    <SelectItem value="docker">Docker</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className='flex gap-2'>
                        <Button onClick={() => navigate("/admin/course")} variant="outline">Cancel</Button>
                        <Button onClick={createCourseHanlder} disabled={isLoading}>{
                            isLoading ? (<><Loader2 className=' w-4 h-4 animate-spin' />Please wait...</>) : "Create"
                        }</Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddCourse