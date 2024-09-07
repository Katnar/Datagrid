import React, { useState, useRef, useContext } from "react";
import { dataType, ColumnTypes, Sorts } from "../Types/Types";
import type { InputRef, TableProps, CheckboxOptionType } from "antd";
import { Table as TableExt } from "antd-table-ext";
import { EditableCell, EditableRow } from "../components/editableCell";
import { getColumnSearchProps } from "../functions/filter";
import { expandedRowRender } from "../functions/NestedTable";
import { Form, Popconfirm, Typography, Checkbox } from "antd";
import {
  EditableCellRow,
  isEditing,
  edit,
  cancel,
  save,
} from "../components/editableRow";
import { SortContext } from "../store/FiltersCtx";
import { DataContext } from "../store/Data";
import { SortsPorps } from "../functions/Sorts";
import { SortOrder, SorterResult } from "antd/es/table/interface";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';

type OnChange = NonNullable<TableProps<dataType>["onChange"]>;

const Table: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [filterCard, setFilterCard] = useState(false);
  const { sortedInfo, setSortedInfo } = useContext(SortContext);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [editingRowMode, setEditingRowMode] = useState(false);
  const { dataSource, setDataSource } = useContext(DataContext);
  const [fixedColumns, setFixedColumns] = useState<
    { key: string; fixed: "left" | "right" | undefined }[]
  >([]);

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  } & any)[] = [
    /*Column Example init*/
    {
      //width: number | string (example: width:50) שימו לב שההגדרות נשמרות במאגר לוקלי בשביל להחל שינוי ניתן לרוקן את המאגר הלוקלי ולהפעיל מחדש את העמוד
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
      cellEditType: "1",
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
      //defaultSortOrder: "descend", //sorting by default to descend remove this line to set to default and disable default sorting
      sorter: {
        compare: (a: any, b: any) => a.kshirut - b.kshirut, // build in sort function (can set custom sort rules)
        multiple: 2, // multi-sort priority can change live while holding shift and selecting another column of choice
      },
      ...SortsPorps(sortedInfo, "kshirut"), // if outside sort insert SortOrder for current colKey
      cellEditType: "1", // non-edit =0 | edit = 1 | autocomplete = 2 | calendar = 3
    },
    {
      title: "כמות כלים",
      dataIndex: "sum",
      key: "sum",
      ...getColumnSearchProps(
        "sum",
        searchInput,
        setSearchedColumn,
        setSearchText
      ),
      resizable: true,
      editable: true,
      //defaultSortOrder: "descend", //sorting by default to descend remove this line to set to default and disable default sorting
      sorter: {
        compare: (a: any, b: any) => a.sum - b.sum, // build in sort function (can set custom sort rules)
        multiple: 1, // multi-sort priority can change live while holding shift and selecting another column of choice
      },
      ...SortsPorps(sortedInfo, "sum"),
      cellEditType: "1",
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
      cellEditType: "2",
    },
    {
      title: "תאריך",
      dataIndex: "date",
      key: "date",
      ...getColumnSearchProps(
        "date",
        searchInput,
        setSearchedColumn,
        setSearchText
      ),
      resizable: true,
      editable: true,
      cellEditType: "3",
    },
    {
      title: "operation",
      dataIndex: "operation",
      key: "operation",
      cellEditType: "0",
      render: (_: any, record: dataType) => {
        const editable = isEditing(record, editingKey);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() =>
                save(
                  record.key,
                  setEditingRowMode,
                  form,
                  dataSource,
                  setDataSource,
                  setEditingKey
                )
              }
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

  const updateFixedColumns = (key: string, fixed: "left" | "right" | undefined) => {
    setFixedColumns((prev) => {
      const columnExists = prev.find((col) => col.key === key);
      if (columnExists) {
        return prev.map((col) =>
          col.key === key ? { ...col, fixed } : col
        );
      } else {
        return [...prev, { key, fixed }];
      }
    });
  };

  const columnsWithFixed = defaultColumns.map((col) => {
    const fixedColumn = fixedColumns.find((c) => c.key === col.key);
    return fixedColumn ? { ...col, fixed: fixedColumn.fixed } : col;
  });

  const handleSave = (row: dataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const columns: TableProps<dataType>["columns"] = columnsWithFixed.map(
    (col) => {
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
          cellEditType: col.cellEditType,
          handleSave,
        }),
      };
    }
  );

  const mergedColumns: TableProps<dataType>["columns"] = columnsWithFixed.map(
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

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleChange: OnChange = (pagination, filters, sorter, extra) => {
    setSortedInfo(sorter as Sorts);
  };

  const updateSorting = (newSorting: SorterResult<dataType>) => {
    setSortedInfo(newSorting);

    const extra = {
      action: "sort" as const,
      currentDataSource: dataSource,
      currentPageData: dataSource,
    };

    handleChange({}, {}, newSorting, extra);
  };

  const handleSort = (test: string) => {
    const newSort: SorterResult<dataType> = {
      columnKey: test,
      order:
        sortedInfo.columnKey === test && sortedInfo.order === "ascend"
          ? "descend"
          : ("ascend" as SortOrder),
    };
    updateSorting(newSort);
  };

  const resetSorting = () => {
    const newSort: SorterResult<dataType> = { columnKey: "", order: undefined };
    updateSorting(newSort);
  };

  function handleFilterCard() {
    setFilterCard(!filterCard);
  }

  return (
    <div className="Pagediv">
      {defaultColumns.map((col) => (
        <div key={col.key}>
          <Typography>{col.title}</Typography>
          <ButtonGroup variant="outlined">
            <Button
              onClick={() => updateFixedColumns(col.key, "left")}
            >
              Fix Left
            </Button>
            <Button
              onClick={() => updateFixedColumns(col.key, "right")}
            >
              Fix Right
            </Button>
            <Button
              onClick={() => updateFixedColumns(col.key, undefined)}
            >
              Unset
            </Button>
          </ButtonGroup>
        </div>
      ))}
      <Button variant="contained" onClick={handleFilterCard}>
        סינונים
      </Button>
      {filterCard && (
        <div className="FilterCard">
          <Button
            variant="contained"
            onClick={() => {
              handleSort("sum");
            }}
          >
            סנן כלים
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleSort("kshirut");
            }}
          >
            סנן כשירות
          </Button>
          <Button variant="contained" onClick={resetSorting}>
            נקה סננים
          </Button>
        </div>
      )}
      <div className="Tablediv">
        <Form form={form} component={false}>
          <TableExt
            style={{ maxWidth: "1000px" }}
            columns={editingRowMode === true ? mergedColumns : columns}
            expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
            dataSource={dataSource}
            bordered={true}
            components={
              editingRowMode === true
                ? { body: { cell: EditableCellRow } }
                : components
            }
            onChange={handleChange}
            stateStorable={false}
            scroll={{ x: 1300 }}
          />
        </Form>
      </div>
    </div>
  );
};

export default Table;
