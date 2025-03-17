import fs from "fs";
import path from "path";
import { Chapter, ChapterWithContent } from "@/types/chapter";

const DATA_DIR = path.join(process.cwd(), "data");
let cachedChapters: Chapter[] | null = null;

export function getAllChapters(): Chapter[] {
  if (cachedChapters !== null) {
    return cachedChapters;
  }

  // Read all files in the data directory and extract chapter information
  const chapters = fs
    .readdirSync(DATA_DIR)
    .filter((filename) => filename.endsWith(".txt"))
    .map((filename) => {
      const [id, title] = filename.replace(".txt", "").split(" - ");
      return {
        id,
        title: title || `Chapter ${id}`,
      };
    })
    .sort((a, b) => parseInt(a.id) - parseInt(b.id));

  // Cache the chapters
  cachedChapters = chapters;

  return chapters;
}

export function getChapterContent(chapterId: string): ChapterWithContent {
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

    const [, title] = filename.split(" - ");

    return {
      id: chapterId,
      title: title.replace(".txt", ""),
      content: paragraphs,
    };
  } catch (error) {
    console.error("Error loading chapter:", error);
    throw error;
  }
}

export function getChapterNavigation(chapterId: string) {
  const chapters = getAllChapters();
  const currentIndex = chapters.findIndex(
    (chapter) => chapter.id === chapterId
  );

  return {
    prev: currentIndex > 0 ? chapters[currentIndex - 1] : null,
    next:
      currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null,
  };
}
