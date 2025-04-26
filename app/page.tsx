import { ChapterTable } from "@/components/ChapterTable";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getAllChapters } from "@/lib/chapterLoader";
import Link from "next/link";

const CHAPTERS_PER_PAGE = 100;

type SearchParams = Promise<{ page?: string; part?: "part2" }>;

export default async function HomePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { part, page } = await searchParams;
  const currentPart = part;
  const isPart2 = currentPart === "part2";
  const currentPage = parseInt(page || "1");

  const allChapters = getAllChapters(currentPart);

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
      <div className="self-center flex gap-5 mb-6 text-3xl font-bold">
        <Link
          href={`/`}
          className={`${
            isPart2 ? "text-black" : "bg-black text-white"
          } rounded-md border-2 px-4 py-2`}
        >
          Quỷ bí chi chủ
        </Link>
        <Link
          href={`/?part=part2`}
          className={`${
            isPart2 ? "bg-black text-white" : "text-black"
          } rounded-md border-2 px-4 py-2`}
        >
          Túc mệnh chi hoàn
        </Link>
      </div>

      <Link href={`${part ? "/part2" : ""}/chapter/1`} className="mb-10">
        <Button>Start reading</Button>
      </Link>

      <ChapterTable paginatedChapter={paginatedChapter} part={currentPart} />

      <div className="my-10">
        <Pagination>
          <PaginationContent className="inline-flex justify-center w-full overflow-x-auto ">
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`/?page=${currentPage - 1}&part=${currentPart}`}
                />
              </PaginationItem>
            )}
            {generatePageNumber().map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={`/?page=${pageNumber}&part=${currentPart}`}
                  isActive={pageNumber === currentPage}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href={`/?page=${currentPage + 1}&part=${currentPart}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
