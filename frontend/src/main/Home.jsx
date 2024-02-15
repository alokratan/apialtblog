import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { Toaster, toast } from "react-hot-toast";
import { getAllBlogs, getuserdetails, logoutfn, updateaccesstoken } from "../apis/register";
import ViewProfile from "./comp/ViewProfile";
import Wait from "./comp/Wait";
import LogoutModal from "./comp/LogoutModal";

const PostList = () => {
  const navi = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [openmenu, setOpenmenu] = useState(false);
  const [comment, setComment] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [uid, setUid] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
 
  const [expandedItem, setExpandedItem] = useState(null);
  const [viewprofileid, setViewprofileid] = useState("");
  const [viewProfilemodal, setViewProfilemodal] = useState(false);
  const [personal, setPersonal] = useState([]);




  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navi("/signin");
  
    }
     const fetchData = async () => {
   
       if (!localStorage.getItem("accessToken")) {
        navi("/signin");
       

      } else {
         toast.loading("Please Wait...", { id: "1" });
        const userpersonal=await getuserdetails();
          if(userpersonal.success==false){
            console.log("false:",userpersonal.success);
            const datatoken=await updateaccesstoken();
            // console.log("tokenupdate",datatoken);
            window.location.reload();
            // toast.error(userpersonal?.statusText, { id: "1" });
          }else{
            console.log("true:",userpersonal.success);
            toast.success("Welcome to ALTblog", { id: "1" });
            setPersonal([userpersonal.data]);
            const getData = await getAllBlogs();
            //  console.log(userpersonal.data);
            setPosts(getData?.data.reverse()); 
          }
            
      }
    }
    return ()=>fetchData()
   

  }, []); // Ensure the dependencies array is empty to run only on mount
  
 
  const toggleExpand = (data) => {
    setViewprofileid(data);
    
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // const handleSubmit = (event, ablogid) => {
  //   event.preventDefault(); // Prevent the default form submission behavior
  //   console.log("Comment submitted:", comment[ablogid]);
  //   const textdata = comment[ablogid];
  //   fetchCommentfn(textdata, ablogid);
  //   setComment((prevState) => ({ ...prevState, [ablogid]: "" }));

  //   // Add any additional logic to handle the submission here
  // };

  // const commentfn = (e, id) => {
  //   const { value } = e.target;
  //   setComment((prevState) => ({ ...prevState, [id]: value }));
  // };

  // const fetchCommentfn = async (txt, bid) => {
  //   console.log("console.log: text bid uid:", txt, bid, uid);
  //   try {
  //     const response = await axios.post(`${BASEURL}/comment`, {
  //       text: txt,
  //       user: uid,
  //       blogPost: bid,
  //     });
  //     const jsonData = response.data;
  //     console.log(jsonData);
  //     fetchData();
  //   } catch (error) {
  //     console.log("Error fetching data:", error);
  //   }
  // };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const handleLogout = async() => {
    // Perform your logout logic here
    // For simplicity, we'll just set the modal to close
      await logoutfn();
      setModalOpen(false);
      navi("/signin");
     
  };

  // const linkmodalfn = (id) => {
  //   console.log(id);
  //   setModalOpen2(true);
  // };

 
 
  // const fetchData2 = async (uid) => {
  //   const storedToken = localStorage.getItem('token');
  //   try {
  //     const response = await axios.get(`${BASEURL}/altblog/user-blog/${uid}`,
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `${storedToken}`,
  //       },}
  //     );
  //     const jsonData = response.data;
  //     console.log(jsonData);
  //     setUsers(jsonData);
  //     localStorage.setItem("userdata", JSON.stringify(jsonData));
  //   } catch (error) {
  //     console.log("Error fetching data:", error);
  //   }
  // };

  const openmenufn = () => {
    setOpenmenu(!openmenu);
  };

  // const handlereload = () => {
  //   window.location.reload();
  // };

  const viewProfilefn = (id) => {
   setViewProfilemodal(true)
   setViewprofileid(id);
  }


 

  return (
    <>
      <Toaster />
      <div className="bg-[url('/public/createblog.jpg')] h-screen overflow-y-scroll  bg-no-repeat bg-fixed  bg-center  bg-cover ">
        <LogoutModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onLogout={handleLogout}
        />
         

        {/* <Serverlive isOpen={error} reloadpage={handlereload} /> */}
  <ViewProfile  
          isOpen={viewProfilemodal}
          onClose={() => setViewProfilemodal(false)}
            onLogout={viewprofileid}
        />
        <Link
          className="bg-slate-900 w-32 fixed shadow-lg  bottom-5 left-5  py-2 rounded px-2 text-center text-md font-semibold text-white"
          to="/createblog"
        >
          Create Blog
        </Link>
        <button
          className="bg-slate-900 w-32 fixed shadow-lg  bottom-5 right-5  py-2 rounded px-2 text-center text-md font-semibold text-white"
           onClick={openmenufn}
        >
          Menu
        </button>

        <div className="bg-slate-900 sticky top-0  flex justify-between px-8 items-center py-6 md:w-full">
          <h1 className="text-xl sm:text-xl md:text-3xl lg:text-3xl text-center text-white font-bold">
            ALTBLOGS
          </h1>

          <button
             onClick={openmenufn}
            className="flex bg-white justify-center items-center py-2  px-5 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="grey"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>

            <h3 className="text-slate-900 sm:text-sm md:text-sm lg:text-lg  mx-3 font-bold capitalize ">
              {personal[0]?personal[0].fullname:""}
            </h3>
          </button>
        </div>
        {/* Add the search input element in the navbar */}
        <div className="flex w-full fixed justify-center items-center px-4 rounded-md">
          <input
            type="text"
            placeholder="Search by Blog Title"
            value={searchQuery}
            onChange={handleSearchChange}
            className=" bg-slate-900 w-4/5 lg:w-1/3 md:w-2/3 sm:w-2/3 text-white shadow-lg outline-none font-semibold rounded-b-3xl lg:rounded-b-full text-center  pb-3"
          />
        </div>
        

        <div>
        
          {openmenu ? (
            <div className="right-0  px-2 py-1 h-screen bg-slate-900 fixed w-40">
              <div className="flex flex-col flex-1">
                <Link
                  to={"/profile"}
                  className="bg-white my-3 w-full px-2 py-2  text-black font-bold"
                >
                  Profile
                </Link>
                <Link
                  to={"/blog"}
                  className="bg-white my-3 w-full px-2 py-2  text-black font-bold"
                >
                  My Blogs
                </Link>
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-white text-left my-3 w-full px-2 py-2  text-black font-bold"
                >
                  Logout
                </button>
              </div>
              <div className="flex mt-6 mb-28 flex-col justify-center items-center w-full ">
                <h4 className="text-white font-bold uppercase ">Total Blogs</h4>
                <h1 className="text-white font-bold text-2xl">
                  {filteredPosts.length}
                </h1>
              </div>
              <button
                className="bg-white w-32 hover:scale-104 fixed shadow-lg  bottom-5 right-5  py-2 rounded px-2 text-center text-md font-semibold text-slate-900"
                 onClick={openmenufn}
              >
                Close
              </button>
            </div>
          ) : (
            <div></div>
          )}

        
         {/* {viewProfilemodal && (
          <div className="w-full z-50 flex justify-center h-full items-center  fixed">
            <div className=" w-96 h-96 bg-white">
              <h3>
                hello
              </h3>
             
           
              </div>
          </div>
        )} */}
         


          {filteredPosts.length > 0 ? (
            filteredPosts
              .map((a) => (
                <div
                  className="w-full flex flex-col pt-12 px-3 justify-center items-center "
                  key={a._id}
                >
                  
                  <div className="w-full shadow-md  lg:w-3/4 md:w-3/4 sm:w-full  p-4 rounded-md mx-3 my-1 bg-slate-200 flex flex-col justify-center">
                   
                    <div className="flex items-center my-1">
                      <div className=" mr-auto">
                     
                        <h2 className="font-bold text-xl capitalize">
                          {a.title}
                        </h2>
                       
                      </div>
                      {/* <Likecomp blogId={a._id} currentUserId={users._id} /> */}
                    </div>

                    <div className="flex  mr-auto my-1 ">
                    <blockquote className="font-semibold  capitalize text-sm text-slate-500">
                      Posted By:  <span className="hover:underline font-bold text-slate-600 cursor-pointer ">
                        <button onClick={() => viewProfilefn([a.author,a.authorEmail])} > 
                          {a.author}
                          </button> </span> 
                      </blockquote> 
                    </div>

                    <div className=" shadow-md bg-white w-full rounded-md py-4 px-4  mr-auto my-1">
                      <h2 className="text-justify text-slate-600  text leading-loose font-serif italic">
                        {a.content}
                      </h2>

                    </div>
                    <div className=" pl-2 flex justify-between mr-auto w-full my-1 ">
                    <p className="font-semibold text-sm text-slate-500">
                        {new Date(a.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "numeric",
                          minute: "numeric",

                            
                        }).replace(" at",",") }

                      </p>
                      </div>
                        
                    {/* <div className=" flex justify-between mr-auto w-full my-1 ">
                      <blockquote className="font-semibold  capitalize text-sm text-slate-700">
                      helloo  
                      </blockquote>
                      {a.comments.length > 0 ? (
                        <div className="flex justify-start">
                          <Link
                            className=" flex"
                            onClick={() => toggleExpand(a._id)}
                          >
                            {expandedItem !== a._id ? (
                              <h3 className="pr-1 font-semibold  capitalize text-sm text-slate-700">
                                Show Comments
                              </h3>
                            ) : (
                              <h3 className="pr-1 font-semibold  capitalize text-sm text-slate-700">
                                Hide Comments
                              </h3>
                            )}

                            <h3 className="font-semibold  capitalize text-sm text-slate-700">
                              ({a.comments.length})
                            </h3>
                          </Link>

                        </div>
                      ) : (
                        <h3></h3>
                      )}
                    </div> */}

                    {expandedItem === a._id && (
                      <div className="bg-slate-100 p-5 m-2 rounded-md "  >
                      
                        {a.comments.map((b) => (
                          <h3 key={b._id} className="pr-1 py-1 font-bold capitalize text-sm text-slate-500">
                            {b.user.fullname} : <span className="pr-1 font-normal normal text-sm text-slate-500">{b.text}</span>
                          </h3>
                        ))}
                      </div>
                    )}
            
                    <form
                      onSubmit={(e) => handleSubmit(e, a._id)}
                      className="w-full flex rounded-md items-center justify-center mr-auto my-1"
                    >
                      <input
                        onChange={(e) => commentfn(e, a._id)}
                        value={comment[a._id] || ""}
                        type="text"
                        className="border shadow-sm text-slate-700 outline-0 rounded-full pl-6 text-sm p-2 w-full"
                        placeholder="Type your comment here"
                      />
                      <button
                        type="submit"
                        className="bg-slate-900 rounded-full text-white font-bold py-2 px-2 mx-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              ))
              .reverse()
          ) : (
            <>
              {!error ? (
                <div className="flex flex-1 h-96 justify-center items-center">
                  <h2 className=" text-white font-semibold">
                    NO POST AVAILABLE
                  </h2>
                </div>
              ) : (
              <Wait/>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PostList;