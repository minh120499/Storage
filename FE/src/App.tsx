import { useRoutes } from "react-router-dom";
import Home from "./components/Home";
import React from "react";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/category/Categories";
import Storage from "./components/Storage";
import AddProduct from "./pages/AddProduct";
import Test from "./pages/Test";
import SupplierList from "./pages/supplier/SupplierList";
import SupplierDetails from "./pages/supplier/SupplierDetails";
import SupplierCreate from "./pages/supplier/SupplierCreate";


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
          path: "/productsAdd",
          element: <AddProduct />
        },{
          
          path:"/categories",
          element: <Categories/>
        }
      ]
    },
  ])

  return router
};

export default App;
