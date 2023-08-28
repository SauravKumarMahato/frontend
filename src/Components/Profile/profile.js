import React,{useState} from "react";
import { Header } from "../Header/Header";
import Subject from "./Subjects/Subject";
import API_EP from "../../utils/ApiEndPoint";
import useAxiosPrivate from "../../packages/Auth/useAxiosPrivate";
import NavBar from "../NavBar/NavBar";


const Profile = () => {
  const [subName, setSubName] = useState();
  const axiosPrivate = useAxiosPrivate();
  const [bool, setBool] = useState(false);
  const handleClick = async(e) => {
    e.preventDefault();
    setBool(false);
    let userID;
    try{
      const res0 = await axiosPrivate.get(API_EP.USERS);
      console.log(res0.data);
      userID = res0.data.id;
    }catch(err){
      console.log(err);
    }

    try{
      const res = await axiosPrivate.post(API_EP.SUBJECTS, JSON.stringify({sub_name: subName, user: userID}),
      {
          headers:{"Content-Type": "application/json"}
      }
      )
      console.log(res.data);
      setBool(true);

    
      
  }
  catch(err){
      console.log(err);
  }
 
   
    
}
  return (
    <>
      <Header />
      <NavBar page={false}/>
      <div className="grid justify-center px-40">
        <div className="flex justify-center flex-wrap my-4 gap-16 px ">
          {/*starts the subject loop */}
          <Subject bool = {bool} setBool = {setBool}/>
        </div>

        <div className="my-4">
          <input
            className="border-2 border-slate-500 mr-3 rounded p-1 "
            placeholder="Add Subject"
            onChange = {(e)=>{setSubName(e.target.value);}}
          />
          <button
            type="submit"
            className="button rounded bg-blue-500 py-1 px-2"
            onClick={handleClick}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};
export default Profile;
