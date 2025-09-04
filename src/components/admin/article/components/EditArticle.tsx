import { IArticleDetail } from "@/api/article/interface";
import AdminCommonAForm from "../../common/aForm";
import { EFormItemType } from "../../common/interface";
import { useCallback, useState } from "react";
import MDEditor from "../../common/MDEditor";
import FooterButton from "@/components/common/FooterButton";
import { dashArticleApi } from "@/api/article";

function EditArticle({
  articleInfo,
  onSuccess,
  close,
}: {
  articleInfo: IArticleDetail;
  onSuccess: () => void;
  close: () => void;
}) {
  const [editFormData, setEditFormData] = useState<IArticleDetail>(articleInfo);

  const subFunc = useCallback(async () => {
    try {
      await dashArticleApi.updateOne(editFormData._id, editFormData);
      onSuccess();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }, [editFormData, onSuccess]);

  return (
    <div className="w-[80vw] bg-primary-bg rounded-md px-4">
      <AdminCommonAForm
        formData={editFormData}
        setFormData={setEditFormData}
        formProps={{ layout: "vertical" }}
        formList={[
          {
            label: "文章标题",
            field: "title",
            type: EFormItemType.Input,
            props: {
              placeholder: "请输入文章标题",
            },
          },
          {
            label: "内容",
            field: "content",
            type: EFormItemType.Custom,
            render: ({ formData }) => (
              <MDEditor
                value={formData.content}
                setValue={(value: string) =>
                  setEditFormData({ ...editFormData, content: value })
                }
              />
            ),
            props: {
              placeholder: "请输入文章内容",
            },
          },
        ]}
      />

      <FooterButton closeModal={close} subFunc={subFunc} />
    </div>
  );
}

export default EditArticle;
