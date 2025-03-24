import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import { UserData } from "../context/UserContext";
import Home from "./pages/Home";
import "./App.css"
import Features from "./pages/Features";
import Overview from "./pages/Overview";

const App = () => {
  const {username} = UserData();
  const router = createBrowserRouter([
    {
      path: "/chatbot",
      element: username ? <Chatbot/> : <Login/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/features",
      element: <Features/>
    },
    {
      path: "/overview",
      element: <Overview/>
    },   
  ]);

  return <RouterProvider router={router}> </RouterProvider>;
};

export default App;




