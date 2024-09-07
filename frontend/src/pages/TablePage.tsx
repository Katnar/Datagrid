import React, { useState, useContext } from "react";
import Table from "../components/Table";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { SortContext } from "../store/FiltersCtx";
import { SortOrder, SorterResult } from "antd/es/table/interface";
import { dataType, ColumnTypes, Sorts } from "../Types/Types";

const App: React.FC = () => {
  const { sortedInfo, setSortedInfo } = useContext(SortContext);
  const [filterCard, setFilterCard] = useState(false);
  function handleFilterCard() {
    setFilterCard(!filterCard);
  }
  function handleSort(columnName: string) {
    const newSort: SorterResult<dataType> = {
      columnKey: columnName,
      order:
        sortedInfo.columnKey === columnName && sortedInfo.order === "ascend"
          ? "descend"
          : ("ascend" as SortOrder),
    };
    setSortedInfo(newSort)
  }
  function handleClearSorts() {
    const newSort: SorterResult<dataType> = { columnKey: '', order: undefined }
    setSortedInfo(newSort);
  }
  return (
    <Box>
      <Table />
    </Box>
  );
};
export default App;
