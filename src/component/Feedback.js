import React, { useState } from "react";
// import NavBar from "../components/NavBar";
import Fvalidetion from './Fvalidetion';
import axios from "axios";
import toast from 'react-hot-toast';

// import { useNavigate } from "react-router-dom";
import Button from '../../node_modules/react-bootstrap/Button';
import Form from '../../node_modules/react-bootstrap/Form';
import Modal from '../../node_modules/react-bootstrap/Modal';


const FeedBack = () => {
  const [users, setUser] = useState({
    name: "",
    email: "",
   message: ""
  });
  // const navigate = useNavigate();

  const { name, email,message } = users;
  

  const handleChange = (e) => {
    console.log("ujash 24", e);
    setUser({ ...users, [e.target.name]: e.target.value });
    console.log({ ...users, [e.target.name]: e.target.value });

  };
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = Fvalidetion(users);
    if (Object.keys(errors).length === 0) {
      const res = await axios.post('http://localhost:4000/Route/index/users/feedback', users);
      console.log(res);
      toast.success("Thank you for your feedback");
      
      setShow(false)
    } else {
      setErrors(errors);
      toast.error("Please try again later");
    }
  };
  


  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        
        <div variant="success" onClick={handleShow}>
        Feedback
        </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton  >
          <Modal.Title>FeedBack</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form >
            <Form.Group className="mb-3" >
              <Form.Label>Name </Form.Label>
              <Form.Control
                type="name"
                name="name" id="name"
             value={name} onChange={handleChange} 
               placeholder="Enter Your Name"
                autoFocus
              />
                {errors.name && (
                        <p style={{ color: "red" }}>{errors.name}</p>
                      )}
            </Form.Group>
            <Form.Group className="mb-3" >
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                name="email" id="email"
             value={email} onChange={handleChange} 
                placeholder="name@example.com"
                autoFocus
              />
                {errors.email && (
                        <p style={{ color: "red" }}>{errors.email}</p>
                      )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              
            >
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" 
               name="message" id="message"
             value={message} onChange={handleChange} 
             rows={3} 
             placeholder="Enter Your Message"
             />
               {errors.message && (
                        <p style={{ color: "red" }}>{errors.message}</p>
                      )}
            </Form.Group>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="info" onClick={handleSubmit} >
            Send FeedBack
          </Button>
        </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
      </div>
    </>
  );
};
export default FeedBack;