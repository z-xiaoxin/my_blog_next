import {
  Pagination,
  PaginationProps,
  Table,
  TableProps,
  Tabs,
} from "@arco-design/web-react";
import { AdminCommonSearchBar, IAdminCommonSearchBarProps } from "../aForm";
import { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "@/utils/handle";
const TabPane = Tabs.TabPane;

export interface IAdminCommonDataDashProps {
  dashConfig: {
    tabKey: string;
    tabTitle: string;
    searchBarConfig: IAdminCommonSearchBarProps;
    tableConfig: TableProps;
    paginationConfig?: PaginationProps;
    contentComponent?: React.ReactNode;
  }[];
}

function AdminCommonDataDash({ dashConfig }: IAdminCommonDataDashProps) {
  /** 表格 scroll 中 y 属性的值 为了表格内滚动 */
  const [scrollYHeight, setScrollYHeight] = useState(0);
  const [activeTabKey, setActiveTabKey] = useState(dashConfig[0].tabKey);

  /** 表格的 wrapper 在挂载时获取表格高度 为了表格内滚动 */
  const tableWrapperRef = useRef<HTMLDivElement>(null);

  const activeTab = useMemo(
    () =>
      dashConfig.find((item) => item.tabKey === activeTabKey) ?? dashConfig[0],
    [dashConfig, activeTabKey]
  );

  /** 计算并更新 scrollYHeight */
  const updateScrollHeight = () => {
    if (tableWrapperRef.current) {
      const tableHeaderHeight =
        (tableWrapperRef.current
          .querySelector(".arco-table-header")
          ?.querySelector("table")?.offsetHeight ?? 44) + 1;

      setScrollYHeight(
        Math.max(0, tableWrapperRef.current.offsetHeight - tableHeaderHeight)
      );
    }
  };

  useEffect(() => {
    // 切换tab时重新计算 scrollYHeight
    if (!activeTab.contentComponent) updateScrollHeight();
  }, [activeTab]);

  useEffect(() => {
    // window resize 时 重新计算 scrollYHeight
    const resizeTableScrollOnResize = debounce(updateScrollHeight);
    window.addEventListener("resize", resizeTableScrollOnResize);
    return () =>
      window.removeEventListener("resize", resizeTableScrollOnResize);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <Tabs className="flex-none" tabPosition="top" onChange={setActiveTabKey}>
        {dashConfig.map((item) => {
          return <TabPane key={item.tabKey} title={item.tabTitle}></TabPane>;
        })}
      </Tabs>

      <>
        {activeTab.contentComponent ? (
          activeTab.contentComponent
        ) : (
          <div className="w-full flex-grow flex flex-col items-center pt-3 overflow-hidden">
            <AdminCommonSearchBar {...activeTab.searchBarConfig} />

            <div
              ref={tableWrapperRef}
              className="w-full flex-grow overflow-hidden"
            >
              <Table
                pagination={false}
                tableLayoutFixed={true}
                scroll={{
                  y: scrollYHeight,
                }}
                {...activeTab.tableConfig}
              />
            </div>

            {activeTab.paginationConfig && (
              <Pagination
                className={"mt-2"}
                sizeCanChange
                {...activeTab.paginationConfig}
              />
            )}
          </div>
        )}
      </>
    </div>
  );
}

export default AdminCommonDataDash;
