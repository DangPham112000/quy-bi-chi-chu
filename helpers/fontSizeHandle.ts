export const FONT_SIZES = [
  { label: "Extra Small", value: "text-xs", paragraphGap: "gap-1" },
  { label: "Small", value: "text-sm", paragraphGap: "gap-2" },
  { label: "Base", value: "text-base", paragraphGap: "gap-3" },
  { label: "Large", value: "text-lg", paragraphGap: "gap-4" },
  { label: "Extra Large", value: "text-xl", paragraphGap: "gap-5" },
  { label: "XXL", value: "text-2xl", paragraphGap: "gap-6" },
  { label: "XXXL", value: "text-3xl", paragraphGap: "gap-8" },
];

export type FontSizeOption = (typeof FONT_SIZES)[number];

export const getFontSize = () => {
  let fontSize = FONT_SIZES[5];

  if (typeof window !== "undefined") {
    const savedFontSize = window.localStorage.getItem("my-font-size");
    if (savedFontSize) {
      const parsedFontSize = FONT_SIZES.find(
        (size) => size.value === savedFontSize
      );
      if (parsedFontSize) {
        fontSize = parsedFontSize;
      }
    }
  }
  return fontSize;
};
