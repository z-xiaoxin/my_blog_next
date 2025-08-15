"use client";

import HomeIndex from "@/components/home/Index";
import { useEffect } from "react";

export default function Home() {
  console.log("process", process.title);

  useEffect(() => {}, []);

  return <HomeIndex></HomeIndex>;
}
