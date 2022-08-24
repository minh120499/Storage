import { useRoutes } from "react-router-dom";
import Home from "./components/Home";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/category/Categories";
import Storage from "./components/Storage";
import AddProduct from "./pages/product/AddProduct";
import SupplierList from "./pages/supplier/SupplierList";
// import SupplierDetails from "./pages/supplier/SupplierDetails";
import SupplierCreate from "./pages/supplier/SupplierCreate";

import SupplierDetails from "./pages/supplier/SupplierDetails";
import ListProduct from "./pages/product/ListProduct";

import TransportCompanies from "./pages/transport_company/TransportCompanies";


const App: React.FC = () => {
  const router = useRoutes ([
    {
      path: "/",
      element: <Dashboard />,

      children: [
        {
          path: "",
          element: <Home />
        },
        {
          path: "/storage",
          element: <Storage />
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
          path: "/productsAdd",
          element: <AddProduct />
        },
        {
          path: "/products",
          element: <ListProduct />
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
    },
  ])

  return router
};

export default App;
