import { useState, type ReactElement } from "react"
import * as BookData from "../data/bookslist.json"
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

interface bookDataTemplate {
  author: string
  id: number
  title: string
}

const BookList = (): ReactElement => {
  let [view, setView] = useState<boolean>(true)
  let processedData = JSON.stringify(BookData)
  let allData = JSON.parse(processedData)
  let finalData: bookDataTemplate[] = allData.data

  let first50BookData = finalData.slice(0, 50)

  console.log(first50BookData)

  return (
    <div className="mt-20 flex justify-center">
      <Card className="p-4">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-4xl font-bold">Books List</CardTitle>
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
              <TableCaption>A list of 50 books.</TableCaption>
              <TableHeader>
                <TableRow className="bg-gray-400">
                  <TableHead className="w-100 text-center">Book ID</TableHead>
                  <TableHead className="w-100 text-center">
                    Book Author
                  </TableHead>
                  <TableHead className="w-100 text-center">
                    Book Title
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {first50BookData.map((book) => (
                  <TableRow
                    key={book.id}
                    className={book.id & 1 ? "" : "bg-gray-300"}
                  >
                    <TableCell className="font-medium">{book.id}</TableCell>
                    <TableCell className="text-center">{book.author}</TableCell>
                    <TableCell className="text-right">{book.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        ) : (
          <p>Click above button to view Book list</p>
        )}
      </Card>
    </div>
  )
}

export default BookList
