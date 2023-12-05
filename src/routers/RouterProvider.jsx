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
import PrivateRoute from "./PrivateRoute";
import PrivateAdmin from "./PrivateAdmin";
import Error from "../pages/error/Error";
import Slots from "../dashboard/manageSlots/Slots";
import ManageMember from "../dashboard/manageMember.jsx/ManageMember";
import Payment from "../dashboard/payment/Payment";
import BookingPayment from "../pages/trainer/BookingPayment";
import Balance from "../dashboard/balance/Balance";
import WelcomeText from "../dashboard/WelcomeText";
import Activity from "../dashboard/userActivity/Activity";
import Profile from "../dashboard/userActivity/Profile";
import RecommendedClasses from "../dashboard/userActivity/RecommendedClasses";

const Myrouter = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "/classes",
        element: <Classes></Classes>,
      },
      {
        path: "/classDetails/:id",
        element: <ClassDetails></ClassDetails>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/trainer",
        element: <Trainer></Trainer>,
      },
      {
        path: "/trainers/:id",
        element: (
          <PrivateRoute>
            <TrainerDetails></TrainerDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://dexter-fitness-trainer-server.vercel.app/trainers/${params.id}`
          ),
      },
      {
        path: "/trainerBooked/:time",
        element: (
          <PrivateRoute>
            <TrainerBooked></TrainerBooked>
          </PrivateRoute>
        ),
      },
      {
        path: "/bookingPayment/:id",
        element: (
          <PrivateRoute>
            <BookingPayment></BookingPayment>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://dexter-fitness-trainer-server.vercel.app/trainers/${params.id}`
          ),
      },
      {
        path: "/beATrainer",
        element: (
          <PrivateRoute>
            <BeATrainer></BeATrainer>
          </PrivateRoute>
        ),
      },
      {
        path: "/community",
        element: <Forum></Forum>,
        loader: () =>
          fetch(
            "https://dexter-fitness-trainer-server.vercel.app/articlesCount"
          ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
        children: [
          {
            path: "/dashboard",
            element: <WelcomeText></WelcomeText>,
          },
          {
            path: "subscribers",
            element: (
              <PrivateAdmin>
                <Subscribers></Subscribers>
              </PrivateAdmin>
            ),
          },
          {
            path: "trainers",
            element: (
              <PrivateAdmin>
                <AllTrainers></AllTrainers>
              </PrivateAdmin>
            ),
          },
          {
            path: "newTrainers",
            element: (
              <PrivateAdmin>
                <NewTrainers></NewTrainers>
              </PrivateAdmin>
            ),
          },
          {
            path: "payment/:day",
            element: (
              <PrivateAdmin>
                <Payment></Payment>
              </PrivateAdmin>
            ),
          },
          {
            path: "balance",
            element: (
              <PrivateAdmin>
                <Balance></Balance>
              </PrivateAdmin>
            ),
          },
          {
            path: "forum",
            element: <AddForum></AddForum>,
          },
          {
            path: "addClass",
            element: <AddClasses></AddClasses>,
          },
          {
            path: "manageSlots",
            element: <Slots></Slots>,
          },
          {
            path: "manageMember",
            element: <ManageMember></ManageMember>,
          },
          {
            path: "activity",
            element: <Activity></Activity>,
          },
          {
            path: "profile",
            element: <Profile></Profile>,
          },
          {
            path: "classes",
            element: <RecommendedClasses></RecommendedClasses>,
          },
        ],
      },
    ],
  },
]);

export default Myrouter;
