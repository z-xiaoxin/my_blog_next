import { Button } from "@arco-design/web-react";
import { useState } from "react";

function FooterButton({
  closeModal,
  subFunc,
}: {
  closeModal: () => void;
  subFunc: () => void;
}) {
  const [subLoading, setSubLoading] = useState(false);

  return (
    <div className="flex mt-2 items-center justify-end gap-x-2 p-4 py-2 before:content-[''] before:w-[calc(100%-32px)] relative before:absolute before:top-0 before:left-4 before:h-px before:bg-primary-border">
      <Button type="default" onClick={closeModal}>
        取消
      </Button>
      <Button
        loading={subLoading}
        type="primary"
        onClick={async () => {
          try {
            setSubLoading(true);
            await subFunc();
            closeModal();
          } catch (error) {
            setSubLoading(false);
          }
        }}
      >
        确定
      </Button>
    </div>
  );
}

export default FooterButton;
