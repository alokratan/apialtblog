import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../../Burl";

const Likecomp = ({ blogId, currentUserId }) => {
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    // Fetch the initial like count
    const fetchLikeCount = async () => {
      try {
        const response = await axios.get(`${BASEURL}/like/${blogId}/likeCount`);
        setLikeCount(response.data.count);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLikeCount();
  }, [blogId]);
  const fetchLikeCount = async () => {
    try {
      const response = await axios.get(`${BASEURL}/like/${blogId}/likeCount`);
      setLikeCount(response.data.count);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleLike = async () => {
    console.log(currentUserId, "blogid", blogId);
    try {
      const response = await axios.post(`${BASEURL}/like/${blogId}`, {
        userId: currentUserId,
      });
      fetchLikeCount();
      console.log(response.data.message); // Log the response message
      //   setLikeCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //   const handleDislike = async () => {
  //     try {
  //       const response = await axios.post(`/blogs/${blogId}/dislike`, {
  //         userId: currentUserId,
  //       });
  //       console.log(response.data.message); // Log the response message
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  return (
    <div className="flex justify-center items-center">
      <button onClick={handleLike}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#B4002F"
          className="w-6 h-6"
        >
          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
        </svg>
      </button>
      <p className="pl-1  text-xs">{likeCount > 0 ? likeCount : ""}</p>
      {/* <button onClick={handleDislike}>Dislike</button> */}
    </div>
  );
};

export default Likecomp;
