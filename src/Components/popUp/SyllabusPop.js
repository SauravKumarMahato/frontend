import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./syllabusPop.css";
import useAxiosPrivate from "../../packages/Auth/useAxiosPrivate";
import API_EP from "../../utils/ApiEndPoint";
function SyllabusPop(props) {
  const [show, setShow] = useState(false);
  const [chapter, setChapter] = useState("");
  const [topics, setTopics] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const [cid, setCid] = useState("");
  const [hidec, setHidec] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(null);
  const [fileUploadedR, setFileUploadedR] = useState(null);
  const [assign, setAssign] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [resource, setResource] = useState("");
  const [cname, setCname] = useState();
  const [tname, setTname] = useState();
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    setErrMsg("");
  }, [chapter, topics]);

  useEffect(()=>{
    let isMounted = true;
    const controller = new AbortController();
    const getSyllabus = async () =>{
        try{    
            const res = await axiosPrivate.get(`${API_EP.SECTIONS}${props.id}/chapters/`,{ signal: controller.signal});
            console.log(res.data[res.data.length -1]);
            if (res.data.length > 0) {
                const latestChapter = res.data[res.data.length - 1];
                isMounted && setCname(latestChapter.chapter_name);
                isMounted && setTname(latestChapter.topic_set);
            } else {
                isMounted && setCname(res.data.chapter_name);
                isMounted && setTname(res.data.topic_set);
            }
        }catch(err){
            console.error(err);
        }
    }
    
    getSyllabus();
    return() => {
        isMounted = false;
        controller.abort();
    }
},[clicked]);

  const handleChapter = async () => {
    console.log(props.id);
    setClicked(false);
    try {
      const res = await axiosPrivate.post(
        `${API_EP.SECTIONS}${0}/chapters/`,
        JSON.stringify({
          chapter_name: chapter,
          section_year: props.id,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      setCid(res.data.id);
      setChapter("");
      setHidec(true);
      setErrMsg("successfully Added");
      setClicked(true);
      setChapter('');
    } catch (err) {
      console.error(err);
    }
  };
  const handleTopics = async () => {
    setClicked(false);
    console.log(cid);
    try {
      const res = await axiosPrivate.post(
        API_EP.TOPICS,
        JSON.stringify({
          topic_name: topics,
          chapter: cid,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
    
      setTopics('');
      setClicked(true);
      setErrMsg("successfully Added");
    } catch (err) {
      console.error(err);
    }
  };
  const handleFileChange = (e) => {
    setFileUploaded(e.target.files[0]);
  };
  const handleFileChangeR = (e) => {
    setFileUploadedR(e.target.files[0]);
  };
  const handleAssign = async () => {
    console.log(props.id);
    try {
      const formData = new FormData();
      formData.append("file", fileUploaded);
      formData.append("assign_name", assign);
      formData.append("chapter", cid);
      const res = await axiosPrivate.post(API_EP.ASSIGNMENTS, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      setErrMsg("successfully Added Assigment");
      setAssign();
    } catch (err) {
      setErrMsg("Cannot Add File. First Add Chapter");
    }
  };
  const handleResource = async () => {
    console.log(props.id);
    try {
      const formData = new FormData();
      formData.append("file", fileUploadedR);
      formData.append("res_name", resource);
      formData.append("chapter", cid);
      const res = await axiosPrivate.post(API_EP.RESOURCES, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      setErrMsg("successfully Added Resource");
      setResource();
    } catch (err) {
      setErrMsg("Cannot Add File. First Add Chapter");
    }
  };

  const handleClose = () =>{
    
    setHidec(false);
    props.setBool(true);
    setShow(false);
  }

  return (
    (cname && tname) ? (
      <>
      <Button variant="primary" onClick={() => setShow(true)}>
        Add Syllabus
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="custom-modal"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header>
          <Modal.Title id="example-custom-modal-styling-title">
            Syllabus
          </Modal.Title>

          <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
        </Modal.Header>
        <Modal.Body>


         <div class="p-6 space-y-6">
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400" />

            <div class="grid grid-cols-3 ">
              <div>
                {!hidec && (
                  <div>
                    <label htmlFor="chapter" className="">
                      Chapter:{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      placeholder="Chapters"
                      width="10px"
                      class="border-2 rounded p-1 border-slate-500"
                      value={chapter}
                      onChange={(e) => {
                        setChapter(e.target.value);
                      }}
                    />
                    <button
                      data-modal-hide="large-modal"
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={handleChapter}
                    >
                      Add
                    </button>

                        <ul class="list-none">
                        <li>{cname}</li>
                        <div class="grid ul">
                        <ul class="list-disc">
                            {tname.map((item)=>(
                                <li>{item.topic_name}</li>
                            ))}
                        </ul>
                      </div>
                        </ul>
                         

                  </div>
                )}

                {hidec && (
                  <div>
                    <label htmlFor="topics" className="">
                      Topic:{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      placeholder="Topics"
                      width="10px"
                      class="border-2 rounded p-1 border-slate-500"
                      onChange={(e) => {
                        setTopics(e.target.value);
                      }}
                    />

                    <button
                      data-modal-hide="large-modal"
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={handleTopics}
                    >
                      Add
                    </button>
                    <ul class="list-none">
                        <li>{cname}</li>
                        <div class="grid ul">
                        <ul class="list-disc">
                            {tname.map((item)=>(
                                <li>{item.topic_name}</li>
                            ))}
                        </ul>
                      </div>
                        </ul>
                  </div>
                )}
              </div>

              <div>
                <div>
                  <input
                    type="text"
                    placeholder="Assignment"
                    class="border-2 rounded p-1 border-slate-500"
                    onChange={(e) => {
                      setAssign(e.target.value);
                    }}
                  />

                  <form action="/action_page.php" class="my-2">
                    <input
                      type="file"
                      id="myFile"
                      name="filename"
                      placeholder="upload"
                      onChange={handleFileChange}
                    />
                  </form>
                </div>

                <div class="">
                  <button
                    data-modal-hide="large-modal"
                    type="button"
                    class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleAssign}
                  >
                    Add
                  </button>
                </div>

              </div>

              <div>
                <div>
                  <input
                    type="text"
                    placeholder="Resources"
                    class="border-2 rounded p-1 border-slate-500"
                    onChange={(e) => {
                      setResource(e.target.value);
                    }}
                  />
                  <form action="/action_page.php" class="my-2">
                    <input
                      type="file"
                      id="myFile"
                      name="filename"
                      placeholder="upload"
                      onChange={handleFileChangeR}
                    />
                  </form>
                  <button
                    data-modal-hide="large-modal"
                    type="button"
                    class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleResource}
                  >
                    Add
                  </button>

                
                  
                </div>

              </div>
            </div>
          </div> 





        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    ) : (
    <>
    <Button variant="primary" onClick={() => setShow(true)}>
    Add Syllabus
  </Button>
    <Modal
    show={show}
    onHide={() => setShow(false)}
    dialogClassName="custom-modal"
    aria-labelledby="example-custom-modal-styling-title"
  >
    <Modal.Header>
      <Modal.Title id="example-custom-modal-styling-title">
        Syllabus
      </Modal.Title>

      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
            {errMsg}
          </p>
    </Modal.Header>
    <Modal.Body>
      


     <div class="p-6 space-y-6">
        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400" />

        <div class="grid grid-cols-3 ">
          <div>
            {!hidec && (
              <div>
                <label htmlFor="chapter" className="">
                  Chapter:{" "}
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Chapters"
                  width="10px"
                  class="border-2 rounded p-1 border-slate-500"
                  value={chapter}
                  onChange={(e) => {
                    setChapter(e.target.value);
                  }}
                />
                <button
                  data-modal-hide="large-modal"
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleChapter}
                >
                  Add
                </button>
                     

              </div>
            )}

            {hidec && (
              <div>
                <label htmlFor="topics" className="">
                  Topic:{" "}
                </label>
                <br />
                <input
                  type="text"
                  placeholder="Topics"
                  width="10px"
                  class="border-2 rounded p-1 border-slate-500"
                  onChange={(e) => {
                    setTopics(e.target.value);
                  }}
                />

                <button
                  data-modal-hide="large-modal"
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleTopics}
                >
                  Add
                </button>
              </div>
            )}
          </div>

          <div>
            <div>
              <input
                type="text"
                placeholder="Assignment"
                class="border-2 rounded p-1 border-slate-500"
                onChange={(e) => {
                  setAssign(e.target.value);
                }}
              />

              <form action="/action_page.php" class="my-2">
                <input
                  type="file"
                  id="myFile"
                  name="filename"
                  placeholder="upload"
                  onChange={handleFileChange}
                />
              </form>
            </div>

            <div class="">
              <button
                data-modal-hide="large-modal"
                type="button"
                class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleAssign}
              >
                Add
              </button>
            </div>

          </div>

          <div>
            <div>
              <input
                type="text"
                placeholder="Resources"
                class="border-2 rounded p-1 border-slate-500"
                onChange={(e) => {
                  setResource(e.target.value);
                }}
              />
              <form action="/action_page.php" class="my-2">
                <input
                  type="file"
                  id="myFile"
                  name="filename"
                  placeholder="upload"
                  onChange={handleFileChangeR}
                />
              </form>
              <button
                data-modal-hide="large-modal"
                type="button"
                class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleResource}
              >
                Add
              </button>

            
              
            </div>

          </div>
        </div>
      </div> 





    </Modal.Body>
    <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
      </Modal.Footer>
  </Modal>
  </>
  )
  );
}

export default SyllabusPop;
