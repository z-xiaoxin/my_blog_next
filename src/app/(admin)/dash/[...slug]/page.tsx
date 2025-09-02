"use client";

import dynamic from "next/dynamic";

const DashApp = dynamic(() => import("@/components/admin/dash"), {
  ssr: false,
});

export default function DashPage() {
  return <DashApp />;
}
