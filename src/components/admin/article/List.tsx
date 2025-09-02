"use client";

import { dashArticleApi } from "@/api/article";
import { IArticleListItem, IArticleListReqBody } from "@/api/article/interface";
import { IResRows } from "@/api/common/interface";
import {
  Button,
  Popconfirm,
  Table,
  TableColumnProps,
} from "@arco-design/web-react";
import { IconDelete, IconEdit } from "@arco-design/web-react/icon";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";

// const columns: TableColumnProps<IArticleListItem>[] = [
//   {
//     title: "标题",
//     dataIndex: "title",
//     width: 200,
//   },
//   // {
//   //   title: "内容",
//   //   dataIndex: "content",
//   // },
//   {
//     title: "创建时间",
//     dataIndex: "create_at",
//     width: 180,
//     render: (value: number) =>
//       value && dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
//   },
//   {
//     title: "更新时间",
//     dataIndex: "update_at",
//     width: 180,
//     render: (value: number) =>
//       value && dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
//   },
//   {
//     title: "操作",
//     render: (_, item) => (
//       <div className="flex gap-x-1">
//         <Button
//           shape="circle"
//           icon={<IconEdit />}
//           onClick={() => {
//             console.log(item);
//           }}
//         ></Button>
//         <Button
//           shape="circle"
//           icon={<IconDelete />}
//           onClick={() => {
//             dashArticleApi.deleteOne(item._id).then(() => {
//               refreshData(queryForm);
//             });
//           }}
//         ></Button>
//       </div>
//     ),
//   },
// ];

function AdminArticleList() {
  const [queryForm, setQueryForm] = useState<IArticleListReqBody>({
    keyword: "",
    page: 1,
    page_size: 10,
  });
  const [articleInfo, setArticleInfo] = useState<IResRows<IArticleListItem>>({
    rows: [],
    total: 0,
  });
  const [tableLoading, setTableLoading] = useState(false);

  const refreshData = useCallback((form) => {
    setTableLoading(true);
    dashArticleApi
      .getList(form)
      .then((res) => {
        setArticleInfo(res);
      })
      .finally(() => {
        setTableLoading(false);
      });
  }, []);

  const columns = useMemo<TableColumnProps<IArticleListItem>[]>(() => {
    return [
      {
        title: "标题",
        dataIndex: "title",
        width: 200,
      },
      {
        title: "内容",
        dataIndex: "content",
        render: (value: string) => value.slice(0, 40),
      },
      {
        title: "创建时间",
        dataIndex: "create_at",
        width: 180,
        render: (value: number) =>
          value && dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        title: "更新时间",
        dataIndex: "update_at",
        width: 180,
        render: (value: number) =>
          value && dayjs(value).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        title: "操作",
        fixed: "right",
        width: 100,
        render: (_, item) => (
          <div className="flex gap-x-2">
            <Button
              type="primary"
              shape="circle"
              icon={<IconEdit />}
              onClick={() => {
                console.log(item);
              }}
            ></Button>

            <Popconfirm
              focusLock
              title="确认删除此文章?"
              onOk={() => {
                dashArticleApi.deleteOne(item._id).then(() => {
                  console.log("删除成功");
                  refreshData(queryForm);
                });
              }}
              onCancel={() => {}}
            >
              <Button
                type="primary"
                status="danger"
                shape="circle"
                icon={<IconDelete />}
              ></Button>
            </Popconfirm>
          </div>
        ),
      },
    ];
  }, [queryForm, refreshData]);

  useEffect(() => {
    refreshData(queryForm);
  }, []);

  return (
    <div>
      <Table
        loading={tableLoading}
        columns={columns}
        data={articleInfo.rows}
        pagination={{
          total: articleInfo.total,
          current: queryForm.page,
          pageSize: queryForm.page_size,
          onChange: (page) => {
            const newQueryForm = { ...queryForm, page };
            setQueryForm(newQueryForm);
            refreshData(newQueryForm);
          },
          onPageSizeChange: (page_size) => {
            const newQueryForm = { ...queryForm, page_size };
            setQueryForm(newQueryForm);
            refreshData(newQueryForm);
          },
        }}
      />
    </div>
  );
}

export default AdminArticleList;
