import React, { useState ,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from 'axios';



function Dashboard() {

 const [user, setUser]= useState([]);
 
 const navigate = useNavigate();
  
 useEffect(() => {
  async function fetchData() {
    try {
      const token = localStorage.getItem('token');
      // const usertoken = JSON.stringify(token)
      console.log(token);

      const res = await axios.get('http://localhost:4000/Route/index/profile', {
        headers: {
          Authorization: ` ${token}`
        }
      });
      console.log(res.data);
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();
}, []);

  useEffect (() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    setUser(userInfo);
    if (!userInfo){
      navigate("/");
    }
  },[navigate]);


  return (

  <>
    <Header/>
    <div> 
    <div className="text-center">
    <h1>Welcome To {user.fname}<br/> </h1>
    <h3>HOBBIES</h3>
   <h4>
    {user.hobbies && user.hobbies.map((hobbi,index) =>{
    return ( <div key={index}>{hobbi}</div>)
  })}
    {/* {user.hobbies} */}
    </h4>
    </div>
    </div>    
    </>

  )
};
export default Dashboard;