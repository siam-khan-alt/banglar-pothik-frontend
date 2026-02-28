import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <div>Error 404: পথ হারিয়ে ফেলেছেন!</div>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      
    ],
  }
]);

export default router;