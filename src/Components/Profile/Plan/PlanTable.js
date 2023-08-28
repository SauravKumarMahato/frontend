import React from 'react'
import useAxiosPrivate from '../../../packages/Auth/useAxiosPrivate'
import API_EP from '../../../utils/ApiEndPoint';
import { useEffect, useState } from 'react';
const PlanTable = (props) => {
    const axiosPrivate = useAxiosPrivate();
    const [plan, setPlan] = useState([]);
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();
        const getPlan = async () =>{
            try{    
                const res = await axiosPrivate.get(`${API_EP.SECTIONS}${props.id}/plan/`,{ signal: controller.signal});
                console.log(res.data);
                isMounted && setPlan(res.data);
            }catch(err){
                console.error(err);
            }
        }
        
        getPlan();
        return() => {
            isMounted = false;
            controller.abort();
        }
    },[]);
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();
        props.setBool(false);
        const getPlan = async () =>{
            try{    
                const res = await axiosPrivate.get(`${API_EP.SECTIONS}${props.id}/plan/`,{ signal: controller.signal});
                console.log(res.data);
                isMounted && setPlan(res.data);
            }catch(err){
                console.error(err);
            }
        }
        
        getPlan();
        return() => {
            isMounted = false;
            controller.abort();
        }
    },[props.bool]);
    const handleDelete = async(e,id)=>{
      props.setBool(false);
      try{
          const res = await axiosPrivate.delete(API_EP.PLAN + `${id}/`)
          props.setBool(true);
      }catch(err){
        console.error(err);
      }
    }
    const handleDownload = async()=>{
      try{
        const res = await axiosPrivate.get(API_EP.GETPDF + `${props.id}/`)
        console.log(res.data.file);
        window.open(res.data.file, "_blank");
      }
      catch(err){
        console.error(err);
      }
      
      
    }
  return (
    plan.length ? (
      <>
      
       <button class="border-2 border-blue-400 bg-blue-400 rounded p-1 text-sm mb-1 right-0" onClick={handleDownload}>
      Download Plan
      </button>
      <br/>
      
      
        {
        plan.map((item)=>(
            
            <div class="px-32 pt-8">
              
            <div class="grid px-10 py-2 border-2 border-slate-500 rounded text-xl">
            <div>
          <button class="border-2 border-blue-400 bg-blue-400 rounded p-1 text-sm" onClick={(e)=>handleDelete(e,item.id)}>
            Delete entry 
        </button>
            <div class="grid justify-center my-6">
            <table class="table-fixed border-collapse border border-slate-400">
              <tr class="border border-slate-500 px-10">
                <th class="bg-slate-400" colspan="3">Plan : <span>{item.plan_name}</span></th>
              </tr>
              
              <tr>
                <td  class="border border-slate-500 px-10 bg-blue-200" rowspan={item.plantopic_set.length + 1}>COURSE</td>
                <td  class="border border-slate-500 px-10 bg-gray-400">Chapter</td>
                <td  class="border border-slate-500 px-10 bg-gray-400">Topic</td>
              </tr>
              
              {item.plantopic_set.map((item)=>(
                <tr>
                <td  class="border border-slate-500 px-10">{item.chapter.chapter_name}</td>
                <td  class="border border-slate-500 px-10">{item.topic.topic_name}</td>
                </tr>
              ))}
              <tr>
                <td  class="border border-slate-500 px-10 bg-yellow-100" rowspan={item.planassignment_set.length + 1}>ASSIGNMENTS</td>
                <td  class="border border-slate-500 px-10 bg-gray-400">Chapter</td>
                <td  class="border border-slate-500 px-10 bg-gray-400">Topic</td>
              </tr>
              {item.planassignment_set.map((item)=>(
                  <tr>
                  <td  class="border border-slate-500 px-10">{item.chapter.chapter_name}</td>
                  <td  class="border border-slate-500 px-10">{item.assignment.assign_name}</td>
                </tr>  
                 
              ))}
              
              <tr>
                <td  class="border border-slate-500 px-10 bg-purple-200" rowspan={item.planassignment_set.length + 1}>RESOURCES</td>
                <td  class="border border-slate-500 px-10 bg-gray-400">Chapter</td>
                <td  class="border border-slate-500 px-10 bg-gray-400">Topic</td>
              </tr>
              
              {item.planresource_set.map((item)=>(
                  <tr>
                  <td  class="border border-slate-500 px-10">{item.chapter.chapter_name}</td>
                  <td  class="border border-slate-500 px-10">{item.resource.res_name}</td>
                </tr>
                 
              ))}
            </table>
          </div>
          </div>
          </div>
          </div>
        
          
              
      )) }
      
    </>) : ""
  
  )
}

export default PlanTable


  