import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../components/Home/Home";
import React from "react";
import AddCoffee from "../components/AddCoffees/AddCoffees";
import Coffee from "../components/Coffee/Coffee";
import UpdateCoffees from "../components/UpdateCoffees/UpdateCoffees";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import Users from "../components/Users/Users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "addCoffee",
        element: <AddCoffee></AddCoffee>,
      },
      {
        path: "coffee",
        element: <Coffee></Coffee>,
        loader: () =>
          fetch(
            "https://coffee-store-server-hc857uldy-md-mahbub-aloms-projects.vercel.app/coffees"
          ),
      },
      {
        path: "updateCoffee/:id",
        element: <UpdateCoffees></UpdateCoffees>,
        loader: ({ params }) =>
          fetch(
            `https://coffee-store-server-hc857uldy-md-mahbub-aloms-projects.vercel.app/coffees/${params.id}`
          ),
      },
      {
        path: "signIn",
        element: <SignIn></SignIn>,
      },
      {
        path: "signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "users",
        element: <Users></Users>,
        loader: () =>
          fetch(
            "https://coffee-store-server-hc857uldy-md-mahbub-aloms-projects.vercel.app/users"
          ),
      },
    ],
  },
]);

export default router;
