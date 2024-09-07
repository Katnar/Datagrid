import Box from "@mui/material/Box";
import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { SortContext } from "../store/FiltersCtx";

const FilterCard: React.FC = () => {
  const { sortedInfo, setSortedInfo } = useContext(SortContext);
  function handleSort(columnName:string) {
    setSortedInfo({
      order: sortedInfo.columnKey === columnName && sortedInfo.order === 'ascend' ? 'descend' : 'ascend',
      columnKey: columnName,
    });
  }
  function handleClearSorts() {
    setSortedInfo({});
  }
  return (
    <div className="FilterCard">
      <Button variant="contained" onClick={()=>{
        handleSort("sum")
      }}>
        סנן כלים
      </Button>
      <Button variant="contained" onClick={()=>{
        handleSort("kshirut")
      }}>
        סנן כשירות
      </Button>
      <Button variant="contained" onClick={handleClearSorts}>
        נקה סננים
      </Button>
    </div>
  );
};
export default FilterCard;
