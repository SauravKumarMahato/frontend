import { useState } from 'react';
import { axiosPrivate } from '../../api/axios/axios';
import API_EP from '../../utils/ApiEndPoint';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';

function AddName(props) {
  const [show, setShow] = useState(false);
  const [section, setSection] = useState('');
  const [bool, setBool] = useState(false);
  useEffect(()=>{
    let isMounted = true;
    const controller = new AbortController();
    const getSubjects = async () =>{
        try{    
            const res = await axiosPrivate.get(API_EP.SUBJECTS,{ signal: controller.signal});
            console.log(res.data);
            isMounted && props.setSubject(res.data);
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

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const handleConfirm = async(e) =>{
      setBool(false);
      try{
        const res = await axiosPrivate.post(API_EP.SECTIONS, JSON.stringify({subject: props._id, section: section }),
        {
            headers:{"Content-Type": "application/json"}
        }
        )
        console.log(res.data);
        setBool(true);
        handleClose();
        
    }
    catch(err){
        console.log(err);
    }
   
    }
  return (
    <>
      <button onClick = {handleShow} type="submit" className="button rounded bg-blue-500 p-1" >
              Add
        </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add department/Section Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form class="w-full max-w-sm">
        <div class="flex items-center border-b border-teal-500 py-2">
        <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Eg. BCT-CD 077" aria-label="Full name" value = {section} onChange = {(e)=>{setSection(e.target.value)}}/>
        
    </div>
    </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick = {handleConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddName;