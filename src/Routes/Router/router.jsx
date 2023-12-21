import { createBrowserRouter } from "react-router-dom";
import Root from "../../Layout/Root/Root";
import ErrorPage from "../../Components/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            }
        ]
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
]);

export default router;