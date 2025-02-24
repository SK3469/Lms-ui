import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import Course from './Course'
import { useLoadUserQuery, useUpdateUserMutation } from '@/feature/api/authApi'
import { toast } from 'sonner'

const Profile = () => {
    const [name, setName] = useState("");
    const [profilePhoto, setProfilePhoto] = useState("")

    const { data, isLoading, refetch } = useLoadUserQuery();
    const [updateUser,
        { data: updateUserData,
            isLoading: updateUserIsLoading,
            isError,
            error,
            isSuccess }] = useUpdateUserMutation();

    const onChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) setProfilePhoto(file);
    };

    const updateUserHandler = async (e) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("profilePhoto", profilePhoto)
        await updateUser(formData)
    };

    useEffect(() => {
        refetch();
    }, [])
    
    useEffect(() => {
        if (isSuccess) {
            refetch()
            toast.success(data.message || "Profile Updated.")
        }
        if (isError) {
            toast.error(error.message || "Updated Failed")
        }
    }, [error, updateUserData, isSuccess])

    if (isLoading) return <h1>Profile Loading...</h1>
    const user = data && data?.user;

    return (
        <div className='mx-auto max-w-4xl px-6 my-24'>
            <h1 className='flex justify-center md:justify-start  font-bold text-3xl mb-5'>Profile</h1>
            <div className='flex justify-center md:justify-start items-center'>
                <div className='flex gap-4 md:flex-row flex-col'>

                    <div className='flex justify-center'>
                        <Avatar className="h-32 w-32">
                            <AvatarImage className="object-cover" src={user?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='flex gap-3 flex-col'>
                        <h1 className='font-bold'>Name:<span className='font-normal ml-2 text-gray-900 dark:text-gray-50'>{user.name}</span></h1>
                        <h1 className='font-bold'>Email:<span className='font-normal ml-3 text-gray-900 dark:text-gray-50'>{user.email}</span></h1>
                        <h1 className='font-bold'>Role:<span className='ml-5 text-gray-900 dark:text-gray-50'>{user.role.toUpperCase()}</span></h1>
                        <div className='mt-2'>
                            <Dialog className=" relative">
                                <DialogTrigger asChild>
                                    <Button className="p-2 text-sm">Edit Profile</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle >Edit Profile</DialogTitle>
                                        <DialogDescription >
                                            Make Changes to your profile simply with fill your detail here.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className='grid gap-4 py-4' >
                                        <div className='grid grid-cols-4 items-center gap-4 '>
                                            <Label>Your Name</Label>
                                            <Input
                                                type="text"
                                                className="col-span-3"
                                                placeholder="Sunil Kumar"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className='grid grid-cols-4 items-center gap-4 '>
                                            <Label>Profile Picture</Label>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                className="col-span-3"
                                                onChange={onChangeHandler}
                                            />
                                        </div>

                                    </div>
                                    <Separator className="mb-1" />
                                    <DialogFooter className="w-full">

                                        <Button onClick={updateUserHandler} className="w-[30%] flex justify-end" disabled={updateUserIsLoading}>
                                            {
                                                updateUserIsLoading ? (<><Loader2 className='w-4 h-4 animate-spin mr-2' /> Please Wait </>) : ("Save Changes")
                                            }
                                        </Button>

                                    </DialogFooter>
                                </DialogContent>

                            </Dialog>

                        </div>
                    </div>

                </div>

            </div>
            <div className='mt-10  flex items-center md:justify-start flex-col  '>
                <h1 className='font-bold text-3xl flex '>Courses you are enrolled in</h1>
                <div className='grid grid-cols-1 md:grid-cols-2 mt-2 md:pl-60 gap-10'>
                    {
                        user.enrolledCourses.length === 0 ? (<h1 className=' text-red-700'>Your haven't purchase any course.</h1>
                        ) : (
                            user.enrolledCourses.map((course) => <Course course={course} key={course._id} />)
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile

