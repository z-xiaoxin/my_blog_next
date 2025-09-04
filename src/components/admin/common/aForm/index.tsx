"use client";

import FormItem from "@arco-design/web-react/es/Form/form-item";
import { EFormItemType, IFormItem } from "../interface";
import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  Select,
} from "@arco-design/web-react";
import { Dispatch, SetStateAction } from "react";
import { IconRefresh, IconSearch } from "@arco-design/web-react/icon";

export interface IAdminCommonAFormProps {
  formData: Record<string, any>;
  setFormData: Dispatch<SetStateAction<any>>;
  formList: IFormItem[];
  formProps?: FormProps;
}

export interface IAdminCommonSearchBarProps extends IAdminCommonAFormProps {
  onSearch?: () => void;
  onRefresh?: () => void;
}

function AdminCommonAForm({
  formData,
  setFormData,
  formList,
  formProps,
}: IAdminCommonAFormProps) {
  const updateFormData = (field: string, value: any) =>
    setFormData({ ...formData, [field]: value });

  return (
    <Form {...formProps}>
      {formList.map((item) => {
        return (
          <FormItem key={item.field} label={item.label} field={item.field}>
            {item.type === EFormItemType.Custom &&
              item.render &&
              item.render({ formData, setFormData, formList, formProps }, item)}

            {item.type === EFormItemType.Input && (
              <Input
                {...item.props}
                value={formData[item.field]}
                onChange={(value) => updateFormData(item.field, value)}
              />
            )}

            {item.type === EFormItemType.Select && (
              <Select
                {...item.props}
                value={formData[item.field]}
                onChange={(value, e) => {
                  if (item.props?.onChange) item.props?.onChange(value, e);
                  else updateFormData(item.field, value);
                }}
              />
            )}

            {item.type === EFormItemType.Textarea && (
              <Input.TextArea
                {...item.props}
                value={formData[item.field]}
                onChange={(value) => updateFormData(item.field, value)}
              />
            )}

            {item.type === EFormItemType.InputNumber && (
              <InputNumber
                {...item.props}
                value={formData[item.field]}
                onChange={(value) => updateFormData(item.field, value)}
              />
            )}
          </FormItem>
        );
      })}
    </Form>
  );
}

export default AdminCommonAForm;

export function AdminCommonSearchBar(props: IAdminCommonSearchBarProps) {
  return (
    <div className="flex justify-between w-full mb-2">
      <AdminCommonAForm
        {...props}
        formProps={{ layout: "inline" }}
      ></AdminCommonAForm>
      <div className="flex-none grid grid-cols-2 gap-2">
        <Button
          shape="circle"
          type="default"
          icon={<IconRefresh />}
          onClick={props.onRefresh}
        />
        <Button
          shape="circle"
          type="primary"
          icon={<IconSearch />}
          onClick={props.onSearch}
        />
      </div>
    </div>
  );
}
