import React, { useEffect, useState} from 'react'
import { Header } from '../../Header/Header'
import NavBar from '../../NavBar/NavBar'
import { useLocation } from 'react-router-dom'
import View from '../components/view.png'
import useAxiosPrivate from '../../../packages/Auth/useAxiosPrivate'
import API_EP from '../../../utils/ApiEndPoint'
const Assignments = () => {
  
    const location = useLocation();
    const section = location.state?.section;
    const id = location.state?.id;
    const axiosPrivate = useAxiosPrivate();
    const [assign, setAssign] = useState();
    useEffect(()=>{
      let isMounted = true;
      const controller = new AbortController();
      const getAssign = async () =>{
          try{    
              const res = await axiosPrivate.get(`${API_EP.ASSIGN}${id}/`,{ signal: controller.signal});
             
              isMounted && setAssign(res.data);
              console.log(assign);
          }catch(err){
              console.error(err);
          }
      }
      
      getAssign();
      return() => {
          isMounted = false;
          controller.abort();
      }
  },[]);
    const handleView = (url) =>{
      window.open(url, "_blank");
    }
  return (
    <> 
    <Header />
    <NavBar section = {section} id = {id} page = {true}/>
    {assign ? (
      assign.map((item) =>(
        item.assignment_set.length ? (
          <>
      <div class="grid justify-center mt-6">
      <table class="table-fixed border-collapse border border-slate-400">
        <thead>
          <tr>
            <th class="border border-slate-500 px-20 bg-slate-400  ">Chapters<br /></th>
            <th class="border border-slate-500 px-20 bg-slate-400  ">Assignment Name</th>
            <th class="border border-slate-500 px-20 bg-slate-400  ">View</th>
          </tr>
        </thead>
        <tbody>
          {item.assignment_set.length ? (
            <>
            <tr>
            <td class="border border-slate-500 px-20 " rowspan={item.assignment_set.length}>{item.chapter_name}</td>
            
            <td class="border border-slate-500 px-20 ">{item.assignment_set[0].assign_name}</td>
            <td class="border border-slate-500 px-20 ">
              <button onClick = {()=>handleView(item.assignment_set[0].file)}>
                <img
                  src={View}
                  class="h-8"
                  alt=""
                />
              </button>
            </td>
          
          </tr>
            
            {item.assignment_set.slice(1).map((nitem)=>(
              <>
              <tr>
              <td class="border border-slate-500 px-20 ">{nitem.assign_name}</td>
              <td class="border border-slate-500 px-20 ">
                <button onClick = {()=>handleView(nitem.file)}>
                  <img
                    src={View}
                    class="h-8"
                    alt=""
                  />
                </button>
              </td>
  
            </tr>
              </>
              
                ))}
                </>
          ): ""}
          
          
          
          {/* <tr>
            <td class="border border-slate-500 px-8 " rowspan={item.}>2</td>
            <td class="border border-slate-500 px-20 " rowspan="3">
              Subtraction
            </td>
            <td class="border border-slate-500 px-20 ">2-bit subtraction</td>
            <td class="border border-slate-500 px-20 ">
              <button>
                <img
                  src={View}
                  class="h-8"
                  alt=""
                />
              </button>
            </td>

          </tr>
          <tr>
            <td class="border border-slate-500 px-20 ">4-bit subtraction</td>
            <td class="border border-slate-500 px-20 ">
              <button>
                <img
                  src={View}
                  class="h-8"
                  alt=""
                />
              </button>
            </td>

          </tr>
          <tr>
            <td class="border border-slate-500 px-20 ">8-bit subtraction</td>
            <td class="border border-slate-500 px-20 ">
              <button>
                <img
                  src={View}
                  class="h-8"
                  alt=""
                />
              </button>
            </td>

          </tr> */}
        </tbody>
      </table>
    </div>
    </>
        ) : ""

      ))
      
      
    ): ""}
    
    
    </>
  )
}

export default Assignments