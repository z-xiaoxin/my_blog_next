"use client";

import classname from "classnames/bind";
import IndexStyle from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import { getTargetWord } from "@/utils/effects";

const indexCls = classname.bind(IndexStyle);

function HomeIndex() {
  const [name, setName] = useState("XIAO XIN");
  const nameAnimationRunningStatus = useRef({ finished: true });

  const onMouseEnterName = () => {
    if (nameAnimationRunningStatus.current.finished) {
      nameAnimationRunningStatus.current = getTargetWord(name, setName);
    }
  };

  useEffect(() => {
    console.log("home index loaded");
  }, []);

  return (
    <div className={indexCls("xx-home")}>
      <div className={indexCls("xx-home-section")}>
        <h1 className="font-bold md:text-[50px] text-[30px] text-center md:leading-18 leading-10 mb-2">
          这里是{" "}
          <span
            onMouseEnter={onMouseEnterName}
            className="font-black text-primary-color"
          >
            {name}
          </span>{" "}
          的博客网站
        </h1>
      </div>
      {/* <div className={indexCls("xx-home-section")}>
        <div className="w-fit relative group">
          <p className="px-3 py-2 rounded-full bg-primary-color text-white text-[18px] font-bold relative z-20 leading-6 cursor-pointer">
            前端
          </p>
          <ul className="group-hover:translate-y-10 group-hover:duration-150 duration-600 transition-all absolute z-10 top-0 left-0 px-1 py-1 flex flex-col items-center w-full text-[16px]">
            <li className="leading-5 cursor-pointer text-center bg-primary-color text-white rounded-full px-2 py-1">
              vue
            </li>
            <li className="leading-5 cursor-pointer text-center bg-primary-color text-white rounded-full px-2 py-1 absolute top-1 group-hover:translate-y-8 group-hover:duration-300 transition-all duration-450">
              react
            </li>
            <li className="leading-5 cursor-pointer text-center bg-primary-color text-white rounded-full px-2 py-1 absolute top-1 group-hover:translate-y-16 group-hover:duration-450 transition-all duration-450">
              solid
            </li>
            <li className="leading-5 cursor-pointer text-center bg-primary-color text-white rounded-full px-2 py-1 absolute top-1 group-hover:translate-y-24 group-hover:duration-600 transition-all duration-450">
              angular
            </li>
          </ul>
        </div>
      </div> */}
    </div>
  );
}

export default HomeIndex;
