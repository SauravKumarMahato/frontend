import React from 'react'
import { Header } from '../../Header/Header'
import NavBar from '../../NavBar/NavBar'
import { useLocation } from 'react-router-dom'
import PlanPop from '../../popUp/PlanPop'
import PlanTable from './PlanTable'
import { useState } from 'react'
const Plan = () => {
    const location = useLocation();
    const section = location.state?.section;
    const id = location.state?.id;
    const [bool, setBool] = useState(false);
  return (
    <>
    <Header />
    <NavBar section = {section} id = {id} page = {true}/>
    <PlanTable id = {id} bool = {bool} setBool = {setBool}/>
    <PlanPop id = {id} bool = {bool} setBool = {setBool}/>
    
    
    </>
  )
}

export default Plan