import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import Gallery from "../pages/gallery/Gallery";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Dashboard from "../dashboard/Dashboard";
import Subscribers from "../dashboard/allsubscriber/Subscribers";
import BeATrainer from "../components/BeATrainer";
import Trainer from "../pages/trainer/Trainer";
import TrainerDetails from "../pages/trainer/TrainerDetails";
import TrainerBooked from "../pages/trainer/TrainerBooked";
import AddForum from "../dashboard/addForum/AddForum";
import Forum from "../pages/community/Forum";
import NewTrainers from "../dashboard/allTrainers/NewTrainers";
import AllTrainers from "../dashboard/allTrainers/AllTrainers";
import AddClasses from "../dashboard/addClasses/AddClasses";
import Classes from "../pages/classes/Classes";
import ClassDetails from "../pages/classes/ClassDetails";

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
                path: '/classes',
                element: <Classes></Classes>
            },
            {
                path: '/classDetails/:id',
                element: <ClassDetails></ClassDetails>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/trainer',
                element: <Trainer></Trainer>
            },
            {
                path: '/trainers/:id',
                element: <TrainerDetails></TrainerDetails>,
                loader: ({params})=> fetch(`http://localhost:5000/trainers/${params.id}`)
            },
            {
                path: '/trainerBooked',
                element: <TrainerBooked></TrainerBooked>
            },
            {
                path:'/beATrainer',
                element: <BeATrainer></BeATrainer>
            },
            {
                path: '/community',
                element: <Forum></Forum>,
                loader: ()=> fetch('http://localhost:5000/articlesCount')
            },
            {
                path: 'dashboard',
                element: <Dashboard></Dashboard>,
                children: [
                    {
                        path: 'subscribers',
                        element: <Subscribers></Subscribers>
                    },
                    {
                        path: 'trainers',
                        element: <AllTrainers></AllTrainers>
                    },
                    {
                        path: 'newTrainers',
                        element: <NewTrainers></NewTrainers>
                    },
                    {
                        path: 'forum',
                        element: <AddForum></AddForum>
                    },
                    {
                        path: 'addClass',
                        element: <AddClasses></AddClasses>
                    }
                ]
            }
        ]
    }
])

export default Myrouter;