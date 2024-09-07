import React from "react";
import { Form, Input, InputNumber } from "antd";
import { EditableRowProps, dataType } from "../Types/Types";
import { AutoComplete, Flex, DatePicker } from "antd";
import type { AutoCompleteProps, DatePickerProps } from "antd";

export const EditableCellRow: React.FC<
  React.PropsWithChildren<EditableRowProps>
> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const getInputNode = () => {
    switch (restProps.cellEditType) {
      case "1":
        return <Input />;
      case "2":
        return <AutoComplete options={[]} />;
      case "3":
        return <DatePicker />;

      default:
        return <Input />;
    }
  };
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const isEditing = (record: dataType, editingKey: string) =>
  record.key === editingKey;

export const edit = (
  record: Partial<dataType> & { key: React.Key },
  setEditingRowMode: React.Dispatch<React.SetStateAction<boolean>>,
  form: any,
  setEditingKey: React.Dispatch<React.SetStateAction<string>>
) => {
  setEditingRowMode(true);
  form.setFieldsValue({ name: "", age: "", address: "", ...record });
  setEditingKey(record.key);
};

export const cancel = (
  setEditingRowMode: React.Dispatch<React.SetStateAction<boolean>>,
  setEditingKey: React.Dispatch<React.SetStateAction<string>>
) => {
  setEditingRowMode(false);
  setEditingKey("");
};

export const save = async (
  key: React.Key,
  setEditingRowMode: React.Dispatch<React.SetStateAction<boolean>>,
  form: any,
  dataSource: dataType[],
  setDataSource: React.Dispatch<React.SetStateAction<dataType[]>>,
  setEditingKey: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    setEditingRowMode(false);
    const row = (await form.validateFields()) as dataType;

    const newData = [...dataSource];
    const index = newData.findIndex((item) => key === item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setDataSource(newData);
      setEditingKey("");
    } else {
      newData.push(row);
      setDataSource(newData);
      setEditingKey("");
    }
  } catch (errInfo) {
    console.log("Validate Failed:", errInfo);
  }
};
