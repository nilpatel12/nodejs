import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"


import './Dahbord.css';
import FeedBack from "./Feedback";

var bg={"background-color":"#99aab5"}
function Header() {

  const navigate = useNavigate();

  const [user, setUser] = useState({});

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    if (!userInfo) {
      navigate("/")
    }
    setUser(userInfo);
  }, []);

  const handleLogout = () => {
    localStorage.clear()
    navigate("/");
  }


  return (

    <div>
      <nav class="navbar navbar-expand-lg" style={bg}>
        <div class="container-fluid">
          <a class="navbar-brand" href="">creensight</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link " aria-current="page" href="/dashboard">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/profile">Profile</a>
              </li> 
              <li class="nav-item">
                <a class="nav-link" href="#" >
                <FeedBack/></a>
              </li> 
              <li class="nav-item">
                <a class="nav-link" href="/list">List</a>
              </li> 
            </ul>
            <form class="d-flex">
              <h6> {user.username}</h6>
              <button class="btn btn-outline-success " onClick={handleLogout} type="Logout">Logout</button>
            </form>
            
          </div>
        </div>
      </nav>
    </div>
  );
}
export default Header;