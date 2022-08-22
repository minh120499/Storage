import { useRoutes } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./pages/Dashboard";
import Storage from "./components/Storage";
import AddProduct from "./pages/AddProduct";
import Test from "./pages/Test";

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
          path: "/test",
          element: <Test />
        }
      ]
    },
  ])

  return router
};

export default App;
