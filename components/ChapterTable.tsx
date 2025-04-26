import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import Link from "next/link";
import { Button } from "./ui/button";
import capitalizeWords from "@/helpers/capitalizeWords";

type ChapterTableType = {
  paginatedChapter: Array<any>;
  part?: "part2";
};

export const ChapterTable = ({ paginatedChapter, part }: ChapterTableType) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Chapter</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="flex items-center justify-end">
            <span className="w-[60px] flex justify-center">Action</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {paginatedChapter.map((chapter) => (
          <TableRow key={part ? chapter.id + part : chapter.id}>
            <TableCell>{chapter.id}</TableCell>
            <TableCell>{capitalizeWords(chapter.title)}</TableCell>
            <TableCell className="flex items-center justify-end">
              <Link
                href={`${part ? "/part2" : ""}/chapter/${chapter.id}`}
              >
                <Button>Read</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
