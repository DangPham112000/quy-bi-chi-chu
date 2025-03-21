"use client";

import { FontContext } from "@/contexts/FontContext";
import React, { useContext } from "react";
import dynamic from 'next/dynamic'

function ChapterContent({
  chapterContent,
}: {
  chapterContent: Array<String>;
}) {
  const { font } = useContext(FontContext);

  return (
    <article className={`flex flex-col ${font.value} ${font.paragraphGap}`}>
      {chapterContent.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </article>
  );
}

export default dynamic(() => Promise.resolve(ChapterContent), {
  ssr: false
})