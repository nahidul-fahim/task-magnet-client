import { createBrowserRouter } from "react-router-dom";
import Root from "../../Layout/Root/Root";
import ErrorPage from "../../Components/ErrorPage/ErrorPage";
import Home from "../../Pages/Home/Home";
import Register from "../../Pages/Register/Register";
import Login from "../../Pages/Login/Login";
import Dashboard from "../../Layout/Dashboard/Dashboard";
import Alltasks from "../../Pages/DashboardPages/AllTasks/Alltasks";
import PrivateRouter from "../PrivateRouter/PrivateRouter";



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
    },
    // dashboard routes
    {
        path: "dashboard",
        element: <PrivateRouter><Dashboard /></PrivateRouter>,
        children: [
            {
                path: "alltasks",
                element: <Alltasks />
            }
        ]
    }
]);

export default router;