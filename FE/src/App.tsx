import { useRoutes } from "react-router-dom";

import React from "react";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/category/Categories";
import Storage from "./components/Storage";
import AddProduct from "./pages/product/AddProduct";
import Login from "./components/Login";
import SupplierList from "./pages/supplier/SupplierList";
// import SupplierDetails from "./pages/supplier/SupplierDetails";
import SupplierCreate from "./pages/supplier/SupplierCreate";

import SupplierDetails from "./pages/supplier/SupplierDetails";
import ListProduct from "./pages/product/ListProduct";

import TransportCompanies from "./pages/transport_company/TransportCompanies";

import HomePage from "./components/HomePage";
import EmployeeDetails from "./components/Employee/Details";
import Employee from "./components/Employee/Employee";
import RoleManager from "./components/RoleManager/RoleManager";
import DetailsProduct from "./pages/product/DetailsProduct";
import { exact } from "prop-types";
import Inventory from "./components/inventory/Inventory";
import InventoryList from "./components/inventory/InventoryList";
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
          path: "/home",
          element: <HomePage />,
        },
        {
          path: "/stocker/storage",
          element: <Inventory />,
        },
        {
          path: "stocker/inventories",
          element: <InventoryList />,
        },
        {
          path: "/storage",
          element: <Storage />,
        },
        {
          path: "/supplier",
          children: [
            // {path: "add", element: <CategoryAdd/>},
            { path: "", element: <SupplierList /> },
            { path: "details/:id", element: <SupplierDetails /> },
          ],
        },
        {
          path: "/productsAdd",
          element: <AddProduct />,
        },
        {
          path: "/products",

          children: [
            { index: true, element: <ListProduct /> },
            { path: "/products/:id", element: <DetailsProduct /> },
          ],
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/transport-companies",
          element: <TransportCompanies />,
        },
        {
          path: "/employees/:id",
          element: <EmployeeDetails />,
        },
        {
          path: "/api/admin/employees",
          element: <Employee />,
        },
        {
          path: "/api/admin/roles",
          element: <RoleManager />,
        },
      ],
    },
  ]);

  return router;
};

export default App;
