import { useRoutes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./pages/Dashboard";
import Storage from "./components/Storage";
import AddProduct from "./pages/AddProduct";

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
        }
      ]
    }
  ])

  return router
};

export default App;
