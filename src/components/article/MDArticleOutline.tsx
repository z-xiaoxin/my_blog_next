"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useMemo, useRef, useState } from "react";
import cls from "classnames";
import { eventStop, getUniId, throttle } from "@/utils/handle";

type IHeads = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

interface IOutlineItem {
  type: IHeads;
  text: string;
  id: string;
  children: IOutlineItem[];
  ele: HTMLHeadingElement;
}

const heads = ["h1", "h2", "h3", "h4", "h5", "h6"];
const headIdPrefix = "xx-head-";

function MDArticleOutline() {
  const [outLine, setOutline] = useState<IOutlineItem[]>([]);
  const [outlineExpand, setOutlineExpand] = useState(false);
  const [activeId, setActiveId] = useState("");
  const activeIdRef = useRef(activeId);

  useEffect(() => {
    activeIdRef.current = activeId;

    document
      .querySelector(`#xx-article-outline #outline-${activeId}`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  }, [activeId]);

  useEffect(() => {
    const articleContent = document.querySelector("#xx-article-content");

    const articleHeadingChildren = [...(articleContent?.children ?? [])].filter(
      (i) => ["H1", "H2", "H3", "H4", "H5", "H6"].includes(i.tagName)
    ) as HTMLHeadingElement[];

    /** 扁平化 heads */
    const outlineList: IOutlineItem[] = [];
    const tempOutline: IOutlineItem[] = [];

    const smallerHead = (currentHead: IHeads, targetHead: IHeads) => {
      return (
        heads.findIndex((i) => i === currentHead) >
        heads.findIndex((i) => i === targetHead)
      );
    };

    const usedIds: string[] = [];

    articleHeadingChildren.forEach((child) => {
      const uniId = getUniId(usedIds);
      usedIds.push(uniId);
      const headId = headIdPrefix + uniId;
      child.setAttribute("id", headId);
      const spanEle = document.createElement("span");
      spanEle.className = "heading-marker";
      child.append(spanEle);

      const outlineItem: IOutlineItem = {
        type: child.tagName.toLocaleLowerCase() as IHeads,
        text: child.textContent || "",
        id: headId,
        children: [],
        ele: child,
      };

      /** 第一个 */
      if (!outlineList.length) tempOutline.push(outlineItem);
      else {
        const targetOutline = outlineList.findLast((i) => {
          return smallerHead(outlineItem.type, i.type);
        });
        if (targetOutline) targetOutline.children.push(outlineItem);
        else tempOutline.push(outlineItem);
      }
      outlineList.push(outlineItem);
    });

    setOutline(tempOutline);

    const getActiveHeadId = () => {
      let activeId = "";
      articleHeadingChildren.find((ele, index, arr) => {
        const currentTop = ~~ele.getBoundingClientRect().top;
        if (
          (currentTop > 0 && index === 0) ||
          (currentTop > 0 && currentTop <= 20)
        ) {
          activeId = ele.id;
          return true;
        }

        if (currentTop > 20 && index > 0) {
          activeId = arr[index - 1].id;
          return true;
        }

        return false;
      });

      return activeId;
    };

    const windowScroll = throttle(() => {
      const activeHeadId = getActiveHeadId();
      if (activeHeadId) setActiveId(activeHeadId);
    });

    windowScroll();
    window.addEventListener("scroll", windowScroll);

    return () => {
      window.removeEventListener("scroll", windowScroll);
    };
  }, []);

  return (
    <div
      id="xx-article-outline"
      className={cls(
        "fixed z-50 top-10 right-0 pointer-events-none transition-all",
        outlineExpand ? "w-[220px]" : "w-20"
      )}
    >
      <div
        className={cls(
          outlineExpand
            ? "p-2 rounded-l-md"
            : "pl-3 rounded-l-2xl translate-x-7 py-0.5 hover:translate-x-0",
          "w-full absolute top-0 left-0 pl-3 bg-primary-bg shadow-normal transition-all pointer-events-auto"
        )}
      >
        <div
          onClick={() => setOutlineExpand(!outlineExpand)}
          className="w-full flex justify-between items-center cursor-pointer select-none"
        >
          <p className="leading-7 text-[18px] font-semibold">目录</p>
          <div className="w-7 h-7 ">
            <Icon
              icon="iconamoon:arrow-right-2-duotone"
              className={cls(
                "w-full h-full transition-all",
                outlineExpand ? "rotate-y-0" : "rotate-y-180"
              )}
            />
          </div>
        </div>
        <div
          style={{ scrollbarWidth: "none" }}
          className={cls(
            "transition-all overflow-scroll flex flex-col",
            outlineExpand ? "max-h-[50vh]" : "max-h-0"
          )}
        >
          {/* <Scrollbar direction="vertical"> */}
          <OutLineList outLineList={outLine} activeId={activeId} />
          {/* </Scrollbar> */}
          {/* <OutLineList outLineList={outLine} /> */}
        </div>
      </div>
    </div>
  );
}

export default MDArticleOutline;

function OutLineList({
  outLineList,
  level,
  activeId,
}: {
  outLineList: IOutlineItem[];
  level?: number;
  activeId: string;
}) {
  return (
    <>
      <ul className={cls({ "overflow-hidden": level })}>
        {outLineList.map((i) => (
          <OutlineListItem
            activeId={activeId}
            key={i.id}
            outLineItem={i}
            level={level ?? 0}
          />
        ))}
      </ul>
    </>
  );
}

const scrollToTargetHead = (param: IOutlineItem) => {
  document.querySelector(`#${param.id} .heading-marker`)?.scrollIntoView({
    behavior: "smooth",
  });
};

function OutlineListItem({
  outLineItem,
  level,
  activeId,
}: {
  outLineItem: IOutlineItem;
  level: number;
  activeId: string;
}) {
  const [expand, setExpand] = useState(true);

  const hasChildren = useMemo(
    () => !!outLineItem.children.length,
    [outLineItem]
  );

  return (
    <li
      onClick={(e) => {
        eventStop(e);
        scrollToTargetHead(outLineItem);
      }}
      key={outLineItem.text}
    >
      <div
        id={`outline-${outLineItem.id}`}
        className={cls(
          "flex items-start transition-all hover:bg-primary-color-10percent rounded-sm py-1 px-1 ",
          activeId === outLineItem.id ? "text-primary-color" : ""
        )}
        style={{ paddingLeft: `${level * 8 + 4}px` }}
      >
        <div
          className={cls("w-6 h-6 shrink-0 select-none", {
            "cursor-pointer": hasChildren,
          })}
          onClick={(e) => {
            if (!hasChildren) return;
            eventStop(e);
            setExpand(!expand);
          }}
        >
          {hasChildren ? (
            <Icon
              icon="iconamoon:arrow-right-2-duotone"
              className={cls(
                "w-full h-full transition-all flex-none overflow-hidden",
                expand ? "rotate-90" : "rotate-y-0"
              )}
            />
          ) : (
            ""
          )}
        </div>
        <p
          className="leading-6 truncate cursor-pointer flex-grow"
          title={outLineItem.text}
        >
          {outLineItem.text}
        </p>
      </div>
      {hasChildren ? (
        <div
          className={cls(
            "overflow-hidden grid grid-cols-[1fr] transition-all",
            expand ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          )}
        >
          <OutLineList
            activeId={activeId}
            level={level + 1}
            outLineList={outLineItem.children}
          />
        </div>
      ) : (
        ""
      )}
    </li>
  );
}
