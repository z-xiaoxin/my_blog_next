import { MouseEventHandler } from "react";

export const clickEventStop: MouseEventHandler<Element> = (e) => {
  e.stopPropagation();
};
