import { useRoutes } from "react-router-dom";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/category/Categories";
import Storage from "./components/Storage";
import Login from "./components/Login";
import Employee from "./components/Employee/Employee";
import SupplierList from "./pages/supplier/SupplierList";
import SupplierDetails from "./pages/supplier/SupplierDetails";
import SupplierCreate from "./pages/supplier/SupplierCreate";

const App: React.FC = () => {
  const router = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Dashboard />,

      children: [
        {
          path: "/supplier",
          children: [
            // {path: "add", element: <CategoryAdd/>},
            { path: "", element: <SupplierList /> },
            { path: "details/:id", element: <SupplierDetails /> },
          ],
        },
        {
          path: "/storage",
          element: <Storage />,
        },
        {
          path: "/employees",
          element: <Employee />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
      ],
    },
  ]);

  return router;
};

export default App;
