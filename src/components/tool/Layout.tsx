"use client";

import { useEffect } from "react";

function ToolLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    console.log("typeof children", typeof children);
    return () => {};
  }, []);

  return <div>ToolLayout 1{children}</div>;
}

export default ToolLayout;
