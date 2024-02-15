import axios from "axios";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};
const getrefreshToken = () => {
  const refreshToken = localStorage.getItem("refreshToken");
  return refreshToken;
};



const updateaccesstoken = async () => {
  
  try {
    const response = await axios.post(`/api/api/v1/users/refreshtoken`, {
      
  refreshToken: getrefreshToken(),
    });
    // console.log("update token",response.data);
   localStorage.setItem("accessToken", response.data.data.accessToken);
    localStorage.setItem("refreshToken", response.data.data.refreshToken);
    return response.data;

  } catch (error) {
    return error;
  }
};
const getAllBlogs = async () => {
  
  try {
    const response = await axios.get(`/api/api/v1/blog`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

const getprofile = async (name, email) => {
  // console.log("get pro",email, name);
  try {
    const response = await axios.post(
      `/api/api/v1/users/profile/${name}`,
      {
        email:email,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
     
    );
    return response.data;
  } catch (error) {
    return error;
  }
};


const followuserbyid = async (userid) => {
  
  try {
    const response = await axios.post(`/api/api/v1/follow/true`,{
      followedto:userid
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
const getuserdetails = async () => {
  
  try {
    const response = await axios.get(`/api/api/v1/users/getuserdetails`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    
    return response.data
  } catch (error) {
    return error.response.data
  }
};
const createblogfn = async (values) => {
  console.log("create blog", values);
  try {
    const response = await axios.post(`/api/api/v1/blog/create`,{
      title:values.title,
      content:values.description
    }, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error?.response.status);
    return error?.response.status;
  }
};
// /users/register

const userregister = async (values) => {

  try {
    const response = await axios.post(`/api/api/v1/users/register`,values, {
      headers: {
        "Content-Type": "application/json"
      
      },
    });
    return response.data;
  } catch (error) {
    console.log(error?.response.status);
    return error?.response.status;
  }
};
const logoutfn = async () => {
  console.log(getAccessToken())
  try {
    const response = await axios.post(`/api/api/v1/users/logout`,{}, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
   
    console.log(response.data);
    localStorage.clear();
   
    return response.data;
  } catch (error) {
    console.log(error?.response.status);
    return error?.response.status;
  }
};


export { updateaccesstoken,getAllBlogs,logoutfn, getprofile,followuserbyid ,getuserdetails,createblogfn,userregister};
