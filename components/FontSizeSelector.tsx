"use client";

import React, { useState } from "react";
import { TextIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FONT_SIZES, FontSizeOption, getFontSize } from "@/helpers/fontSizeHandle";

export default function FontSizeSelector() {
  const [currentFontSize, setCurrentFontSize] = useState<FontSizeOption>(
    getFontSize()
  );

  const handleFontSizeChange = (fontSizeOption: FontSizeOption) => {
    setCurrentFontSize(fontSizeOption);

    // Save to localStorage
    window.localStorage.setItem("my-font-size", fontSizeOption.value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none w-10 aspect-square rounded-full ring-2 ring-white flex justify-center items-center">
        <TextIcon className="w-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 rounded-md">
        <DropdownMenuLabel className="text-lg px-4">Font Size</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {FONT_SIZES.map((size, index) => (
          <DropdownMenuItem
            key={index}
            onSelect={() => handleFontSizeChange(size)}
            className={`text-sm p-2 rounded-md ${
              currentFontSize.value === size.value
                ? "bg-accent text-accent-foreground"
                : "cursor-pointer"
            }`}
          >
            {size.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
