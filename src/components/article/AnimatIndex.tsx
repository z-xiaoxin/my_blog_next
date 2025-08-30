"use client";

import indexStyle from "./index.module.scss";
import classNames from "classnames";
import classNamesBind from "classnames/bind";
import { useEffect, useState } from "react";

const blogCls = classNamesBind.bind(indexStyle);

const skills = [
  {
    name: "react",
    level: 5,
    content: "react is ...",
  },
  {
    name: "vue",
    level: 5,
    content: "vue is ...",
  },
  {
    name: "angular",
    level: 5,
    content: "angular is ...",
  },
];

function Index() {
  const [useVertical, setUseVertical] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUseVertical(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={classNames(
        "p-5 w-full flex justify-center overflow-hidden mx-auto relative items-center",
        blogCls("container"),
        useVertical ? blogCls("container-vertical") : ""
      )}
    >
      测试组件
      <ul
        className={classNames(
          "w-full flex flex-col gap-2 p-2 rounded-md",
          blogCls("list-wrapper"),
          useVertical ? blogCls("list-wrapper-vertical") : ""
        )}
      >
        {skills.map((i, idx) => (
          <li
            className="w-full h-50 rounded-md bg-[#409eff] flex items-center justify-center text-white"
            key={idx}
          >
            {i.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Index;
