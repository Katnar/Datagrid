import { createTheme } from "@mui/material";
import { heIL } from "@mui/material/locale";

export const lightThemeMRT = createTheme(
  {
    palette: {
      mode: "light",
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ".css-ssspk8-MuiTableRow-root": {
            backgroundColor: "#F4F5F5 !important",
          },
          ".css-1hdg57s-MuiTableRow-root:hover td:after": {
            backgroundColor: "#FAFAFA !important",
          },
          ".MuiTableCell-root:hover": {
            outline: "0px !important",
          },
          ".css-1oq1sy2-MuiTableRow-root td:after": {
            backgroundColor: "#FF475014 !important",
          },
          ".css-h5odmr-MuiButtonBase-root-MuiCheckbox-root.Mui-checked": {
            color: "#FF474F !important",
          },
          ".MuiInputBase-input .MuiInput-input .MuiInputBase-inputSizeSmall .css-nz481w-MuiInputBase-input-MuiInput-input":
            {
              borderColor: "#FF474F",
            },
          ".css-1c32n2y-MuiBadge-root": {
            color: "#FF474F !important",
          },
          ".css-1j43wpm-MuiButtonBase-root-MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon":
            {
              color: "#FF474F !important",
            },
          ".css-h5odmr-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate":
            {
              color: "#FF474F !important",
            },
          " .css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
            {
              backgroundColor: "burlywood !important",
            },
          ".css-byenzh-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked": {
            color: "#FF474F !important",
          },
          '.css-1vy7ukx-MuiPaper-root-MuiAlert-root':{
            backgroundColor: "#FF475014 !important",
          }
        },
      },
    },
    direction: "rtl",
  },
  heIL
);

export const darkThemeMRT = createTheme(
  {
    palette: {
      mode: "dark",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '.css-9viehg-MuiTableRow-root':{
            backgroundColor: '#393E46 !important'
          },
          'tr > td':{
            backgroundColor: '#252A31 !important',
            borderColor: "#181C21 !important"
          },
          '.MuiTableRow-root .Mui-selected .css-1axcwxu-MuiTableRow-root':{
            backgroundColor: '#FF474F !important'
          },
          '.css-1axcwxu-MuiTableRow-root td:after':{
            backgroundColor: '#3b2f37 !important'
          },
          '.css-jsnipx-MuiButtonBase-root-MuiCheckbox-root.Mui-checked':{
            color :'#FF474F !important'
          },
          '.css-jsnipx-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate':{
            color: '#FF474F !important'
          },
          '.css-1r7ctd-MuiBadge-badge':{
            color: '#FF474F !important'
          },
          '.css-z1uiph-MuiButtonBase-root-MuiTableSortLabel-root.Mui-active':{
            color: '#FF474F !important'
          },
          '.css-1qot5br-MuiButtonBase-root-MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon':{
            color: '#FF474F !important'
          },
          '.MuiTableContainer-root::-webkit-scrollbar-track':{
            backgroundColor: 'red' /* background color of the track */
          },
          ".css-1joj1yp":{
            backgroundColor:'#282c31 !important'
          },
          ".css-zrlv9q":{
            backgroundColor:'#282c31 !important'
          },
          ".css-i4bv87-MuiSvgIcon-root":{
             color: '#FF474F !important'
          }
        },
      },
    },
    direction: "rtl",
  },
  heIL
);
