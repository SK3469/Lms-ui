import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useGetCreatorCourseQuery } from '@/feature/api/courseApi'
import { Edit2 } from 'lucide-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]
const CourseTable = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetCreatorCourseQuery();
  if (isLoading) return <h1>Loading...</h1>
  console.log(data)
  return (
    <div className=''>

      <Button onClick={() => navigate(`create`)} className="mb-5">
        Create New Course
      </Button>
      <Table>

        <TableCaption>List of your recent uploded courses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[500px]">Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.courses.map((course) => (
            <TableRow key={course._id}>
              <TableCell className="font-medium">{course?.courseTitle}</TableCell>
              <TableCell>{course?.coursePrice || "NA"}</TableCell>
              <TableCell><Badge className={course.isPublished ?'bg-green-600':'bg-red-600'}>{course.isPublished ? "Published" : "Draft"}</Badge> </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" onClick={()=>navigate(`${course._id}`)}><Edit2 /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CourseTable