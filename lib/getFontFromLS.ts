import { FONTS } from "./k";

export default () => {
  let font = FONTS[5];

  if (typeof window !== "undefined") {
    const savedFontSize = window.localStorage.getItem("my-font-size");
    if (savedFontSize) {
      const parsedFont = FONTS.find((size) => size.value === savedFontSize);
      if (parsedFont) {
        font = parsedFont;
      }
    }
  }
  return font;
};
