"use client";

import cls from "classnames";
import { throttle } from "@/utils/handle";
import {
  MouseEventHandler,
  UIEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";

export default function Scrollbar({
  children,
  direction = "vertical",
  scrollClassName = "",
}: {
  children: React.ReactNode;
  direction?: "vertical" | "horizontal";
  scrollClassName?: string;
}) {
  const verticalWrapperClass = "top-0 right-0 w-1.5 h-full";
  const horizontalWrapperClass = "bottom-0 left-0 h-1.5 w-full";
  const [scrollContentStyle, setScrollContentStyle] = useState({});

  useEffect(() => {
    if (direction === "vertical")
      setScrollContentStyle({ overflowX: "scroll" });
    else setScrollContentStyle({ overflowY: "scroll" });
  }, [direction]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollChildRef = useRef<HTMLDivElement>(null);

  /** 是否使用滚动条 */
  const [useScroll, setUseScroll] = useState(false);
  /** 滚动条大小 */
  const [scrollBarSize, setScrollBarSize] = useState(0);
  /** 滚动条偏移量 */
  const [scrollBarOffset, setScrollBarOffset] = useState(0);
  /** 是否正在滚动 */
  const [scrolling, setScrolling] = useState(false);
  /** 滚动条信息 */
  /** ratio: 滚动条偏移量与内容滚动偏移量的比率
   * barMaxOffset: 滚动条最大偏移量
   */
  const [scrollInfo, setScrollInfo] = useState({
    ratio: 1,
    barMaxOffset: 0,
  });
  /** 滚动中的信息 */
  const scrollingInfo = useRef({
    startPosition: 0,
    startBarOffset: 0,
    startContentOffset: 0,
  });

  useEffect(() => {
    const obInstance = new ResizeObserver(() => {
      const barSizeInfo = {
        offsetSize: 0,
        scrollSize: 0,
      };

      if (direction === "vertical") {
        barSizeInfo.offsetSize = scrollRef.current?.offsetHeight ?? 0;
        barSizeInfo.scrollSize = scrollRef.current?.scrollHeight ?? 0;
      } else {
        barSizeInfo.offsetSize = scrollRef.current?.offsetWidth ?? 0;
        barSizeInfo.scrollSize = scrollRef.current?.scrollWidth ?? 0;
      }

      if (barSizeInfo.scrollSize > barSizeInfo.offsetSize) {
        const barSize = ~~(
          (barSizeInfo.offsetSize ?? 0) *
          ((barSizeInfo.offsetSize ?? 0) / (barSizeInfo.scrollSize ?? 1))
        );
        setScrollBarSize(barSize);
        setUseScroll(true);
        setScrollInfo({
          ratio:
            (barSizeInfo.offsetSize - barSize) /
            (barSizeInfo.scrollSize - barSizeInfo.offsetSize),
          barMaxOffset: barSizeInfo.offsetSize - barSize,
        });
      }
    });

    scrollChildRef.current && obInstance.observe(scrollChildRef.current);

    return () => {
      obInstance.disconnect();
    };
  }, []);

  const onScroll: UIEventHandler<HTMLDivElement> = () => {
    if (scrolling) return;
    const offset =
      (direction === "vertical"
        ? scrollRef.current?.scrollTop
        : scrollRef.current?.scrollLeft) ?? 0;
    setScrollBarOffset(Math.ceil(offset * scrollInfo.ratio));
  };

  const updateScrollPosition = (distance: number) => {
    /** scrollbar finally position */
    let barPosition = 0;
    barPosition = Math.max(0, scrollingInfo.current.startBarOffset + distance);
    barPosition = Math.min(barPosition, scrollInfo.barMaxOffset);

    const contentDistance = Math.ceil(distance / scrollInfo.ratio);

    setScrollBarOffset(barPosition);
    scrollRef.current &&
      (scrollRef.current[
        direction === "vertical" ? "scrollTop" : "scrollLeft"
      ] = scrollingInfo.current.startContentOffset + contentDistance);
  };

  const onScrollbarMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    setScrolling(true);
    scrollingInfo.current = {
      startPosition: direction === "vertical" ? e.pageY : e.pageX,
      startBarOffset: scrollBarOffset,
      startContentOffset:
        scrollRef.current?.[
          direction === "vertical" ? "scrollTop" : "scrollLeft"
        ] ?? 0,
    };
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = throttle((e: MouseEvent) => {
    const scrollDistance =
      (direction === "vertical" ? e.pageY : e.pageX) -
      scrollingInfo.current.startPosition;
    updateScrollPosition(scrollDistance);
  });

  const onMouseUp = () => {
    setScrolling(false);
    document.body.style.userSelect = "";
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onClickScrollTrack: MouseEventHandler<HTMLDivElement> = (e) => {
    const scrollWrapper = scrollRef.current?.offsetParent as HTMLDivElement;

    let distanceFromTop: number, clickPosition: number, totalDistance: number;
    if (direction === "vertical") {
      distanceFromTop =
        scrollWrapper.getBoundingClientRect().top + window.scrollY;
      clickPosition = e.pageY - distanceFromTop;
      totalDistance = scrollRef.current?.offsetHeight ?? 0;
    } else {
      distanceFromTop =
        scrollWrapper.getBoundingClientRect().left + window.scrollX;
      clickPosition = e.pageX - distanceFromTop;
      totalDistance = scrollRef.current?.offsetWidth ?? 0;
    }

    if (clickPosition < scrollBarSize / 2) {
      updateScrollPosition(-scrollInfo.barMaxOffset);
    } else if (totalDistance - clickPosition < scrollBarSize / 2) {
      updateScrollPosition(scrollInfo.barMaxOffset);
    } else {
      updateScrollPosition(clickPosition - scrollBarSize / 2);
    }
  };

  return (
    <div className={"w-full h-full relative group " + scrollClassName}>
      {useScroll && (
        <div
          onClick={onClickScrollTrack}
          style={{
            transform: `translate${direction === "vertical" ? "Y" : "X"}(4px)`,
          }}
          className={
            "absolute bg-transparent cursor-pointer transition-all opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 " +
            (scrolling ? "opacity-100 " : "") +
            (direction === "vertical"
              ? verticalWrapperClass
              : horizontalWrapperClass)
          }
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={
              "absolute z-10 top-0 left-0 rounded-full select-none bg-gray-300 hover:bg-gray-100 cursor-pointer " +
              (scrolling ? "bg-gray-100 " : "") +
              (direction === "vertical" ? "w-full" : "h-full")
            }
            style={{
              transition: "background 0.3s ease-out, transform 0.05s linear",
              transform: `translate${
                direction === "vertical" ? "Y" : "X"
              }(${scrollBarOffset}px)`,
              ...(direction === "vertical"
                ? { height: scrollBarSize + "px" }
                : { width: scrollBarSize + "px" }),
            }}
            onMouseDown={onScrollbarMouseDown}
          ></div>
        </div>
      )}
      <div
        ref={scrollRef}
        style={{ scrollbarWidth: "none", ...scrollContentStyle }}
        className={cls("h-full nax-h-full")}
        onScroll={onScroll}
      >
        <div className="w-fit h-fit" ref={scrollChildRef}>
          {children}
        </div>
      </div>
    </div>
  );
}
