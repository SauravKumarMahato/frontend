import React from 'react'
import Button from "react-bootstrap/Button";
import { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import useAxiosPrivate from '../../packages/Auth/useAxiosPrivate';
import API_EP from '../../utils/ApiEndPoint';
import { useEffect } from 'react';
const PlanPop = (props) => {
    const [show, setShow] = useState(false);
    const [plan, setPlan] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const [index, setIndex] = useState(0);
    const [render, setRender] = useState(false);
    const [week, setWeek] = useState('');
    const [cid, setCid] = useState();
    const [tid, setTid] = useState();
    const [pid, setPid] = useState();
    const [assignID, setAssignID] = useState();
    const [resID, setResID] = useState();
    const [tIndex, setTIndex] = useState(0);
    const [aIndex, setAIndex] = useState(0);
    const [rIndex, setRIndex] = useState(0);
    const [errMsg, setErrMsg] = useState();
    useEffect(() => {
      setErrMsg("");
    }, []);
    useEffect(()=>{
      let isMounted = true;
      const controller = new AbortController();
      const getPlan = async () =>{
          try{    
              const res = await axiosPrivate.get(`${API_EP.SECTIONS}${props.id}/chapters/`,{ signal: controller.signal});
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
    const getPlan = async () =>{
        try{    
            const res = await axiosPrivate.get(`${API_EP.SECTIONS}${props.id}/chapters/`,{ signal: controller.signal});
            console.log(res.data);
            isMounted && setPlan(res.data);
            console.log(plan);
        }catch(err){
            console.error(err);
        }
    }
    
    getPlan();
    return() => {
        isMounted = false;
        controller.abort();
    }
},[render]);

const handleCT = async() =>{
  
    try {
      console.log(pid, cid, tid);
      const res = await axiosPrivate.post(API_EP.PLAN + 'topic/', JSON.stringify(
        {
          plan: pid,
          chapter: cid,
          topic: tid
        }
      ), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      setErrMsg("Successfully Added Chapter's Topic")
      
    } catch (err) {
      setErrMsg("Add the field serially from left to right.");
    }
}
const handleWeek = async()=>{
  console.log(props.id);
    try {
      const res = await axiosPrivate.post(
        `${API_EP.SECTIONS}${0}/plan/`,
        JSON.stringify({
          plan_name: week,
          sectionyear: props.id,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res.data);
      setPid(res.data.id);
      setErrMsg("Successfully Added Week")
      setWeek("");
    } catch (err) {
      setErrMsg("Add the field serially from left to right.");
    }
}
const handleAssign = async() =>{
  console.log(props.id);
    try {
      const jdata = JSON.stringify({
        plan: pid,
        chapter: cid,
        assignment: assignID
      })
      const res = await axiosPrivate.post(API_EP.PLAN + "assignment/", jdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      setErrMsg("Successfully Added Assignment plan.");
      
    } catch (err) {
      setErrMsg("Add the field serially from left to right.");
    }
}
const handleResource = async() =>{
  console.log(props.id);
    try {
      const jdata = JSON.stringify({
        plan: pid,
        chapter: cid,
        resource: resID
      })
      const res = await axiosPrivate.post(API_EP.PLAN + "resource/", jdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      setErrMsg("Successfully Added Resources plan.");
    } catch (err) {
      setErrMsg("Add the field serially from left to right.");
    }
}
const handleClose = () =>{
  setShow(false);
  props.setBool(true);

}
  return (
  
    plan.length ? (
      <>
      <Button variant="primary" onClick={() => setShow(true)}>
    Add Plan
  </Button>
    <Modal
    show={show}
    onHide={() => setShow(false)}
    dialogClassName="custom-modal"
    aria-labelledby="example-custom-modal-styling-title"
  >
    <Modal.Header>
      <Modal.Title id="example-custom-modal-styling-title">
        Plan
      </Modal.Title>

      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
    </Modal.Header>
    <Modal.Body>
      


    <div class="p-6 space-y-6">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400" />

            <div class="flex flex-wrap gap-x-5">
              {/* first column */}
              <div>
                <div class="flex">
                  <input
                    class="border-2 rounded w-40"
                    placeholder="Week or Date"
                    name="name"
                    type="text"
                    required=""
                    onChange={(e)=>{setWeek(e.target.value)}}
                  />
                  <button
                    data-modal-hide="large-modal"
                    type="button"
                    class="ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleWeek}
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* first row ends here */}


              {/* second column */}
              <div>
                <div class="grid gap-y-2">
                  <div>
                                <select
                  className="px-6 py-2 rounded mr-2"
                  name="chapterId"
                  required=""
                  onChange={(event) => {
                      const selectedIndex = event.target.value;
                      setIndex(selectedIndex);
                      const selectedCID = plan[selectedIndex].id;
                      setCid(selectedCID);
                      setRender(true);
                  }}
              >
                  <option value="" disabled>Select a chapter</option>
                  <option>----</option>
                  {plan.map((items, index) => (
                      <option key={index} value={index}>{items.chapter_name}</option>
                  ))}
              </select>

              <select
                  className="px-6 py-2 rounded mr-2"
                  name="topicId"
                  required=""
                  onChange = {(event)=>{
                    const selectedIndex = event.target.value;
                    setTIndex(selectedIndex);
                    const selectedTID = plan[index].topic_set[selectedIndex].id;
                    setTid(selectedTID);
                    console.log(tid);
                  }}

              >
                {index  ? (
    <>
                        {console.log(tIndex)}
                        <option>----</option>
                        {plan[index].topic_set.map((item, tIndex) => (
                            <option key={tIndex} value={tIndex}>{item.topic_name}</option>
                        ))}
                    </>
                ) : <>
               
                {
                  <>
                        {console.log(index)}
                        {plan[index].topic_set.map((item, innerIndex) => (
                            <option key={innerIndex} value={item.topic_name}>{item.topic_name}</option>
                        ))}
                    </>
                }
            </>}
              </select>
                    <button
                      data-modal-hide="large-modal"
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={handleCT}
                    >
                      Add
                    </button>
                  </div>

                </div>
              </div>
              {/* second row ends here */}


              {/* third column */}
              <div>
                <div class="grid gap-y-2">
                  <div>
                    <select
                      class="px-6 py-2 rounded mr-2"
                      name="chapterId"
                      required=""
                      onChange={(event) => {
                        const selectedIndex = event.target.value;
                        setIndex(selectedIndex);
                        const selectedCID = plan[selectedIndex].id;
                        setCid(selectedCID);
                        setRender(true);
                    }}
                    >
                     <option value="" disabled>Select a chapter</option>
                     <option>----</option>
                  {plan.map((items, index) => (
                      <option key={index} value={index}>{items.chapter_name}</option>
                  ))}
                    </select>

                    <select
                      class="px-6 py-2 rounded mr-2"
                      name="chapterId"
                      required=""
                      onChange = {(event)=>{
                        const selectedIndex = event.target.value;
                        setAIndex(selectedIndex);
                        const selectedAssignID = plan[index].assignment_set[selectedIndex].id;
                        setAssignID(selectedAssignID);
                        
                      }}
                    >
                      {index && plan[index] ? (
    <>
                       <option>----</option>
                        {plan[index].assignment_set.map((item, aIndex) => (
                            <option key={aIndex} value={aIndex}>{item.assign_name}</option>
                        ))}
                    </>
                ) : <>
               {
                  <>
                        
                        {plan[index].assignment_set.map((item, innerIndex) => (
                            <option key={innerIndex} value={item.assign_name}>{item.assign_name}</option>
                        ))}
                    </>
                }
            </>}
                    </select>

                    <button
                      data-modal-hide="large-modal"
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={handleAssign}
                    >
                      Add
                    </button>
                  </div>

                </div>
              </div>
              {/* third column ends here */}


              {/* fourth column */}
              <div>
                <div class="grid gap-y-2">
                  <div>
                    <select
                      class="px-6 py-2 rounded mr-2"
                      name="chapterId"
                      required=""
                      onChange={(event) => {
                        const selectedIndex = event.target.value;
                        setIndex(selectedIndex);
                        const selectedCID = plan[selectedIndex].id;
                        setCid(selectedCID);
                        setRender(true);
                    }}
                    >
                      <option value="" disabled>Select a chapter</option>
                     <option>----</option>
                  {plan.map((items, index) => (
                      <option key={index} value={index}>{items.chapter_name}</option>
                  ))}
                    </select>

                    <select
                      class="px-6 py-2 rounded mr-2"
                      name="chapterId"
                      required=""
                      onChange = {(event)=>{
                        const selectedIndex = event.target.value;
                        setRIndex(selectedIndex);
                        const selectedresourceID = plan[index].resource_set[selectedIndex].id;
                        setResID(selectedresourceID);
                        
                      }}
                    >
                       {index && plan[index] ? (
    <>
                       <option>----</option>
                        {plan[index].resource_set.map((item, rIndex) => (
                            <option key={rIndex} value={rIndex}>{item.res_name}</option>
                        ))}
                    </>
                ) : <>
               {
                  <>
                      
                        {plan[index].resource_set.map((item, innerIndex) => (
                            <option key={innerIndex} value={item.rescource_name}>{item.res_name}</option>
                        ))}
                    </>
                }
            </>}
                    </select>

                    <button
                      data-modal-hide="large-modal"
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={handleResource}
                    >
                      Add
                    </button>
                  </div>

                </div>
              </div>
              {/* fourth ends here */}
            </div>
          </div>


    </Modal.Body>
    <Modal.Footer>
    <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>

  </Modal>
   </> ) : (<><div>NO PLANS TO SHOW SINCE NO SYLLABUS IS ADDED</div></>)
  
    
  )
}

export default PlanPop