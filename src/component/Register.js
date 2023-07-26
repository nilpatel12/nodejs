import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import validetion from './Validetion';
import axios from "axios";
import toast from 'react-hot-toast';


const Register = () => {

  const [user, setUser] = useState({
    fname: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const { fname, email, password } = user;

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validetion(user);
    if (Object.keys(errors).length === 0) {
      const res = await axios.post('http://localhost:4000/Route/index/users/loginpost', user);
      console.log(res);
      localStorage.setItem('user-info', JSON.stringify(user));
      localStorage.setItem('token', JSON.stringify(res.data.data.token));
      navigate('/dashboard');
      toast.success("You have successfully registered");
    } else {
      setErrors(errors);
      toast.error(" registration failed");
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    if (userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="main_div">
      <div className="container">
        <section className="vh-100">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6 text-black">
                <div className="px-5 ms-xl-4"></div>
                <div className="d-flex align-items-center mt-5 h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                  <form className="mt-4" onSubmit={handleSubmit}>
                    <span className="h1 fw-bold mb-5">Registration Form</span>
                    <div className="form-outline mt-4">
                      <label className="form-label" htmlFor="name">
                        Name
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        id="fname"
                        name="fname"
                        value={fname}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter a name"
                      />
                      {errors.name && (
                        <p style={{ color: "red" }}>{errors.name}</p>
                      )}
                    </div>
                    <div className="form-outline mt-4 mb-4">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => handleChange(e)}
                        placeholder="email@example.com"
                      />
                      {errors.email && (
                        <p style={{ color: "red" }}>{errors.email}</p>
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <input
                        className="form-control form-control-lg"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter a password"
                      />
                      {errors.password && (
                        <p style={{ color: "red" }}>{errors.password}</p>
                      )}
                    </div>
                    <div className="pt-1 mb-4">
                      <button
                        className="btn btn-info btn-lg btn-block"
                        type="submit"
                      >
                        Register
                      </button>
                    </div>
                    <p>You have an account? <Link to="/" className="link-info">Login here</Link></p>
                  </form>
                </div>
              </div>
              <div className="col-sm-6 px-0 d-none d-sm-block">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  alt="Login img"
                  className="w-100 vh-100"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
export default Register