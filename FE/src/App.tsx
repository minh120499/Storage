import {useRoutes} from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./pages/Dashboard";
import Storage from "./components/Storage";
import SupplierList from "./pages/supplier/SupplierList";
import SupplierDetails from "./pages/supplier/SupplierDetails";
import SupplierCreate from "./pages/supplier/SupplierCreate";
import React from "react";

const App: React.FC = () => {
  const router = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "/supplier",
          children: [
            // {path: "add", element: <CategoryAdd/>},
            { path: "", element: <SupplierList /> },
            { path: "details/:id", element: <SupplierDetails /> }
          ]
        },
        {
          path: "/storage",
          element: <Storage />
        }
      ]
    }
  ])

  return router
};

export default App;
