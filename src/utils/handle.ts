import { MouseEventHandler } from "react";

export const eventStop: MouseEventHandler<Element> = (e) => {
  e.stopPropagation();
};

export const getUniId = (ids?: string[]) => {
  const uniId = Math.random().toString(36).slice(2);
  if (ids?.includes(uniId)) return getUniId(ids);
  return uniId;
};

export const formateDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formateTimestamp = (
  timestamp: number,
  formate: "YY-MM-DD" | "YY-MM-DD HH:MM:SS" | "HH:MM:SS" = "YY-MM-DD HH:MM:SS"
) => {
  let options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  if (formate === "YY-MM-DD") {
    options = { year: "numeric", month: "long", day: "numeric" };
  }

  if (formate === "YY-MM-DD HH:MM:SS") {
    options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
  }

  if (formate === "HH:MM:SS") {
    options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
  }

  return new Date(timestamp * 1000).toLocaleDateString("zh", options);
};

/** 防抖 */
export const throttle = <T extends (...args: any) => any>(
  fn: T,
  delay: number = 50
) => {
  let timer: NodeJS.Timeout | null = null;
  const func = (...args: any[]) => {
    if (timer) return;
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
  return func as T;
};

/** 节流 */
export const debounce = (fn: () => void, delay: number = 50) => {
  let timer: NodeJS.Timeout | null = null;
  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
      timer = null;
    }, delay);
  };
};
