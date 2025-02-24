import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEditCourseMutation, useGetCourseByIdQuery, usePublishCourseMutation, useRemoveCourseMutation } from '@/feature/api/courseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

const CourseTab = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        courseTitle: "",
        subTitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: ""
    });
    const params = useParams();
    const courseId = params.courseId;
    const { data: getCourseByIdData, isLoading: getCourseByIdLoading, refetch } = useGetCourseByIdQuery(courseId);
    useEffect(() => {
        if (getCourseByIdData?.course) {
            const course = getCourseByIdData?.course;
            setInput({
                courseTitle: course.courseTitle,
                subTitle: course.subTitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: "",
            });
        }
    }, [getCourseByIdData])
    const [previewThumbnail, setPreviewThumbnail] = useState("");
    const [editCourse, { data, isSuccess, isLoading, error }] = useEditCourseMutation();
    const [publishCourse] = usePublishCourseMutation();
    const [removeCourse, { isSuccess: removerCourseIsSuccess, refetch:removeCourseRefetch }] = useRemoveCourseMutation(courseId)
    const removeCourseHanlder = () => {
        removeCourse(courseId);
        navigate("/admin/course");
    }
    // useEffect(() => {
    //     if (removerCourseIsSuccess) {
    //         toast.success(removeCourse?.message || "Removed course successfully")         
    //     }
    // }, [refetch,removeCourse])
    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    };

    const selectCategory = (value) => {
        setInput({ ...input, category: value });
    };

    const selectCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value });
    };

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader();
            fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    };

    const updateCourseHandler = async () => {
        if (!input.courseTitle || !input.category) {
            toast.error("Please fill in all required fields");
            return;
        }

        const formData = new FormData();
        formData.append("description", input.description);
        formData.append("subTitle", input.subTitle);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);
        formData.append("courseTitle", input.courseTitle);
        formData.append("courseThumbnail", input.courseThumbnail);

        await editCourse({ formData, courseId });
    };

    const publishStatusHandler = async (action) => {
        try {
            const response = await publishCourse({ courseId, query: action });
            if (response.data) {
                refetch();
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course updated successfully!");
        }
        if (error) {
            toast.error(error?.data?.message || "Course update failed!");
        }
    }, [isSuccess, error]);

    if (getCourseByIdLoading) return <LoadingSpinner />

    return (
        <Card className="mt-5">
            <CardHeader className="flex flex-row justify-between items-center">
                <div>
                    <CardTitle>Basic Course Information</CardTitle>
                    <CardDescription>Make changes to your course here. Click save when you're done.</CardDescription>
                </div>
                <div className="space-x-3">
                    <Button disabled={getCourseByIdData?.course.lectures.length === 0} variant="outline" onClick={() => publishStatusHandler(getCourseByIdData?.course.isPublished ? "false" : "true")}>
                        {getCourseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button onClick={removeCourseHanlder} className="bg-blue-600" disabled={isLoading}>
                        {isLoading ? <><Loader2 className="animate-spin" /> Please Wait...</> : "Remove Course"}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 mt-3">
                <div>
                    <Label>Title</Label>
                    <Input
                        onChange={changeEventHandler}
                        value={input.courseTitle}
                        type="text"
                        name="courseTitle"
                        placeholder="Write course title..." />
                </div>
                <div>
                    <Label>Subtitle</Label>
                    <Input
                        onChange={changeEventHandler}
                        value={input.subTitle}
                        type="text"
                        name="subTitle"
                        placeholder="Write course subtitle..." />
                </div>
                <div>
                    <Label>Description</Label>
                    <RichTextEditor input={input} setInput={setInput} />
                </div>
                <div className="flex items-center gap-3">
                    <div>
                        <Label>Category</Label>
                        <Select onValueChange={selectCategory}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder={input.category || "Select a category"} />
                            </SelectTrigger>
                            <SelectContent>
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
                    <div>
                        <Label>Course Level</Label>
                        <Select onValueChange={selectCourseLevel}>
                            <SelectTrigger className="w-[180px]">
                                {/* //this input should be filled  */}
                                <SelectValue placeholder={input.courseLevel || "Select a level"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Level</SelectLabel>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Advance">Advance</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Price (INR)</Label>
                        <Input
                            type="number"
                            name="coursePrice"
                            value={input.coursePrice}
                            onChange={changeEventHandler}
                            placeholder="599/-" />
                    </div>
                </div>
                <div>
                    {previewThumbnail && <img src={previewThumbnail} className="w-64 my-2" alt="Preview Thumbnail" />}
                    <Label>Course Thumbnail</Label>
                    <Input
                        type="file"
                        onChange={selectThumbnail}
                        accept="image/*"
                        className="w-fit"
                    />
                </div>
            </CardContent>
            <CardFooter>
                <div className="space-x-2 mt-5">
                    <Button variant="outline" onClick={() => navigate('/admin/course')}>
                        Cancel
                    </Button>
                    <Button onClick={updateCourseHandler} className="bg-blue-600" disabled={isLoading}>
                        {isLoading ? <><Loader2 className="animate-spin" /> Please Wait...</> : "Save"}
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default CourseTab;
