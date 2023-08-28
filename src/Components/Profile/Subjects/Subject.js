import API_EP from "../../../utils/ApiEndPoint";
import Edit from "../components/edit.png";
import Delete from "../components/del.png";
import { useEffect, useState } from "react";
import useAxiosPrivate from '../../../packages/Auth/useAxiosPrivate'
import AddName from "../../popUp/AddName";
import { useNavigate } from 'react-router-dom';
import DepartButton from "./DepartButton";
const Subject = (props) => {
    const axiosPrivate = useAxiosPrivate();
    const [subject, setSubject] = useState();
    const [bool, setBool] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();
        const getSubjects = async () =>{
            try{    
                const res = await axiosPrivate.get(API_EP.SUBJECTS,{ signal: controller.signal});
                console.log(res.data);
                isMounted && setSubject(res.data);
            }catch(err){
                console.error(err);
            }
        }
        
        getSubjects();
        return() => {
            isMounted = false;
            controller.abort();
        }
    },[]);
    useEffect(()=>{
      let isMounted = true;
      const controller = new AbortController();
      const getSubjects = async () =>{
          try{    
              const res = await axiosPrivate.get(API_EP.SUBJECTS,{ signal: controller.signal});
              console.log(res.data);
              isMounted && setSubject(res.data);
          }catch(err){
              console.error(err);
          }
      }
          getSubjects();
        
      return() => {
          isMounted = false;
          controller.abort();
      }
  },[props.bool]);
  //after deleting 
  useEffect(()=>{
    let isMounted = true;
    const controller = new AbortController();
    const getSubjects = async () =>{
        try{    
            const res = await axiosPrivate.get(API_EP.SUBJECTS,{ signal: controller.signal});
            console.log(res.data);
            isMounted && setSubject(res.data);
           
        }catch(err){
            console.error(err);
        }
    }
        getSubjects();
      
    return() => {
        isMounted = false;
        controller.abort();
    }
},[bool]);

  const handleDelete = async(e, id)=>{
    setBool(false);
    console.log(id);
    try{
        const res = await axiosPrivate.delete(API_EP.SUBJECTS + `${id}/`)
        setBool(true);
    }catch(err){
      console.error(err);
    }
  }


  return (
    subject ? (
      subject.map((item)=>(
        <div className="border-solid border-2 border-slate-500 rounded px-10 py-6 grid gap-y-4 hover:scale-105 " key ={item.id}>
            <div className="border-solid text-2xl grid justify-center mb-4">
              {item.sub_name}
            </div>
            {item.sectionyear_set.map((nesteditem)=>(
                <div className="grid grid-cols-3" key = {nesteditem.id} >
                <DepartButton section = {nesteditem.section} _id = {nesteditem.id}/>
                <button type="submit" className="p-1 mx-1">
                  <img src={Edit} className="h-4 w-4" alt="" />
                </button>
                <button type="submit" className="p-1" >
                  <img
                    src={Delete}
                    className="h-4 w-4"
                    alt="couldnot show icon"
                  />
                </button>
              </div>
            )
            
            )}
        
            <AddName _id = {item.id} setSubject = {setSubject}/>
            
            <div className="grid grid-cols-2 gap-x-2">
              <button type="submit" className="button rounded bg-blue-500 p-1">
                Edit
              </button>
              <button type="submit" className="button rounded bg-blue-500 p-1"  onClick = {(e)=>handleDelete(e,item.id)} >
                Delete
              </button>
            </div>
          </div>
    )) 
    
  ) : ""

  )
}
export default Subject;
