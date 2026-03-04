import { createBrowserRouter, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import SeasonDetails from "../pages/SeasonDetails";
import ErrorPage from "../pages/ErrorPage";
import Districts from "../pages/Districts";


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
      {
        path: "/districts",
        element: <Districts />,
      },
      <Route path="*" element={<ErrorPage />} />
    ],
  }
]);

export default router;