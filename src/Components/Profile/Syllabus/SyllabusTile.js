import React from 'react'
import useAxiosPrivate from '../../../packages/Auth/useAxiosPrivate'
import API_EP from '../../../utils/ApiEndPoint';
import { useEffect, useState } from 'react';
const SyllabusTile = (props) => {
    const axiosPrivate = useAxiosPrivate();
    const [syllabus, setSyllabus] = useState();
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();
        const getSyllabus = async () =>{
            try{    
                const res = await axiosPrivate.get(`${API_EP.SECTIONS}${props.id}/chapters/`,{ signal: controller.signal});
                console.log(res.data);
                isMounted && setSyllabus(res.data);
            }catch(err){
                console.error(err);
            }
        }
        
        getSyllabus();
        return() => {
            isMounted = false;
            controller.abort();
        }
    },[]);
    useEffect(()=>{
        let isMounted = true;
        const controller = new AbortController();
        props.setBool(false);
        const getSyllabus = async () =>{
            try{    
                const res = await axiosPrivate.get(`${API_EP.SECTIONS}${props.id}/chapters/`,{ signal: controller.signal});
                console.log(res.data);
                isMounted && setSyllabus(res.data);
            }catch(err){
                console.error(err);
            }
        }
        
        getSyllabus();
        return() => {
            isMounted = false;
            controller.abort();
        }
    },[props.bool]);
    const handleDelete = async(e,id)=>{
            props.setBool(false);
            try{
                const res = await axiosPrivate.delete(API_EP.CHAPTER + `${id}/`)
                props.setBool(true);
            }catch(err){
              console.error(err);
            }
          }
    const handleRedirect = (url) =>{
            window.open(url, "_blank");
        
    }
    
  return (
    syllabus ? (
        syllabus.map((item)=>(
            <div class="px-32 pt-8">
            <div class="grid px-10 py-2 border-2 border-slate-500 rounded text-xl">
            <div>
          <button class="border-2 border-blue-400 bg-blue-400 rounded p-1 text-sm" onClick={(e)=>handleDelete(e,item.id)}>
            Delete entry 
        </button>
                <div class="grid justify-center mt-6">
        <table class="table-fixed border-collapse border border-slate-400">
            <tr class="border border-slate-500 px-20 ">
            <th class="bg-slate-400 px-80"  colspan="3">{item.chapter_name} </th>
            </tr>
            
            <tr>
            <td  class="border border-slate-500 pl-4  bg-slate-200" rowspan={item.topic_set.length}>Topics</td>
            <td  class="border border-slate-500 px-20" colspan="2">{item.topic_set[0].topic_name}</td>
            </tr>
            {item.topic_set.slice(1).map((nitem)=>(
                <tr>
                <td  class="border border-slate-500 px-20 " colspan="2">{nitem.topic_name}</td>
                </tr>
            ))}
            
                {item.assignment_set.length ? (
                    <>
                  <tr>
                  <td  class="border border-slate-500 pl-4  bg-slate-200" rowspan={item.assignment_set.length}>Assignments</td>
                  <td  class="border border-slate-500 px-20 ">{item.assignment_set[0].assign_name}</td>
                  <td  class="border border-slate-500 px-20 "><button class="border-2 rounded border-slate-500 px-1 bg-blue-300 text-sm " onClick={()=>handleRedirect(item.assignment_set[0].file)}>View</button></td>
                  </tr>
                  {item.assignment_set.slice(1).map((nitem)=>(
                      <tr>
                      <td  class="border border-slate-500 px-20 ">{nitem.assign_name}</td>
                      <td  class="border border-slate-500 px-20 "><button class="border-2 rounded border-slate-500 px-1 bg-blue-300 text-sm "onClick={()=>handleRedirect(nitem.file)}>View</button></td>
                      </tr>
                  ))}  
                  </>
                ) : ""}
            
            {item.resource_set.length ? (
                <>
                <tr>
            <td  class="border border-slate-500 pl-4  bg-slate-200" rowspan={item.resource_set.length}>Resources</td>
            <td  class="border border-slate-500 px-20 ">{item.resource_set[0].res_name}</td>
            <td  class="border border-slate-500 px-20 "><button class="border-2 rounded border-slate-500 px-1 bg-blue-300 text-sm "onClick={()=>handleRedirect(item.resource_set[0].file)}>View</button></td>
            </tr>
            {item.resource_set.slice(1).map((nitem)=>(
                <tr>
                <td  class="border border-slate-500 px-20 ">{nitem.res_name}</td>
                <td  class="border border-slate-500 px-20 "><button class="border-2 rounded border-slate-500 px-1 bg-blue-300 text-sm " onClick={()=>handleRedirect(nitem.file)}>View</button></td>
                </tr>
            ))}
                </>
            ) : ""}
            
            
        </table>
        </div>
        </div>
              {/* <div class="grid grid-cols-3 px-10 py-4">
            
                <div>
                  <ul class="list-none">
                    <li>{item.chapter_name}</li>
      
                    <div class="grid px-6 ul">
                    <ul class="list-disc">
                        {item.topic_set.map((nestitem)=>(
                            
                            <li>{nestitem.topic_name}</li>
                          
                        ))}
                    </ul>
                      
                    </div>
                  </ul>
                </div>
      
                
                <div>
                    {item.assignment_set.map((nesteditem)=>(
                        <div>
                        {nesteditem.assign_name}
                        <button class="border-2 border-blue-400 bg-blue-400 rounded p-1 text-sm">
                            View
                        </button>
                    </div>
                    ))}
                  
                </div>
      
                
                <div>
                {item.resource_set.map((nesteditem)=>(
                            <div>
                                {nesteditem.res_name}
                            <button class="border-2 border-blue-400 bg-blue-400 rounded p-1 text-sm">
                                View
                            </button>
                </div> 
                        ))}
                  
                </div>
              </div> */}
            </div>
          </div>
      )) 
      
    ) : ""
  
  )
}

export default SyllabusTile