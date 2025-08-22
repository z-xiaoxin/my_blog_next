"use client";

import type { Metric } from "next/dist/compiled/web-vitals";
import { useReportWebVitals } from "next/web-vitals";

const logWebVitals = (metric: Metric) => {
  console.log(metric);
};

export function WebVitals() {
  useReportWebVitals(logWebVitals);

  return null;
}
