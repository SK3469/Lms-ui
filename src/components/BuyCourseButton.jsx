import React, { useEffect } from 'react'
import { Button } from './ui/button'
import { useCreateCheckoutSessionMutation } from '@/feature/api/purchaseApi'
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const BuyCourseButton = ({courseId}) => {
  const [createCheckoutSession, {data, isLoading,isSuccess , isError,error }] =useCreateCheckoutSessionMutation();

  const purchaseCourseHandler = async () => {
    await createCheckoutSession(courseId);
  }
  useEffect(()=>{
    if(isSuccess){
    if(data.url){ 
      window.location.href = data.url; //redirect to stripe checkout 
    }else{
      toast.error("Invalid response from server")
    }
    }
    if(isError){
      toast.error(error?.data?.message || 'failed to create checkout' )
    }
        },[data , isSuccess ,isError,error])
  return (
    <Button disabled={isLoading} onClick={purchaseCourseHandler} className="w-full">
      {
        isLoading ? <><Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please Wait...</> : //use react fregmet <></>use as a parant 
          "Purchase Course"
      }</Button>
  )
}

export default BuyCourseButton