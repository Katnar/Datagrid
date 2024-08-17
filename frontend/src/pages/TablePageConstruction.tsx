import React, { useState, useContext, useEffect, useRef } from "react";
import { dataType, ExpandedDataType } from "../Types/Types";
import { Checkbox, Table, Badge } from "antd";
import type { CheckboxOptionType, TableColumnsType } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnType } from "antd";
import { Button, Input, Space } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";


const App: React.FC = () => {
// ============================Search Filter================================= //
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null); 

  type DataIndex = keyof dataType;


  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  
  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<dataType> => (
    {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
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
        <Checkbox.Group
        value={pinedList}
        options={[{label: dataIndex , value: dataIndex}] as CheckboxOptionType[]}
        onChange={(value) => {
          setPinedList(value as string[]);
        }}
      />
      </div>
    ),
    filterIcon: (filtered: boolean) => ( //define Search Icon
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
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
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  // ========================================================================== //

 // ================================Table Init===================================== //

  const dataSource: dataType[] = [
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
  ];
  const columns:TableColumnsType<dataType>  = [
    /*Column Example init*/
    {
      title: 'מק"ט',
      dataIndex: "makat",
      key: "makat",
      ...getColumnSearchProps("makat")
    },
    {
      title: "אחוזי כשירות כללית",
      dataIndex: "kshirut",
      key: "kshirut",
      ...getColumnSearchProps("kshirut")
    },
    {
      title: "שם אמצעי",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name")
    },
    
    
  ];
 // ========================================================================== //

  // =============================Column Hiding Features======================= //
  const defaultCheckedList = columns.map((item) => item.key as string); //default columns (after Init)
  const [checkedList, setCheckedList] = useState(defaultCheckedList); //state to Check wich Column is on

  const options = columns.map(({ key, title }) => ({
    // options to hide Columns
    label: title,
    value: key,
  }));

  let newColumns = columns.map((item) => ({
    //columns to show after hiding
    ...item,
    hidden: !checkedList.includes(item.key as string),
  }));
  // ========================================================================== //

  // =======================Nested Table Features============================== //
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      //Extended Table Columns Example
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Status",
        key: "state",
        render: () => <Badge status="success" text="Finished" />,
      },
      { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
    ];

    const data = []; //Extended Table Data Example
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />; // Extended Table Render
  };
  // ========================================================================== //

// ===============================Pin Column================================= //
  const [pinedList, setPinedList] = useState(defaultCheckedList); //state to Check wich Column is on
  const PinOptions = columns.map(({ key, title }) => ({
    // options to hide Columns
    label: "Pin "+title,
    value: key,
  }));
   newColumns = columns.map((item) => ({ // pin selected column
    ...item,
    hidden: !checkedList.includes(item.key as string),
    fixed: pinedList.includes(item.key as string)
  }));
  
// ========================================================================== //


  return (
    <div className="Pagediv">
      <div className="Tablediv">
      <Checkbox.Group
        value={checkedList}
        options={options as CheckboxOptionType[]}
        onChange={(value) => {
          setCheckedList(value as string[]);
        }}
      />
      <Checkbox.Group
        value={pinedList}
        options={PinOptions as CheckboxOptionType[]}
        onChange={(value) => {
          setPinedList(value as string[]);
        }}
      />
        <Table
        style={{maxWidth: "500px"}}
          dataSource={dataSource}
          columns={newColumns}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
          scroll={{ x:true , y:"max-content" }}
          bordered={true}
        />
      </div>
    </div>
  );
};

export default App;
