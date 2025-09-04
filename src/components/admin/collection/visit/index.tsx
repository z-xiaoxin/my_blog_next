"use client";

import { IResRows } from "@/api/common/interface";
import { TableColumnProps } from "@arco-design/web-react";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EFormItemType } from "@/components/admin/common/interface";
import AdminCommonDataDash, {
  IAdminCommonDataDashProps,
} from "@/components/admin/common/dataDash";
import { ICollectItem, ICollectListReqBody } from "@/api/collect/interface";
import { dashCollectApi } from "@/api/collect";

function CollectionVisit() {
  const [queryForm, setQueryForm] = useState<ICollectListReqBody>({
    event: "",
    page: 1,
    page_size: 30,
  });
  const [collectInfo, setCollectInfo] = useState<IResRows<ICollectItem>>({
    rows: [],
    total: 0,
  });
  const [tableLoading, setTableLoading] = useState(false);

  const refreshData = useCallback((form) => {
    setTableLoading(true);
    dashCollectApi
      .getList(form)
      .then((res) => {
        setCollectInfo(res);
        console.log("suc");
      })
      .finally(() => {
        setTableLoading(false);
      });
  }, []);

  const columns = useMemo<TableColumnProps<ICollectItem>[]>(() => {
    return [
      {
        title: "事件",
        dataIndex: "event",
        width: 140,
      },
      {
        title: "路由",
        dataIndex: "url",
        ellipsis: true,
      },
      {
        title: "IP",
        dataIndex: "ip",
        width: 160,
      },
      {
        title: "UA",
        dataIndex: "ua",
        width: 220,
        ellipsis: true,
      },
      {
        title: "收集时间",
        dataIndex: "ts",
        width: 180,
        render: (value: number) =>
          value && dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
      },
      // {
      //   title: "操作",
      //   fixed: "right",
      //   width: 100,
      //   render: (_, item) => (
      //     <div className="flex gap-x-2">
      //       <Button
      //         type="primary"
      //         shape="circle"
      //         icon={<IconEdit />}
      //         onClick={() => {
      //           console.log(item);
      //         }}
      //       ></Button>

      //       <Popconfirm
      //         focusLock
      //         title="确认删除此文章?"
      //         onOk={() => {
      //           dashArticleApi.deleteOne(item._id).then(() => {
      //             console.log("删除成功");
      //             refreshData(queryForm);
      //           });
      //         }}
      //         onCancel={() => {}}
      //       >
      //         <Button
      //           type="primary"
      //           status="danger"
      //           shape="circle"
      //           icon={<IconDelete />}
      //         ></Button>
      //       </Popconfirm>
      //     </div>
      //   ),
      // },
    ];
  }, []);

  useEffect(() => {
    refreshData(queryForm);
  }, []);

  const handleQuery = useCallback(
    (params?: Partial<ICollectListReqBody>) => {
      const newQueryForm = { ...queryForm, ...(params ?? {}) };
      if (params) setQueryForm(newQueryForm);
      refreshData(newQueryForm);
    },
    [queryForm, refreshData]
  );

  const tabConfig = useMemo<IAdminCommonDataDashProps["dashConfig"]>(() => {
    return [
      {
        tabKey: "collectVisit",
        tabTitle: "统计列表",
        searchBarConfig: {
          formData: queryForm,
          setFormData: setQueryForm,
          formList: [
            {
              field: "event",
              label: "事件",
              type: EFormItemType.Select,
              props: {
                autoWidth: false,
                options: [
                  { label: "全部", value: "" },
                  { label: "page_view", value: "page_view" },
                ],
                placeholder: "请选择事件",
                onChange: (value) => {
                  handleQuery({ event: value });
                  // console.log("123", value);
                },
              },
            },
          ],
          onSearch: () => handleQuery({ page: 1 }),
          onRefresh: () => refreshData(queryForm),
        },
        tableConfig: {
          columns,
          data: collectInfo.rows,
          loading: tableLoading,
          tableLayoutFixed: true,
        },
        paginationConfig: {
          total: collectInfo.total,
          current: queryForm.page,
          pageSize: queryForm.page_size,
          onChange: (page, page_size) => {
            handleQuery({ page, page_size });
          },
          onPageSizeChange: (page_size) => {
            setQueryForm({ ...queryForm, page_size, page: 1 });
          },
        },
      },
    ];
  }, [collectInfo, columns, handleQuery, queryForm, refreshData, tableLoading]);

  return <AdminCommonDataDash dashConfig={tabConfig} />;
}
export default CollectionVisit;
