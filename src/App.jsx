import { useState,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {RouterProvider, createBrowserRouter, useNavigate } from "react-router-dom"
import Root from "./Pages/Root"
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Profile from "./Pages/Profile";

function App() {
  
  const [isClicked, setIsClicked] = useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const mouseDown = () =>{
    setIsClicked(true);
  }

  const mouseUp = () => {
    setIsClicked(false)
  }

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const mouseDown = () => {
      setIsClicked(true);
    };

    const mouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
    };
  }, []);

 


  const router = createBrowserRouter([
    {path: "/", element: <Root/>, children:[
 
      {path: "/home", element :<Home/>},
      {path: "/profile/:username", element: <Profile/>}
      
    ]},
    {path: "/login", element: <Login/>},
    {path: "/register", element: <Register/>},
    
  ])

  return (
    <>
    <RouterProvider router = {router}/>
    <div
        className={`cursor ${isClicked ? 'clicked' : ''}`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      />
      </>
)}

export default App
