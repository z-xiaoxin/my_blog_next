import { Metadata } from "next";

export const metadata: Metadata = {
  title: "xiaoxin AMap api using eg",
  description:
    "Use AMap api to create a map, and use the map to search for locations.",
  keywords: "AMap, locations search",
};

export { default } from "@/components/location/GDMap";
