import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Menu, Plus, School, School2 } from 'lucide-react';
import React from 'react';
import DarkMode from "./DarkMode"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Link, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '@/feature/api/authApi';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';


const Navbar = () => {
  const {user} = useSelector(store=> store.auth) 
  const navigate = useNavigate();
  const [logoutUser,
    { data,
      error,
      isSuccess,
      isLoading }] = useLogoutUserMutation();
  const logoutHandler = async () => {
    await logoutUser();
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Logged Out Successfully.")
      navigate("/login")
    };
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#0A0A0A] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 shadow-sm z-10">
      {/* For Desktop */}
      <div className=" hidden md:flex justify-between max-w-7xl mx-auto h-full">
        <div className="flex items-center gap-2 h-full">
          <Link to={'/'}> <School size={30} /></Link>
          <Link to={'/'}>
            <h1 className="text-xl font-bold md:block md:font-extrabold md:text-2xl">E-Learning</h1></Link>
        </div>
        {/* user icon and dark mode icon  */}
        <div className='flex gap-3 items-center'>
          <div className=''>
            {
              user ? (<DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarImage src={user?.photoUrl ||"https://github.com/shadcn.png" } />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <Link to={"/my-learning"}> <DropdownMenuItem> My Learning</DropdownMenuItem></Link>
                    <Link to={"/profile"}> <DropdownMenuItem> My Profile</DropdownMenuItem></Link>
                    <DropdownMenuItem onClick={logoutHandler}> Logged Out</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
             {
              user.role === "instructor" && (
                <>
               <Link to={"/admin"}>
               <DropdownMenuItem>
                <Button className="w-full">Dashboard</Button>
              </DropdownMenuItem></Link>
              </>
              )
             }
                </DropdownMenuContent>
              </DropdownMenu>) : (
                <div className='flex items-center h-full gap-2'>
                  <Link to={"/login"}><Button variant="outline">Login</Button></Link>
                  <Link to={"/login"}> <Button>Signup</Button></Link>
                </div>
              )
            }
          </div>
          <DarkMode />
        </div>

      </div>
      <MobileNavbar />
    </div>
  );
};

export default Navbar;

const MobileNavbar = () => {
  const role = "instructor";
  return (
    <div className='md:hidden flex justify-between items-center w-auto h-full pr-2'>
      <div className='flex gap-4 pl-2'>
        <span className='flex gap-2'>
          <Link to={'/'}><School2 /></Link>
          <Link to={'/'}><h1 className='font-bold text-xl'>E-Learning</h1></Link>
        </span>
      </div>
      <div className=''>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full"><Menu /></Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader >
              <span className='flex justify-between my-7'>
                <SheetTitle className="font-bold text-xl">E-Learning</SheetTitle>
                <DarkMode />
              </span>
            </SheetHeader>
            <div className="flex flex-col gap-4 ">
              <Link to={"/my-learning"}><h1>My Learning</h1></Link>
              <Link to={"/profile"}><h1>Edit Profile</h1></Link>
              <h1>Login</h1>
            </div>
            <div className='mt-5'>
              {
                role === "instructor" && (
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button type="submit">Dashboard</Button>
                    </SheetClose>
                  </SheetFooter>
                )
              }
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}


