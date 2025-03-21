"use client";

import React, { useContext } from "react";
import { TextIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { FONTS } from "@/lib/k";
import { FontType } from "@/types/font";
import { FontContext } from "@/contexts/FontContext";

export default function FontSizeSelector() {

  const { font, setFont } = useContext(FontContext);

  const handleFontChange = (fontOption: FontType) => {
    setFont(fontOption);

    // Save to localStorage
    window.localStorage.setItem("my-font-size", fontOption.value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none w-10 aspect-square rounded-full ring-2 ring-white flex justify-center items-center">
        <TextIcon className="w-full" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 rounded-md">
        <DropdownMenuLabel className="text-lg px-4">
          Font Size
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {FONTS.map((f, index) => (
          <DropdownMenuItem
            key={index}
            onSelect={() => handleFontChange(f)}
            className={`text-sm p-2 rounded-md ${
              font.value === f.value
                ? "bg-accent text-accent-foreground"
                : "cursor-pointer"
            }`}
          >
            {f.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
