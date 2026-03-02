import { createBrowserRouter, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import SeasonDetails from "../pages/SeasonDetails";
import ErrorPage from "../pages/ErrorPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/season/:id",
        element: <SeasonDetails />,
      },
      <Route path="*" element={<ErrorPage />} />
    ],
  }
]);

export default router;