import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import React, { useState } from 'react'

const categories = [
  { id: "nextjs", label: "Next JS" },
  { id: "data science", label: "Data Science" },
  { id: "frontend development", label: "Frontend Development" },
  { id: "fullstack development", label: "Fullstack Development" },
  { id: "mern stack development", label: "MERN Stack Development" },
  { id: "backend development", label: "Backend Development" },
  { id: "javascript", label: "Javascript" },
  { id: "python", label: "Python" },
  { id: "docker", label: "Docker" },
  { id: "mongodb", label: "MongoDB" },
  { id: "html", label: "HTML" },
];
const Filter = ({ handleFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedPrice, setSelectedPrice] = useState("")
  const changeCategoryHandler = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const newCategories = prevCategories.includes(categoryId) ? prevCategories.filter((id) !== categoryId) :
        [...prevCategories, categoryId];

      handleFilterChange(newCategories, sortByPrice);
      return newCategories;
    })
  }
  const selectByPriceHandler = (selectedValue) => {
    setSortByPrice(selectedValue);
    handleFilterChange(selectedCategories, selectedValue);
  }
  return (
    <div className='md:w-[20%] p-5 mt-2 rounded-lg shadow-md'>
      <div className='flex items-center justify-center flex-col gap-2'>
        <h1 className='font-semibold text-lg md:text-xl'>Filter Options</h1>
        <Select onValueChange={selectByPriceHandler}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by price</SelectLabel>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />
      <div className='flex flex-col gap-[3.5px]'>
        <h1 className='font-bold '>CATEGORY</h1>
        {
          categories.map((category, idx) => (
            <>
              <div className='flex items-center gap-2 ' key={category}>
                <Checkbox id={category.id}
                  onCheckedChange={() => changeCategoryHandler(category._id)} />
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {category.label}
                </Label>
              </div>
            </>
          ))
        }
      </div>
    </div>
  )
}

export default Filter