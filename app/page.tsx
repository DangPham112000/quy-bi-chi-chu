import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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

const CHAPTERS_PER_PAGE = 100;

type SearchParams = Promise<{ page?: string }>;

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || "1");

  const allChapters = getAllChapters();

  const totalChapters = allChapters.length;
  const totalPages = Math.ceil(totalChapters / CHAPTERS_PER_PAGE);

  const paginatedChapter = allChapters.slice(
    (currentPage - 1) * CHAPTERS_PER_PAGE,
    currentPage * CHAPTERS_PER_PAGE
  );

  const generatePageNumber = () => {
    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
      pageNumbers.push(i + 1);
    }
    return pageNumbers;
  };

  return (
    <div className="container flex flex-col p-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6 self-center">Quỷ bí chi chủ</h1>

      <Link href="/chapter/1" className="mb-10">
        <Button>Start reading</Button>
      </Link>

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
            <TableRow key={chapter.id}>
              <TableCell>{chapter.id}</TableCell>
              <TableCell>{chapter.title}</TableCell>
              <TableCell className="flex items-center justify-end">
                <Link href={`/chapter/${chapter.id}`}>
                  <Button>Read</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="my-10">
        <Pagination>
          <PaginationContent className="inline-flex justify-center w-full overflow-x-auto ">
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`/?page=${currentPage - 1}`} />
              </PaginationItem>
            )}
            {generatePageNumber().map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={`/?page=${pageNumber}`}
                  isActive={pageNumber === currentPage}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext href={`/?page=${currentPage + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
