
// dont use 
import { createBrowserRouter } from "react-router-dom"
import Login from "./design/auth/Login"
import HeroSection from './design/student/HeroSection'
import MainLayout from "./layout/MainLayout"
import { RouterProvider } from "react-router"
import Courses from "./design/student/Courses"
import MyLearning from "./design/student/MyLearning"
import Profile from "./design/student/Profile"
import Sidebar from "./design/admin/lecture/Sidebar"
import AddCourse from "./design/admin/course/AddCourse"
import CourseTable from "./design/admin/course/CourseTable"
import Dashboard from "./design/admin/lecture/Dashboard"
import EditCourse from "./design/admin/course/EditCourse"
import CreateLecture from "./design/admin/lecture/CreateLecture"
import EditLecture from "./design/admin/lecture/EditLecture"
import CourseDetail from "./design/student/CourseDetail"
import CourseProgress from "./design/student/CourseProgress"
import SearchPage from "./design/student/SearchPage"
function App() {

  const appRouter = createBrowserRouter([
    {
      path:'/',
      element:<MainLayout/>,
      children:[{
        path:"/",
        element:(
          <>
          <HeroSection/>
          <Courses/>
          </>
        ),
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/my-learning",
        element:<MyLearning/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/course-detail/:courseId",
        element:<CourseDetail/>
      },
      {
        path:"/course-progress/:courseId",
        element:<CourseProgress/>
      },
      {
        path:"/course/search",
        element:<SearchPage/>
      },
      //for admin perpose only.
      {
        path:"admin",
        element:<Sidebar/>,
        children:[
          {
            path:"dashboard",
            element:<Dashboard/>
          },
          {
            path:"course",
            element:<CourseTable/>
          },
          {
            path:"course/create",
            element:<AddCourse/>
          },
          {
            path:"course/:courseId",
            element:<EditCourse/>
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLecture/>
          },
          {
            path:"course/:courseId/lecture",
            element:<CreateLecture/>
          },
          {
            path:"course/:courseId/lecture/:lectureId",
            element:<EditLecture/>
          },
        ],
       
      }
     
     
      ]
    },
    
  ])

  return (
   <main>
    <RouterProvider router={appRouter}/>
   </main>
  )
}

export default App
