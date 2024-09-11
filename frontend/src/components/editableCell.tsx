import { Form } from "antd";
import React, { useState, useRef, useContext, useEffect } from "react";
import {
  FormInstance,
  EditableCellProps,
  EditableRowProps,
  dataType,
} from "../Types/Types";
import type { InputRef } from "antd";
import { Input } from "antd";
import { AutoComplete, Flex, DatePicker } from "antd";
import type { AutoCompleteProps, DatePickerProps } from "antd";
import dayjs from "dayjs";

const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
const EditableContext = React.createContext<FormInstance<any> | null>(null);

export const handleSave = (
  row: dataType,
  dataSource: dataType[],
  setDataSource: React.Dispatch<React.SetStateAction<dataType[]>>
) => {
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

export const EditableCell: React.FC<
  React.PropsWithChildren<EditableCellProps>
> = ({
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
  const save = async (event?:any) => {
    if(event.value === ""){
      alert("cant entey empty value") // change to other message component if needed
    }else{
      try {
        const values = {[dataIndex]: event.value}
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
    }
  };

  let childNode = children;

  if (editable) {
    if (editing) {
      if (restProps.cellEditType === "1") {
        childNode = (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}
            rules={[{ required: true, message: `${title} is required.` }]}
          >
            <Input ref={inputRef} onPressEnter={(event)=>{
              save(event.target)
            }} onBlur={(event)=>{
              save(event.target)
            }} />
          </Form.Item>
        );
      }
      if (restProps.cellEditType === "2") {
        childNode = (
          <Form.Item style={{ margin: 0 }}>
            <AutoComplete
              popupClassName="certain-category-search-dropdown"
              popupMatchSelectWidth={150}
              style={{ display:'flex', width: 120, height:32.19, alignContent:'center' }}
              options={options}
              size="large"
              defaultValue={record[dataIndex]}
              filterOption={true}
              onBlur={(event) => {
                save(event.target);
              }}
            ></AutoComplete>
          </Form.Item>
        );
      }
      if (restProps.cellEditType === "3") {
        childNode = (
          <Form.Item style={{ margin: 0 }}>
            <DatePicker
              defaultValue={dayjs(record[dataIndex], dateFormatList[0])}
              format={dateFormatList}
              needConfirm={true}
              variant="borderless"
              size="small"
              onOk={(event) => {
                save({value : dayjs(event).format(dateFormatList[0])});
              }}
            />
          </Form.Item>
        );
      }
    } else {
      childNode = (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingInlineEnd: 24 }}
          onClick={() => {
            toggleEdit();
          }}
        >
          {children}
        </div>
      );
    }
  }

  return <td {...restProps}>{childNode}</td>;
};

export const EditableRow: React.FC<EditableRowProps> = ({
  index,
  ...props
}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const Title: React.FC<Readonly<{ title?: string }>> = (props) => (
  <Flex align="center" justify="space-between">
    {props.title}
  </Flex>
);

const renderItem = (title: string) => ({
  value: title,
  label: (
    <Flex align="center" justify="space-between">
      {title}
    </Flex>
  ),
});

const options = [
  {
    label: <Title title="כלים" />,
    options: [
      renderItem("Merkava 4"),
      renderItem("Karnatz"),
      renderItem("barkan"),
      renderItem("vazir"),
      renderItem("yoav"),
      renderItem("Katzar"),
    ],
  },
];
