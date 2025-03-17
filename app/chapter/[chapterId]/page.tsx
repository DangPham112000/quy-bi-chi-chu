import { Button } from "@/components/ui/button";
import { getChapterContent, getChapterNavigation } from "@/lib/chapterLoader";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function IndividualChapterPage({
  params,
}: {
  params: { chapterId: string };
}) {
  try {
    const { chapterId } = await params;

    const chapter = getChapterContent(chapterId);
    const { prev, next } = getChapterNavigation(chapterId);

    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">
          Chương {chapterId} - {chapter.title}
        </h1>

        <article className="flex flex-col gap-5">
          {chapter.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

        <div className="flex justify-center gap-2 mt-8">
          {prev && (
            <Link href={`/chapter/${prev.id}`}>
              <Button>Prev</Button>
            </Link>
          )}
          {next && (
            <Link href={`/chapter/${next.id}`}>
              <Button>Next</Button>
            </Link>
          )}
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
