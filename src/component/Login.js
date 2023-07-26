import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import toast from 'react-hot-toast';



function Login() {

  const [user, setUser] = useState({
    fname: "",
    password: "",
  });

  const navigate = useNavigate();

  const { fname, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/Route/index/users/loginapi', user);
      console.log(res);
      localStorage.setItem('user-info', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(res.data.token));
      navigate('/dashboard');
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
      toast.error("Login UnSuccessful");
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    if (userInfo) {
      navigate("/");
    }
  }, [navigate]);


  return (
    <>
      <section className="main vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlfor="form3Example3">Email / Username </label>
                  <input type="text" id="fname"
                    name="fname"
                    value={fname}
                    onChange={handleChange} className="form-control form-control-lg" placeholder="Enter a valid email / Username" />
                </div>
                <div className="form-outline mb-3">
                  <label className="form-label" htmlfor="form3Example4">Password</label>
                  <input type="password" id="password"
                    name="password"
                    value={password}
                    onChange={handleChange} className="form-control form-control-lg"
                    placeholder="Enter password" />

                </div>
                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-primary btn-lg"
                  >Submit</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/Register"
                    className="link-danger">Register</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login;
