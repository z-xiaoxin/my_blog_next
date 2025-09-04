import cls from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import "./modalWrapper.scss";
import { eventStop } from "@/utils/handle";
import { Button } from "@arco-design/web-react";
import { IconClose } from "@arco-design/web-react/icon";
import { IShowAdminModalProps } from "@/utils/showAdminModal";
import FooterButton from "./FooterButton";

type IModalWrapperProps<T extends object | undefined> = Omit<
  IShowAdminModalProps,
  "onBeforeClose"
> & {
  close: (data?: T, isReject?: boolean) => Promise<void>;
};

export default function ModalWrapper<T extends object | undefined>({
  content: Content,
  title,
  header: Header,
  footer: Footer,
  props,
  close,
}: IModalWrapperProps<T>) {
  const [show, setShow] = useState(false);
  const mouseDownDom = useRef<Element | null>(null);

  useEffect(() => {
    setShow(true);
  }, []);

  const setShowFalse = () => {
    setShow(false);
  };

  const closeModal = useCallback(() => {
    setShowFalse();
    close(undefined, true);
  }, [close]);

  return (
    <div
      onMouseUp={(e) => {
        if (mouseDownDom.current === e.target) closeModal();
        mouseDownDom.current = null;
      }}
      onMouseDown={(e) => (mouseDownDom.current = e.currentTarget as Element)}
      className={cls(
        "fixed inset-0 bg-[rgba(0,0,0,0.3)] z-[2000] py-20 flex  justify-center overflow-y-scroll transition-all duration-300",
        show ? "opacity-100" : "opacity-0"
      )}
      style={{ scrollbarWidth: "none" }}
    >
      <div
        // onClick={(e) => eventStop(e)}
        className={cls(
          "bg-primary-bg rounded-md transition-all duration-300 w-fit xx-modal-wrapper h-fit",
          show ? "" : "hidden-wrapper"
        )}
      >
        {Header ? (
          <Header />
        ) : (
          <div className="flex items-center justify-between gap-x-2 p-4 mb-2 before:content-[''] before:w-[calc(100%-32px)] relative before:absolute before:bottom-0 before:left-4 before:h-px before:bg-primary-border">
            <p className="text-[16px] text-primary-content font-medium">
              {title}
            </p>
            <div
              onClick={closeModal}
              className="rounded-full w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-primary-color-10percent transition-all"
            >
              <IconClose className="w-full h-full" />
            </div>
          </div>
        )}

        <Content
          {...props}
          close={(data?: T) => {
            setShowFalse();
            close(data, false);
          }}
          reject={(err?: any) => {
            setShowFalse();
            close(err, true);
          }}
        />

        {Footer ? (
          <Footer />
        ) : (
          <FooterButton closeModal={closeModal} subFunc={() => {}} />
          // <div className="flex mt-2 items-center justify-end gap-x-2 p-4 py-2 before:content-[''] before:w-[calc(100%-32px)] relative before:absolute before:top-0 before:left-4 before:h-px before:bg-primary-border">
          //   <Button type="default" onClick={closeModal}>
          //     取消
          //   </Button>
          //   <Button type="primary">确定</Button>
          // </div>
        )}
      </div>
    </div>
  );
}
