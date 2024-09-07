import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TablePage from "./pages/TablePage";
import TablePageConstruction from "./pages/TablePageConstruction";
import { ConfigProvider } from "antd";
import heIL from "antd/locale/he_IL";
import { createTheme, ThemeProvider, CssBaseline , Button} from '@mui/material';
import { useState } from 'react';


const router = createBrowserRouter([
  { path: "/", element: <TablePage /> },
  { path: "/1", element: <TablePageConstruction /> },
]);
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '.ant-checkbox-checked .ant-checkbox-inner': {
          backgroundColor: '#FF474F !important',
          borderColor: '#FF474F',
        },
        '.ant-checkbox-wrapper:hover .ant-checkbox-checked .ant-checkbox-inner': {
          backgroundColor: '#FF474F !important',
          borderColor: '#FF474F !important',
        },
        '.ant-checkbox-checked:hover .ant-checkbox-checked .ant-checkbox-inner': {
          backgroundColor: '#FF474F !important',
          borderColor: '#FF474F !important',
        },
        '.ant-checkbox-checked:after': {
          borderColor: '#FF474F !important',
        },
        '.ant-checkbox:hover::after': {
          borderColor: '#FF474F !important',
        },
        '.ant-checkbox:hover .ant-checkbox-innerter': {
          borderColor: '#FF474F !important',
        },
        '.ant-checkbox-indeterminate .ant-checkbox-inner::after': {
          backgroundColor: '#FF474F !important',
        },
        '.ant-table-row-expand-icon-collapsed': {
          borderColor: '#FF474F !important',
          color: '#FF474F !important',
        },
        '.ant-table-row-expand-icon-expanded': {
          borderColor: '#FF474F !important',
          color: '#FF474F !important',
        },
        '.ant-pagination-item-1': {
          borderColor: '#FF474F !important',
          color: '#FF474F !important',
        },
        '.ant-pagination-item:hover': {
          borderColor: '#FF474F !important',
          color: '#FF474F !important',
        },
        '.ant-table-thead >tr>th':{
          backgroundColor: '#F4F5F5 !important'
        },
        '.ant-table-wrapper .ant-table-tbody .ant-table-row.ant-table-row-selected >.ant-table-cell':{
          backgroundColor: '#f9eced !important'
        },
        a: {
          color: '#FF474F !important',
        },
        table: {
          color: '#212B36 !important',
        },
        '.antd-ext-inner-title':{
          color: '#212B36 '
        }
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#424242',  // Grey background for dark mode
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '.ant-checkbox-checked .ant-checkbox-inner': {
          backgroundColor: '#FF474F !important',
          borderColor: '#FF474F',
        },
        '.ant-checkbox-inner':{
          backgroundColor: '#252A32 !important',
          borderColor: '#FF474F !important',
        },
        '.ant-checkbox-wrapper:hover .ant-checkbox-checked .ant-checkbox-inner': {
          backgroundColor: '#FF474F !important',
          borderColor: '#FF474F !important',
        },
        '.ant-checkbox-checked:hover .ant-checkbox-checked .ant-checkbox-inner': {
          backgroundColor: '#FF474F !important',
          borderColor: '#FF474F !important',
        },
        '.ant-checkbox-checked:after': {
          borderColor: '#FF474F !important',
        },
        '.ant-checkbox:hover::after': {
          borderColor: '#FF474F !important',
        },
        '.ant-checkbox:hover .ant-checkbox-innerter': {
          borderColor: '#FF474F !important',
        },
        '.ant-checkbox-indeterminate .ant-checkbox-inner::after': {
          backgroundColor: '#FF474F !important',
        },
        '.ant-table-row-expand-icon-collapsed': {
          backgroundColor: '#252A32 !important',
          borderColor: '#FF474F !important',
          color: '#FF474F !important',
        },
        '.ant-table-row-expand-icon-expanded': {
          backgroundColor: '#252A32 !important',
          borderColor: '#FF474F !important',
          color: '#FF474F !important',
        },
        '.ant-pagination-item-1': {
          backgroundColor: '#393e46 !important',
          borderColor: '#FF474F !important',
          color: '#FF474F !important',
        },
        '.ant-pagination-item:hover': {
          backgroundColor: '#393e46 !important',
          borderColor: '#FF474F !important',
          color: '#FF474F !important',
        },
        '.ant-table-thead >tr>th':{
          backgroundColor: '#393e46 !important',
          color:'white !important',
        },
        '.ant-table-wrapper .ant-table-tbody .ant-table-row.ant-table-row-selected >.ant-table-cell':{
          backgroundColor: '#3a2f36 !important'
        },
        a: {
          color: '#FF474F !important',
        },
        table: {
          color: '#FFFFFF !important',
          backgroundColor: '#252A31 !important'
        },
        '.antd-ext-inner-title':{
          color: '#FFFFFF'
        },
        '.ant-table-content':{
          backgroundColor: '#393e46 !important'
        }
        
      },
    },
  },});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Button onClick={toggleTheme} variant="contained">
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </Button>
      <ConfigProvider direction="rtl" locale={heIL} theme={{ 
        components: {
          Table: {
            /* here is your component tokens */
            headerBorderRadius: 0,
           // headerColor:'#212B36',
            cellFontSize: 14,
            colorPrimary: '#FF474F',
          },
        },
      }}>
        <RouterProvider router={router} />
      </ConfigProvider>
      </ThemeProvider>
  );
}

export default App;
