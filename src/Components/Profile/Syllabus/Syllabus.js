import React from 'react'
import { Header } from '../../Header/Header';
import NavBar from '../../NavBar/NavBar';
import SyllabusPop from '../../popUp/SyllabusPop';
import { useLocation } from 'react-router-dom';
import SyllabusTile from './SyllabusTile';
import { useState } from 'react';
const Syllabus = () => {
  const location = useLocation();
  const section = location.state?.section;
  const id = location.state?.id;
  const [bool, setBool] = useState(false);
  return (
    <>
    <Header />
    <NavBar page = {true} section = {section} id = {id}/>
      <SyllabusTile id = {id} bool = {bool} setBool = {setBool}/>
      <SyllabusPop id = {id} bool = {bool} setBool = {setBool}/>
    
    </>
    
  )
}

export default Syllabus;
