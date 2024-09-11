import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TablePage from "./pages/TablePage";
import TablePageConstruction from "./pages/TablePageConstruction";
import { ConfigProvider } from "antd";
import heIL from "antd/locale/he_IL";
import { createTheme, ThemeProvider, CssBaseline, Button } from "@mui/material";
import { useState } from "react";
import { BorderBottom, BorderColor } from "@mui/icons-material";
import { lightTheme, darkTheme } from "./Theme/Theme";
import { lightThemeMRT , darkThemeMRT } from "./Theme/ThemeMRT";

const router = createBrowserRouter([
  { path: "/", element: <TablePage /> },
  { path: "/1", element: <TablePageConstruction /> },
]);

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkThemeMRT : lightThemeMRT }>
      <CssBaseline />
      <Button onClick={toggleTheme} variant="contained">
        Toggle {isDarkMode ? "Light" : "Dark"} Mode
      </Button>
      <ConfigProvider
        direction="rtl"
        locale={heIL}
        theme={{
          components: {
            Table: {
              headerBorderRadius: 0,
              cellFontSize: 14,
              colorPrimary: "#FF474F",
              headerSplitColor: "#181C21"
            },
          },
        }}
      >
        <div style={{direction:'rtl'}}>
        <RouterProvider router={router} />
        </div>
      </ConfigProvider>
    </ThemeProvider>
  );
}

export default App;
