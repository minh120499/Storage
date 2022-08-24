import {useRoutes} from "react-router-dom";
import Home from "./components/Home";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/category/Categories";
import Storage from "./components/Storage";
import SupplierList from "./pages/supplier/SupplierList";
import SupplierDetails from "./pages/supplier/SupplierDetails";
import SupplierCreate from "./pages/supplier/SupplierCreate";
import TransportCompanies from "./pages/transport_company/TransportCompanies";


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
        },
        {
          path:"/categories",
          element: <Categories/>
        },
        {
          path:"/transport-companies",
          element: <TransportCompanies/>
        }
      ]
    }
  ])

  return router
};

export default App;
