"use client";

import { getFontSize } from "@/helpers/fontSizeHandle";
import React from "react";

export default function ChapterContent({
  chapterContent,
}: {
  chapterContent: Array<String>;
}) {
  const fontSize = getFontSize();

  return (
    <article
      className={`flex flex-col ${fontSize.value} ${fontSize.paragraphGap}`}
    >
      {chapterContent.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </article>
  );
}
