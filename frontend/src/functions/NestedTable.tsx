import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Table } from "antd";
import {  ExpandedDataType } from "../Types/Types";
import { Badge } from "antd";
import type { TableColumnsType } from "antd";
import { Space } from "antd";

const items = [
    { key: "1", label: "Action 1" },
    { key: "2", label: "Action 2" },
  ];
export const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Date", dataIndex: "date", key: "date" },
      { title: "Name", dataIndex: "name", key: "name" },
      {
        title: "Status",
        key: "state",
        render: () => <Badge status="success" text="Finished" />,
      },
      { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
      {
        title: "Action",
        key: "operation",
        render: () => (
          <Space size="middle">
            <a>Pause</a>
            <a>Stop</a>
            <Dropdown menu={{ items }}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const NestedData = [];
    for (let i = 0; i < 3; ++i) {
      NestedData.push({
        key: i.toString(),
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }
    return <Table columns={columns} dataSource={NestedData} pagination={false} />;
  };