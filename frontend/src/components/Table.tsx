import React, { useState, useRef } from "react";
import { dataType, ColumnTypes } from "../Types/Types";
import type { InputRef, TableProps } from "antd";
import { Table as TableExt } from "antd-table-ext";
import { EditableCell, EditableRow } from "../components/editableCell";
import { getColumnSearchProps } from "../functions/filter";
import { expandedRowRender } from "../functions/NestedTable";
import { Form, Popconfirm, Typography } from "antd";
import {
  EditableCellRow,
  isEditing,
  edit,
  cancel,
  save,
} from "../components/editableRow";

const Table: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [dataSource, setDataSource] = useState<dataType[]>([
    /*Data Example init*/
    {
      key: "1", //uniqe key
      makat: "123456",
      kshirut: 32,
      name: "merkava 4",
    },
    {
      key: "2",
      makat: "234567",
      kshirut: 50,
      name: "karnatz ",
    },
    {
      key: "3",
      makat: "989768",
      kshirut: 40,
      name: "karnatz ",
    },
    {
      key: "4",
      makat: "412367",
      kshirut: 90,
      name: "karnatz ",
    },
  ]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [editingRowMode, setEditingRowMode] = useState(false); // if false editing mode is cell if true editing for all the row

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  } & any)[] = [
    /*Column Example init*/
    {
      title: 'מק"ט',
      dataIndex: "makat",
      key: "makat",
      ...getColumnSearchProps(
        "makat",
        searchInput,
        setSearchedColumn,
        setSearchText
      ),
      resizable: true,
      editable: true,
    },
    {
      title: "אחוזי כשירות כללית",
      dataIndex: "kshirut",
      key: "kshirut",
      ...getColumnSearchProps(
        "kshirut",
        searchInput,
        setSearchedColumn,
        setSearchText
      ),
      resizable: true,
      editable: true,
      defaultSortOrder: "descend",
      sorter: (a: any, b: any) => a.kshirut - b.kshirut,
    },
    {
      title: "שם אמצעי",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps(
        "name",
        searchInput,
        setSearchedColumn,
        setSearchText
      ),
      resizable: true,
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: dataType) => {
        const editable = isEditing(record, editingKey);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key,setEditingRowMode,form,dataSource,setDataSource,setEditingKey)}
              style={{ marginInlineEnd: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => {
                cancel(setEditingRowMode, setEditingKey);
              }}
            >
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record, setEditingRowMode, form, setEditingKey)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const handleSave = (row: dataType) => {
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
  const columns: TableProps<dataType>["columns"] = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: dataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const mergedColumns: TableProps<dataType>["columns"] = defaultColumns.map(
    (col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: dataType) => ({
          record,
          inputType: col.dataIndex === "age" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record, editingKey),
        }),
      };
    }
  );

  const onChange: TableProps<dataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  console.log(editingRowMode);

  return (
    <div className="Pagediv">
      <div className="Tablediv">
        <Form form={form} component={false}>
          <TableExt
            //style={{ maxWidth: "500px" }}
            columns={editingRowMode === true ? mergedColumns : columns}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            dataSource={dataSource}
            bordered={true}
            components={
              editingRowMode === true
                ? { body: { cell: EditableCellRow } }
                : components
            }
            showSorterTooltip={{ target: "sorter-icon" }}
            onChange={onChange}
          />
        </Form>
      </div>
    </div>
  );
};

export default Table;
