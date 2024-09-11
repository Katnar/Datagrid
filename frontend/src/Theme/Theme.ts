import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ".ant-checkbox-checked .ant-checkbox-inner": {
            backgroundColor: "#FF474F !important",
            borderColor: "#FF474F",
          },
          ".ant-checkbox-wrapper:hover .ant-checkbox-checked .ant-checkbox-inner":
            {
              backgroundColor: "#FF474F !important",
              borderColor: "#FF474F !important",
            },
          ".ant-checkbox-checked:hover .ant-checkbox-checked .ant-checkbox-inner":
            {
              backgroundColor: "#FF474F !important",
              borderColor: "#FF474F !important",
            },
          ".ant-checkbox-checked:after": {
            borderColor: "#FF474F !important",
          },
          ".ant-checkbox:hover::after": {
            borderColor: "#FF474F !important",
          },
          ".ant-checkbox:hover .ant-checkbox-innerter": {
            borderColor: "#FF474F !important",
          },
          ".ant-checkbox-indeterminate .ant-checkbox-inner::after": {
            backgroundColor: "#FF474F !important",
          },
          ".ant-table-row-expand-icon-collapsed": {
            borderColor: "#FF474F !important",
            color: "#FF474F !important",
          },
          ".ant-table-row-expand-icon-expanded": {
            borderColor: "#FF474F !important",
            color: "#FF474F !important",
          },
          ".ant-pagination-item-1": {
            borderColor: "#FF474F !important",
            color: "#FF474F !important",
          },
          ".ant-pagination-item:hover": {
            borderColor: "#FF474F !important",
            color: "#FF474F !important",
          },
          ".ant-table-thead >tr>th": {
            backgroundColor: "#F4F5F5 !important",
          },
          ".ant-table-wrapper .ant-table-tbody .ant-table-row.ant-table-row-selected >.ant-table-cell":
            {
              backgroundColor: "#f9eced !important",
            },
          a: {
            color: "#FF474F !important",
          },
          table: {
            color: "#212B36 !important",
          },
          ".antd-ext-inner-title": {
            color: "#212B36 ",
          },
        },
      },
    },
  });
  
export const darkTheme = createTheme({
    palette: {
      mode: "dark",
      background: {
        default: "#424242", // Grey background for dark mode
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ".ant-checkbox-checked .ant-checkbox-inner": {
            backgroundColor: "#FF474F !important",
            borderColor: "#FF474F",
          },
          ".ant-checkbox-inner": {
            backgroundColor: "#252A32 !important",
            borderColor: "#FF474F !important",
          },
          ".ant-checkbox-wrapper:hover .ant-checkbox-checked .ant-checkbox-inner":
            {
              backgroundColor: "#FF474F !important",
              borderColor: "#FF474F !important",
            },
          ".ant-checkbox-checked:hover .ant-checkbox-checked .ant-checkbox-inner":
            {
              backgroundColor: "#FF474F !important",
              borderColor: "#FF474F !important",
            },
          ".ant-checkbox-checked:after": {
            borderColor: "#FF474F !important",
          },
          ".ant-checkbox:hover::after": {
            borderColor: "#FF474F !important",
          },
          ".ant-checkbox:hover .ant-checkbox-innerter": {
            borderColor: "#FF474F !important",
          },
          ".ant-checkbox-indeterminate .ant-checkbox-inner::after": {
            backgroundColor: "#FF474F !important",
          },
          ".ant-table-row-expand-icon-collapsed": {
            backgroundColor: "#252A32 !important",
            borderColor: "#FF474F !important",
            color: "#FF474F !important",
          },
          ".ant-table-row-expand-icon-expanded": {
            backgroundColor: "#252A32 !important",
            borderColor: "#FF474F !important",
            color: "#FF474F !important",
          },
          ".ant-pagination-item-1": {
            backgroundColor: "#393e46 !important",
            borderColor: "#FF474F !important",
            color: "#FF474F !important",
          },
          ".ant-pagination-item:hover": {
            backgroundColor: "#393e46 !important",
            borderColor: "#FF474F !important",
            color: "#FF474F !important",
          },
          ".ant-table-thead >tr>th": {
            backgroundColor: "#393e46 !important",
            color: "white !important",
          },
          ".ant-table-wrapper .ant-table-tbody .ant-table-row.ant-table-row-selected >.ant-table-cell":
            {
              backgroundColor: "#3a2f36 !important",
            },
          a: {
            color: "#FF474F !important",
          },
          table: {
            color: "#FFFFFF !important",
            backgroundColor: "#252A31 !important",
          },
          ".antd-ext-inner-title": {
            color: "#FFFFFF",
          },
          ".ant-table-content": {
            backgroundColor: "#393e46 !important",
          },
          ".ant-table-wrapper .ant-table-tbody .ant-table-row >.ant-table-cell-row-hover":
            {
              backgroundColor: "#393e46  !important",
              BorderColor: "black",
            },
          ".ant-table-wrapper .ant-table-tbody > tr > td": {
            borderColor: "#181C21",
            backgroundColor: "#252A31  !important",
          },
          ".ant-table-wrapper .ant-table-thead > tr > th": {
            borderColor: "#181C21",
          },
          ".ant-input-outlined":{
            backgroundColor: "#393e46  !important",
            color: "#FFFFFF",
            border: "1px solid #FF474F !important",
          },
          ".ant-picker .ant-picker-input >input":{
            color:'#FFFFFF'
          },
          '.ant-picker-dropdown .ant-picker-cell .ant-picker-cell-inner': {
            color: '#FFFFFF',
          },
          '.ant-picker-dropdown .ant-picker-date-panel .ant-picker-content th':{
            color: '#FFFFFF',
          },
          '.ant-picker-dropdown .ant-picker-header-view >button':{
            color: '#FFFFFF',
          },
          '.ant-picker-dropdown .ant-picker-date-panel':{
            backgroundColor: "#393e46  !important"
          },
          '.ant-picker-footer':{
            backgroundColor: "#393e46  !important"
          },
          '.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector':{
            backgroundColor: "#393e46  !important",
            border:"1px solid #FF474F"
          },
          '.ant-select-single.ant-select-lg:not(.ant-select-customize-input) .ant-select-selector .ant-select-selection-search-input':{
            color:'#FFFFFF'
          },
          ".ant-table-filter-dropdown":{
            backgroundColor: "#393e46  !important",
          },
          '.ant-btn-default':{
            backgroundColor: "#393e46  !important",
            border:"1px solid #FF474F",
            color:"#FFFFFF"
          },
          '.ant-modal .ant-modal-content':{
            backgroundColor: "#393e46  !important",
            border:"1px solid #FF474F",
          },
          '.ant-tabs .ant-tabs-tab-btn':{
            color:'#FFFFFF'
          },
          '.ant-tabs .ant-tabs-tabpane':{
            color:'#FFFFFF'
          },
          '.ant-radio-wrapper.ant-radio-wrapper-rtl':{
            color:'#FFFFFF'
          },
          '.ant-tree-list-holder-inner':{
            backgroundColor: "#393e46  !important",
            color:'#FFFFFF'
          },
          '.ant-dropdown .ant-table-filter-dropdown .ant-dropdown-menu':{
            backgroundColor: "#393e46  !important",
          },
          '.ant-dropdown .ant-dropdown-menu .ant-dropdown-menu-item-selected':{
            backgroundColor: "#252A31  !important",
            border:"1px solid #FF474F",
          },
          '.ant-dropdown .ant-table-filter-dropdown .ant-checkbox-wrapper+span':{
            color:'#FFFFFF',
          }
        },
      },
    },
  });