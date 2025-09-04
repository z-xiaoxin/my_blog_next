import {
  FormItemProps,
  InputNumberProps,
  InputProps,
  SelectProps,
  TextAreaProps,
} from "@arco-design/web-react";
import { IAdminCommonAFormProps } from "./aForm";

/** 通用表单 通用表单项 */
export interface IFormItemBasic {
  label: string;
  field: string;
  formItemProps?: FormItemProps;
  render?: (
    value: IAdminCommonAFormProps,
    formItemConfig: IFormItem
  ) => React.ReactNode;
}

/** 通用表单 表单项类型 */
export enum EFormItemType {
  Input = "Input",
  Select = "Select",
  Textarea = "Textarea",
  InputNumber = "InputNumber",
  Custom = "Custom",
}

/** 通用表单 表单项类型与输入组件props映射 */
type FormItemPropsMap = {
  [EFormItemType.Input]: InputProps;
  [EFormItemType.Select]: SelectProps;
  [EFormItemType.Textarea]: TextAreaProps;
  [EFormItemType.InputNumber]: InputNumberProps;
  [EFormItemType.Custom]: object;
};

/** 通用表单 表单项 */
export type IFormItem = {
  [K in keyof FormItemPropsMap]: IFormItemBasic & {
    type: K;
    props?: FormItemPropsMap[K];
  };
}[keyof FormItemPropsMap];
