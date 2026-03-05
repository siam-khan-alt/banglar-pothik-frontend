import { createBrowserRouter, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import SeasonDetails from "../pages/SeasonDetails";
import ErrorPage from "../pages/ErrorPage";
import Districts from "../pages/Districts";
import Register from "../pages/Register";
import Login from "../pages/Login";


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
        path: "/register",
        element: <Register />,
      },
      {
        path:"/login",
        element: <Login/>
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