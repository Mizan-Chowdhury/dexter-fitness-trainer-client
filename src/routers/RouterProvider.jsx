import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import Gallery from "../pages/gallery/Gallery";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../dashboard/Dashboard";

const Myrouter = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/gallery',
                element: <Gallery></Gallery>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>
    }
])

export default Myrouter;