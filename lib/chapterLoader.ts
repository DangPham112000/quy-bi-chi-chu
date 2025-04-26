import fs from "fs";
import path from "path";
import { Chapter, ChapterWithContent } from "@/types/chapter";

const PART1_DATA_DIR = path.join(process.cwd(), "data");
const PART2_DATA_DIR = path.join(process.cwd(), "data2");
let cachedPart1Chapters: Chapter[] | null = null;
let cachedPart2Chapters: Chapter[] | null = null;

export function getAllChapters(part?: "part2"): Chapter[] {
  const isPart2 = part === "part2";
  const DATA_DIR = isPart2 ? PART2_DATA_DIR : PART1_DATA_DIR;

  if (!isPart2 && cachedPart1Chapters !== null) {
    return cachedPart1Chapters;
  }

  if (isPart2 && cachedPart2Chapters !== null) {
    return cachedPart2Chapters;
  }

  // Read all files in the data directory and extract chapter information
  const chapters = fs
    .readdirSync(DATA_DIR)
    .filter((filename) => filename.endsWith(".txt"))
    .map((filename) => {
      const [id, ...titles] = filename.replace(".txt", "").split(" - ");
      return {
        id,
        title: titles.join(' ') || `Chapter ${id}`,
      };
    })
    .sort((a, b) => parseInt(a.id) - parseInt(b.id));

  // Cache the chapters
  if (isPart2) {
    cachedPart2Chapters = chapters;
  } else {
    cachedPart1Chapters = chapters;
  }

  return chapters;
}

export function getChapterContent(
  chapterId: string,
  part?: "part2"
): ChapterWithContent {
  const DATA_DIR = part === "part2" ? PART2_DATA_DIR : PART1_DATA_DIR;
  try {
    // Find the corresponding file
    const filename = fs
      .readdirSync(DATA_DIR)
      .find((file) => file.startsWith(`${chapterId} -`));

    if (!filename) {
      throw new Error(`Chapter ${chapterId} not found`);
    }

    // Read file content
    const filePath = path.join(DATA_DIR, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Split content into paragraphs (separated by double newline)
    const paragraphs = fileContent.split(/\n\n/).filter((p) => p.trim());

    const [, ...titles] = filename.split(" - ");

    return {
      id: chapterId,
      title: titles.join(' ').replace(".txt", ""),
      content: paragraphs,
    };
  } catch (error) {
    console.error("Error loading chapter:", error);
    throw error;
  }
}

export function getChapterNavigation(chapterId: string, part?: "part2") {
  const chapters = getAllChapters(part);
  const currentIndex = chapters.findIndex(
    (chapter) => chapter.id === chapterId
  );

  return {
    prev: currentIndex > 0 ? chapters[currentIndex - 1] : null,
    next:
      currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null,
  };
}
