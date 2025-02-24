import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from '@/feature/api/courseApi'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
const MEDIA_API = "http://localhost:8000/api/v1/media"


const LectureTab = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { courseId, lectureId } = params;
    const [lectureTitle, setLectureTitle] = useState("");
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [isFree, setIsFree] = useState(false);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [btnDisable, setBtnDisable] = useState(false);
    const [editLecture, { data, isLoading, isSuccess, error }] = useEditLectureMutation();
    const [removeLecture, { data: removeData, isLoading: removeIsLoading, isSuccess: removeIsSuccess, error: removeError }] = useRemoveLectureMutation();
    const { data: lectureData } = useGetLectureByIdQuery(lectureId);
    const lecture = lectureData?.lecture;
    //for get lecture details and feching 
    useEffect(() => {
        setLectureTitle(lecture?.lectureTitle);
        setIsFree(lecture?.isPreviewFree)
        setUploadVideoInfo(lecture?.videoInfo)
    }, [lecture])

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file)
            setMediaProgress(true);
            try {
                const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
                    onUploadProgress: ({ loaded, total }) => {
                        setUploadProgress(Math.round((loaded * 100) / total));
                    }
                });
                if (res.data.success) {
                    setUploadVideoInfo({
                        videoUrl: res.data.data.url,
                        publicId: res.data.data.public_id
                    })
                    setBtnDisable(false);
                    toast.success(res.data.message || "Video Uploaded!")
                }
            } catch (error) {
                console.log(error);
                toast.error("Video Upload Failed.")

            } finally {
                setMediaProgress(false)
            }
        }
    }

    const editLectureHandler = async () => {
        await editLecture({
            lectureTitle,
            videoInfo:uploadVideoInfo,
            isPreviewFree:isFree,
            courseId,
            lectureId,
           
        })
    }
    const removeLectureHandler = async () => {
        await removeLecture();

    }
    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message)
        }
        if (error) {
            toast.error(error.data.message)
        }
    }, [error, isSuccess])
    useEffect(() => {
        if (removeIsSuccess) {
            toast.success(removeData?.message)
            navigate(`/admin/course/${courseId}/lecture`)

        }
        // if(removeError){
        //     toast.error
        // }
    }, [removeIsSuccess, removeData])
    return (
        <Card>
            <CardHeader>
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>Make Changes and click when done.</CardDescription>
                </div>
                <div>
                    <Button disabled={removeIsLoading} onClick={removeLectureHandler} variant="destructive" className=" mt-2">
                        {
                            removeIsLoading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait...</> : "Remove Lecture"
                        }
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Title</Label>
                    <Input
                        type="text"
                        value={lectureTitle}
                        onChange={(e) => setLectureTitle(e.target.value)}
                        placeholder="write title of the course lecture eg. introduction to LMS E-Learning." />
                </div>
                <div>
                    <Label>Video <span className='text-red-600'>*</span></Label>
                    <Input
                        type="file"
                        accept="video/*"
                        className="w-fit"
                        onChange={fileChangeHandler}
                    />
                </div>
                <div className='flex my-5  gap-2 items-center'>
                    <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" />
                    <Label className="font-bold">Is this video free?</Label>
                </div>
                {mediaProgress && (
                    <div>
                        <Progress value={uploadProgress} />
                        <p>{uploadProgress}% uploaded</p>
                    </div>)
                }
                <div >
                    <Button disabled={isLoading} onClick={editLectureHandler}>
                        {
                            isLoading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait...</> : "Update Lecture"
                        }
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab