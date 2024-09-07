import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { dataType } from "../Types/Types";

interface DataContext {
  dataSource: dataType[];
  setDataSource: Dispatch<SetStateAction<dataType[]>>;
}
type DataProviderProps = {
  children: ReactNode;
};

const defaultState = {
  dataSource: [],
  setDataSource: (sortedInfo: dataType[]) => {},
} as DataContext;

export const DataContext = createContext(defaultState);

export default function DataProvider({ children }: DataProviderProps) {
  const [dataSource, setDataSource] = useState<dataType[]>([
    {
      key: "1", //uniqe key
      makat: "123456",
      kshirut: 32,
      name: "merkava 4",
      sum: 100,
      date: "27/08/2024",
    },
    {
      key: "2",
      makat: "234567",
      kshirut: 50,
      name: "karnatz ",
      sum: 10,
      date: "27/08/2024",
    },
    {
      key: "3",
      makat: "989768",
      kshirut: 40,
      name: "karnatz ",
      sum: 56,
      date: "27/08/2024",
    },
    {
      key: "4",
      makat: "412367",
      kshirut: 90,
      name: "karnatz ",
      date: "27/08/2024",
      sum: 82,
    },
  ]);
  return (
    <div>
      <DataContext.Provider value={{ dataSource, setDataSource }}>
        {children}
      </DataContext.Provider>
    </div>
  );
}

