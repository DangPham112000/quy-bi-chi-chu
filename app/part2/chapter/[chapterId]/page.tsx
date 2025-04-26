"use server";

import ChapterContent from "@/components/ChapterContent";
import { Button } from "@/components/ui/button";
import { getChapterContent, getChapterNavigation } from "@/lib/chapterLoader";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Params = Promise<{ chapterId: string }>;

export default async function IndividualChapterPage({
  params,
}: {
  params: Params;
}) {
  try {
    const { chapterId } = await params;

    const chapter = getChapterContent(chapterId, "part2");
    const { prev, next } = getChapterNavigation(chapterId, "part2");

    return (
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-3xl font-bold my-6 flex justify-center items-center w-full">
          <span>
            {chapter.title}
          </span>
        </h1>

        <ChapterContent chapterContent={chapter.content} />

        <div className="flex justify-center gap-2 mt-8">
          {prev && (
            <Link href={`/part2/chapter/${prev.id}`}>
              <Button>Prev</Button>
            </Link>
          )}
          {next && (
            <Link href={`/part2/chapter/${next.id}`}>
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
