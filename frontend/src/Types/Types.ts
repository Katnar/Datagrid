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
};

export type ExpandedDataType = {
    key: React.Key;
    date: string;
    name: string;
    upgradeNum: string;
  }
