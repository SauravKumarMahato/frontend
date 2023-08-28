import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
const DepartButton = (props) => {
    const navigate = useNavigate();
    const handleNavigate= ()=>{
        navigate('/syllabus', { state: { section: props.section, id: props._id } });
      }
      const spanStyles = {
        cursor: 'pointer',
      };
  return (
    <span onClick= {handleNavigate} style = {spanStyles}>{props.section}</span>
  )
}
export default DepartButton