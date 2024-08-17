import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TablePage from "./pages/TablePage"
import TablePageConstruction from "./pages/TablePageConstruction"

const router = createBrowserRouter([
  { path: "/", element: <TablePage /> },
  { path: "/1", element: <TablePageConstruction /> },
]);

function App() {
  return (
        <RouterProvider router={router} />
  );
}

export default App;
