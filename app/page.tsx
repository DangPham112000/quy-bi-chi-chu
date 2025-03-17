import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllChapters } from "@/lib/chapterLoader";
import Link from "next/link";

export default function HomePage() {
  const chapters = getAllChapters();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Quỷ bí chi chủ</h1>

      <Link href="/chapter/1" className="mb-5">
        <Button>Start reading</Button>
      </Link>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chapter</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chapters.map((chapter) => (
            <TableRow key={chapter.id}>
              <TableCell>{chapter.id}</TableCell>
              <TableCell>{chapter.title}</TableCell>
              <TableCell>
                <Link href={`/chapter/${chapter.id}`}>
                  <Button>Read</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
