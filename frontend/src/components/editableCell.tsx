import { Form, } from "antd";
import React, { useState, useRef, useContext, useEffect } from "react";
import { FormInstance,EditableCellProps,EditableRowProps,dataType  } from "../Types/Types";
import type { InputRef} from "antd";
import { Input } from "antd";

const EditableContext = React.createContext<FormInstance<any> | null>(null);


export const handleSave = (row: dataType,dataSource:dataType[],setDataSource:React.Dispatch<React.SetStateAction<dataType[]>>) => {
  const newData = [...dataSource];
  const index = newData.findIndex((item) => row.key === item.key);
  const item = newData[index];
  newData.splice(index, 1, {
    ...item,
    ...row,
  });
  setDataSource(newData);
  // add fetch to db if needed
};

export const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;
  
    useEffect(() => {
      if (editing) {
        inputRef.current?.focus();
      }
    }, [editing]);
  
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };
  
    const save = async () => {
      try {
        const values = await form.validateFields();
  
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };
  
    let childNode = children;
  
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{ margin: 0 }}
          name={dataIndex}
          rules={[{ required: true, message: `${title} is required.` }]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingInlineEnd: 24 }}
          onClick={()=>{toggleEdit()}}
        >
          {children}
        </div>
      );
    }
  
    return <td {...restProps}>{childNode}</td>;
  };

  export const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };