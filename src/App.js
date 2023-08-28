import logo from './logo.svg';
import './App.css';
import Login from './Components/login'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Register } from './Components/Register/Register';
import Profile from "./Components/Profile/profile"
import Layout from './Layout/layout';
import RequireAuth from './packages/Auth/requireAuth';
import Syllabus from './Components/Profile/Syllabus/Syllabus';
import NavBar from './Components/NavBar/NavBar';
import Plan from './Components/Profile/Plan/Plan';
import Assignments from './Components/Profile/Assignments/Assignments';
import Resources from './Components/Profile/Resources/Resources';
function App() {
  return (
    <Router>
      
        <Routes>
          
          <Route path = "/" element = {<Layout/>}>
            {/* <Route element = {<PrivRoutes/>}> */}
          <Route element = {<Login/>} path = "/" exact/>
          <Route element = {<RequireAuth/>} >
          <Route element = {<Profile/>} path = "/Profile" />
          <Route element = {<Syllabus/>} path = "/syllabus"/>
          <Route element = {<Plan/>} path = "/plan"/>
          <Route element = {<Assignments/>} path = "/assignments"/>
          <Route element = {<Resources/>} path = "/resources"/>
          </Route>
          
          {/* </Route> */}
         
           <Route element = {<Register/>} path = "/Register" /> 
          </Route>
        </Routes>
          
    </Router>
  );
}

export default App;
