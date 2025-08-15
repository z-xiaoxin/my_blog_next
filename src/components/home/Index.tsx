import classname from "classnames/bind";
import IndexStyle from "./index.module.scss";

const indexCls = classname.bind(IndexStyle);

function HomeIndex() {
  return <div className={indexCls("xx-home")}></div>;
}

export default HomeIndex;
