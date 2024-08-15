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
    {path: "/react-social-media-ver2", element: <Root/>, children:[
 
      {path: "/react-social-media-ver2/home", element :<Home/>},
      {path: "/react-social-media-ver2/profile/:username", element: <Profile/>}
      
    ]},
    {path: "/react-social-media-ver2/login", element: <Login/>},
    {path: "/react-social-media-ver2/register", element: <Register/>},
    
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
