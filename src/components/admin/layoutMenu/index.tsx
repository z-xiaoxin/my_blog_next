"use client";

import { Menu } from "@arco-design/web-react";
import { useState } from "react";
import "./index.scss";
import { adminMenuList } from "../menu";
import { useMatches, useNavigate } from "react-router";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

function AdminLayoutMenu() {
  const [collapse, setCollapse] = useState(false);
  const matches = useMatches();
  console.log("matches", matches);

  const navigate = useNavigate();

  const [activeKey, setActiveKey] = useState<string[]>(
    matches.at(-1)?.pathname ? [matches.at(-1)?.pathname ?? ""] : []
  );
  const [openKeys, setOpenKeys] = useState<string[]>(
    matches[0]?.pathname ? [matches[0]?.pathname ?? ""] : []
  );

  return (
    <Menu
      className="flex-none"
      style={{ width: 200, borderRadius: 4 }}
      collapse={collapse}
      defaultOpenKeys={openKeys}
      defaultSelectedKeys={activeKey}
      onClickMenuItem={(key: string, event, keyPath: string[]) => {
        console.log(key, event, keyPath);
        navigate(`/${key}`);
      }}
    >
      {adminMenuList.map((item) => {
        return (
          <SubMenu
            key={item.path}
            title={
              <>
                {item.icon} {item.title}
              </>
            }
          >
            {item.children.map((i) => {
              return (
                <MenuItem key={item.path + `/${i.path}`}>{i.title}</MenuItem>
              );
            })}
          </SubMenu>
        );
      })}
    </Menu>
  );
}

export default AdminLayoutMenu;
