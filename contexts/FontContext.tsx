"use client";

import getFontSizeFromLS from "@/lib/getFontFromLS";
import { FONTS } from "@/lib/k";
import { FontContextType, FontType } from "@/types/font";
import React, { createContext, ReactNode, useEffect, useState } from "react";

export const FontContext = createContext<FontContextType>({
  font: FONTS[5],
  setFont: () => {},
});

export const FontProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [font, setFont] = useState<FontType>(getFontSizeFromLS());

  useEffect(() => {
    window.localStorage.setItem("my-font-size", font.value);
  }, [font]);

  const context = { font, setFont };

  return (
    <FontContext.Provider value={context}>{children}</FontContext.Provider>
  );
};
