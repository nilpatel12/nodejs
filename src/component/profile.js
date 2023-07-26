import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import Header from './Header';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Profile.css";
import toast from 'react-hot-toast';
var bg = { "background-color": "#99aab5" }

function Profile() {
  const [users, setUser] = useState({
    fname: "",
    email: "",
    hobbies: [],
  });

  const navigate = useNavigate();

  // const { fname, email, hobbies } = users;
  // const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (e) => {
    console.log("ujash 24", e);
    setUser({ ...users, [e.target.name]: e.target.value });
    console.log({ ...users, [e.target.name]: e.target.value });

  };

  const checkboxValue = (e) => {
    const { name, value, checked } = e.target;
    console.log(`${value} is ${checked}`, "mayal 33");
    if (checked) {
      setUser({ ...users, [name]: [...users[name], value] });
    } else {
      let finalValue = users && users[name].filter((e) => e !== value);
      setUser({ ...users, [name]: finalValue });
      // finalValue();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // user.hobbies = selectedValues
      // console.log(selectedValues)
      const res = await axios.put('http://localhost:4000/Route/index/users/update', users);
      console.log(res, "mayal 66");
      localStorage.setItem('user-info', JSON.stringify(users));
      navigate('/dashboard');
      toast.success('User updated Successful')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // const token = localStorage.getItem('token');
        // const usertoken = JSON.stringify(token)
        // console.log(token);
        const res = await axios.get('http://localhost:4000/Route/index/profile', users);
        console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    if (userInfo) {
      navigate("/profile");
    }
  }, [navigate]);


  return (

    <>
      <Header />
      <div className="profile-container">
        <Form onSubmit={handleSubmit}>

          <h1>Profile Page</h1>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" name="fname" id="fname" value={users.fname} onChange={handleChange} placeholder="Enter Your Name" />
          </FormGroup>

          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" value={users.email} onChange={handleChange} placeholder="Enter Your Email" />
          </FormGroup>


          <FormGroup>
            <Label for="hobbies">Hobbies</Label>
            <div>
              <FormGroup check inline>
                <Label checked>
                  <Input type="checkbox" name="hobbies" value="Music" onChange={checkboxValue}
                    checked={users?.hobbies?.includes("Music")}
                  />
                  Music
                </Label>
              </FormGroup>

              <FormGroup check inline>
                <Label checked >
                  <Input type="checkbox" name="hobbies" value="Movies" onChange={checkboxValue}
                    checked={users?.hobbies?.includes("Movies")}
                  />
                  Movies
                </Label>
              </FormGroup>

              <FormGroup check inline>
                <Label checked>
                  <Input type="checkbox" name="hobbies" value="Sports" onChange={checkboxValue}
                    checked={users?.hobbies?.includes("Sports")}
                  />
                  Sports
                </Label>
              </FormGroup>

            </div>
          </FormGroup>
          <Button style={bg}> Profile Save</Button>
        </Form>
      </div>
    </>
  );
}

export default Profile;
