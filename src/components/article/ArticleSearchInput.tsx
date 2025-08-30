"use client";

import cls from "classnames";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";

function ArticleSearchInput({ defaultKeyword }: { defaultKeyword: string }) {
  const [inputFocus, setInputFocus] = useState(false);
  const [keyword, setKeyword] = useState(defaultKeyword);
  const linkBtnRef = useRef<HTMLAnchorElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // inputRef.current?.focus();
    // const length = keyword.length;
    // inputRef.current?.setSelectionRange(length, length);
  }, []);

  return (
    <div
      className={cls(
        "grid hover:grid-cols-[1fr_auto] max-md:grid-cols-[1fr_auto] max-md:w-full transition-all justify-center group rounded-md overflow-hidden",
        inputFocus ? "grid-cols-[1fr_auto]" : "grid-cols-[0fr_auto]"
      )}
    >
      <div
        className={cls(
          "group-hover:border-primary-color group-hover:flex-grow transition-all border-[1px] border-r-0 border-solid rounded-l-md overflow-hidden",
          inputFocus
            ? "border-primary-color flex-grow"
            : "border-secondary-border flex-0"
        )}
      >
        <input
          placeholder="请输入关键词"
          ref={inputRef}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              linkBtnRef.current?.click();
            }
          }}
          className="flex-grow outline-none h-full px-2 text-[14px] md:w-[200px] w-full"
          type="text"
        />
      </div>

      <a
        ref={linkBtnRef}
        href={`/article?keyword=${keyword}`}
        className="flex-none cursor-pointer px-3 pr-4 flex items-center border-[1px] border-solid border-primary-color rounded-r-md justify-center bg-primary-color text-[16px] leading-6 py-0.5 text-white font-semibold outline-none"
      >
        <Icon icon="mingcute:search-line" className="w-4.5 h-4.5 mr-1" /> 搜索
      </a>
    </div>
  );
}

export default ArticleSearchInput;
