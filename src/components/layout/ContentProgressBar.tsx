"use client";

import { throttle } from "@/utils/handle";
import { useEffect, useState } from "react";

function ContentProgressBar() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const viewHeight = document.documentElement.scrollHeight;

    const onScroll = throttle(() => {
      const scrollHeight = window.scrollY;
      setPercent(
        (scrollHeight / (viewHeight - document.documentElement.clientHeight)) *
          100
      );
    });

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className=" fixed top-0 left-0 w-full h-0.5 pointer-events-none">
      <div
        className="h-full rounded bg-primary-color transition-all duration-150"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

export default ContentProgressBar;
