import { useState, type ReactElement } from "react"
import * as SutdentData from "../data/studentsList.json"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import DialogComponent from "@/components/localComponents/dialog"

type StudentDataTemplate = {
  id: number
  title: string
  age: number
}

const StudentList = (): ReactElement => {
  let [view, setView] = useState<boolean>(true)
  let [studentForEdit, setStudentForEdit] =
    useState<StudentDataTemplate | null>(null)
  let [open, setOpen] = useState<boolean>(false)

  let processedData = JSON.stringify(SutdentData)
  let allData = JSON.parse(processedData)
  let finalData: StudentDataTemplate[] = allData.data

  let first50StudentData = finalData.slice(0, 50)

  let [studentVisible, setStudentVisible] =
    useState<StudentDataTemplate | null>(null)

  const showStudentDetails = (id: number, title: string, age: number): void => {
    setStudentVisible({ id, title, age })
    console.log(studentVisible)
  }

  //   console.log(first50SutdentData);

  return (
    <div className="place-items-center">
      <div>
        {studentVisible && view && (
          <Card className="fixed top-4/12 left-140 z-50 w-95 bg-white p-20">
            <CardHeader className="">
              <CardTitle className="font-bold">Student Information</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              Student ID: &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;{" "}
              {studentVisible.id}
            </CardContent>
            <CardContent className="p-0">
              Student Name: &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              {studentVisible.title}{" "}
            </CardContent>
            <CardContent className="p-0">
              Student Age: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
              {studentVisible.age}{" "}
            </CardContent>
            <Button
              className="bg-blue-500 text-white"
              onClick={() => {
                setStudentVisible(null)
              }}
            >
              Close
            </Button>
          </Card>
        )}
      </div>
      <div className="dialog-for-edit">
        {studentForEdit && (
          <DialogComponent
            {...{
              id: studentForEdit.id,
              title: studentForEdit.title,
              age: studentForEdit.age,
              open: open,
              setOpen: setOpen,
            }}
          />
        )}
      </div>
      <div className="mt-20 flex justify-center">
        <Card className="p-4">
          <CardHeader className="items-center text-center">
            <CardTitle className="text-4xl font-bold">Students List</CardTitle>
            <Button
              className="border-1-black m-auto w-25 bg-blue-500 text-white"
              onClick={() => {
                setView(!view)
              }}
            >
              {view ? "Hide list" : "View list"}{" "}
            </Button>
          </CardHeader>
          {view ? (
            <CardContent>
              <Table>
                <TableCaption>A list of 50 Students.</TableCaption>
                <TableHeader>
                  <TableRow className="bg-gray-400">
                    <TableHead className="w-70 text-center">
                      Student ID
                    </TableHead>
                    <TableHead className="w-70 text-center">
                      Student Name
                    </TableHead>
                    <TableHead className="w-70 text-center">
                      Student Age
                    </TableHead>
                    <TableHead className="w-70 text-center">
                      Edit Button
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {first50StudentData.map((student) => (
                    <TableRow
                      key={student.id}
                      className={student.id & 1 ? "" : "bg-gray-300"}
                    >
                      <TableCell className="text-center">
                        {student.id}
                      </TableCell>
                      <TableCell
                        className="text-center"
                        onClick={() => {
                          showStudentDetails(
                            student.id,
                            student.title,
                            student.age
                          )
                        }}
                      >
                        {student.title}
                      </TableCell>
                      <TableCell className="text-center">
                        {student.age}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          key={student.id}
                          className="bg-green-500 text-white"
                          onClick={() => {
                            setStudentForEdit({
                              id: student.id,
                              title: student.title,
                              age: student.age,
                            })
                            setOpen(true)
                          }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          ) : (
            <p>Click above button to view Student list</p>
          )}
        </Card>
      </div>
    </div>
  )
}

export default StudentList
