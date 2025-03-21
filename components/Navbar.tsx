import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../img/logo.png";
import FontSizeSelector from "./FontSizeSelector";
import { FontProvider } from "@/contexts/FontContext";

export default function Navbar() {
  return (
    <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          width={40}
          className="rounded-full ring-2 ring-white h-auto w-auto"
        />
      </Link>

      <FontSizeSelector />
    </div>
  );
}
