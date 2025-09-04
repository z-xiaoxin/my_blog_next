"use client";

import { dashArticleApi } from "@/api/article";
import { IArticleListItem, IArticleListReqBody } from "@/api/article/interface";
import { IResRows } from "@/api/common/interface";
import { Button, Popconfirm, TableColumnProps } from "@arco-design/web-react";
import { IconDelete, IconEdit } from "@arco-design/web-react/icon";
import dayjs from "dayjs";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EFormItemType } from "../common/interface";
import AdminCommonDataDash, {
  IAdminCommonDataDashProps,
} from "../common/dataDash";

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
        ellipsis: true,
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

  const handleQuery = useCallback(
    (params?: Partial<IArticleListReqBody>) => {
      const newQueryForm = { ...queryForm, ...(params ?? {}) };
      if (params) setQueryForm(newQueryForm);
      refreshData(newQueryForm);
    },
    [queryForm, refreshData]
  );

  const tabConfig = useMemo<IAdminCommonDataDashProps["dashConfig"]>(() => {
    return [
      {
        tabKey: "articleList",
        tabTitle: "文章列表",
        searchBarConfig: {
          formData: queryForm,
          setFormData: setQueryForm,
          formList: [
            {
              field: "keyword",
              label: "标题",
              type: EFormItemType.Input,
              props: {
                placeholder: "请输入标题",
                onKeyUp: (e) => {
                  if (e.key === "Enter") handleQuery({ page: 1 });
                },
              },
            },
          ],
          onSearch: handleQuery,
          onRefresh: () => refreshData(queryForm),
        },
        tableConfig: {
          columns,
          data: articleInfo.rows,
          loading: tableLoading,
          tableLayoutFixed: true,
        },
        paginationConfig: {
          total: articleInfo.total,
          current: queryForm.page,
          pageSize: queryForm.page_size,
          onChange: (page) => {
            handleQuery({ page });
          },
          onPageSizeChange: (page_size) => {
            handleQuery({ page_size, page: 1 });
          },
        },
      },
    ];
  }, [articleInfo, columns, handleQuery, queryForm, refreshData, tableLoading]);

  return <AdminCommonDataDash dashConfig={tabConfig} />;
}
export default AdminArticleList;
