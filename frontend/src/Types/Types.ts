import type {GetRef} from "antd";
import { Form, Table } from "antd";
import type { TableProps } from 'antd';

export type Column = {
  title: string; //Title of the colomns that will be displayed for the user
  dataIndex: string; //Index to refer the specific object Key inside DataSource
  key: string; //unieq key (will be generated on Init)
};

export type Columns = Column[];

export type dataType = {
  /*key - value of the incoming data for Example ->*/

  key: string;
  makat: string;
  kshirut: number;
  name: string;
  date: string;
  sum: number;
};

export type ExpandedDataType = {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
};

export type DataIndex = keyof dataType;

export type FormInstance<T> = GetRef<typeof Form<T>>;

export interface EditableRowProps {
  index: number;
}
export interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  dataIndex: keyof dataType;
  record: dataType;
  cellEditType: string;
  handleSave: (record: dataType) => void;
}

export interface EditableRowProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: keyof dataType;
  title: any;
  inputType: 'number' | 'text';
  record: dataType;
  index: number;
  cellEditType: string;
}
export type EditableTableProps = Parameters<typeof Table>[0];

export type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export type OnChange = NonNullable<TableProps<dataType>['onChange']>;
export type GetSingle<T> = T extends (infer U)[] ? U : never;
export type Sorts = GetSingle<Parameters<OnChange>[2]>;

export type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];


