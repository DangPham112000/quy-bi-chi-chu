export interface Chapter {
  id: string;
  title: string;
}

export interface ChapterWithContent extends Chapter {
  content: string[];
}
