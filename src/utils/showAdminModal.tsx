import React from "react";
import ReactDOM from "react-dom/client";
import ModalWrapper from "@/components/common/ModalWrapper";

export interface IShowAdminModalProps {
  title: string;
  content: React.ComponentType<any>; // 动态传入的组件
  header?: React.ComponentType<any>;
  footer?: React.ComponentType<any>;
  props?: Record<string, any>; // 组件的 props
  onBeforeClose?: () => Promise<void> | void; // 关闭前钩子
}

export const showAdminModal = <T extends object | undefined = any>(
  props: IShowAdminModalProps
): Promise<T> => {
  return new Promise((resolve, reject) => {
    // 创建挂载点
    const container = document.createElement("div");
    document.body.appendChild(container);

    // 关闭函数
    const close = async (data?: T, isReject = false) => {
      if (props.onBeforeClose) await props.onBeforeClose();
      setTimeout(() => {
        root.unmount();
        container.remove();
      }, 150);
      if (isReject) reject(data);
      else resolve(data as T);
    };

    // 包装 Modal，传递控制函数
    const RenderModalWrapper = () => ModalWrapper<T>({ ...props, close });

    // 创建 React 根实例
    const root = ReactDOM.createRoot(container);
    root.render(<RenderModalWrapper />);
  });
};
