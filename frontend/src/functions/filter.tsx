import React from "react";
import { dataType, DataIndex } from "../Types/Types";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnType } from "antd";
import { Button, Input, Space } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const handleSearch = (
  selectedKeys: string[],
  confirm: FilterDropdownProps["confirm"],
  dataIndex: DataIndex,
  setSearchText: React.Dispatch<React.SetStateAction<string>>,
  setSearchedColumn: React.Dispatch<React.SetStateAction<string>>
) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

export const handleReset = (
  clearFilters: () => void,
  setSearchText: React.Dispatch<React.SetStateAction<string>>
) => {
  clearFilters();
  setSearchText("");
};

export const getColumnSearchProps = (
  dataIndex: DataIndex,
  searchInput: React.RefObject<InputRef>,
  setSearchText: React.Dispatch<React.SetStateAction<string>>,
  setSearchedColumn: React.Dispatch<React.SetStateAction<string>>
): TableColumnType<dataType> => ({
  filterDropdown: ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
    close,
  }) => (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() =>
          handleSearch(
            selectedKeys as string[],
            confirm,
            dataIndex,
            setSearchText,
            setSearchedColumn
          )
        }
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() =>
            handleSearch(
              selectedKeys as string[],
              confirm,
              dataIndex,
              setSearchText,
              setSearchedColumn
            )
          }
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() =>
            clearFilters && handleReset(clearFilters, setSearchText)
          }
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({ closeDropdown: false });
            setSearchText((selectedKeys as string[])[0]);
            setSearchedColumn(dataIndex);
          }}
        >
          Filter
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          close
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <MoreVertIcon style={{ color: filtered ? "#1677ff" : undefined }} /> //three dots from mui-icons
  ),
  onFilter: (value, record) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()),
  onFilterDropdownOpenChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
});
