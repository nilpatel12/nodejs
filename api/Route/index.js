const express = require('express');
const knex = require('knex');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const router = express.Router();
const app = express();
const hashedPassword = '$2b$10$V7ZUhYwQBlWzjx/NxlyxKObJnmsCK9XWdGtL1RlOZtvYd70m7rmDu';
const jwtkey = 'e-user';
const saltRounds = 10
const verifyUserToken = require('../auth/auth');

require("dotenv").config();


const { getUser,
   postUser,
   putUser,
   deleteUser,
   creatUser,
   validateEmail,
   loginapi,
   profile,
   profilepost,
   profileput,
   getUserProfiles,
   feedback,
   userslist,
   userslistpost
   } = require('./../users/users.js');


router.get('/users', verifyUserToken ,async (req, res) => {
  try {
    const users = await getUser();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving users from database.');
  }
});

router.post('/users/create', async (req, res) => {
  try {
    const { fname,   email, password } = req.body;
    const insertedRows = await postUser(fname,   email, password);
    res.status(201).json(insertedRows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/users/update', async (req, res) => {
    try {
      const { id, fname,  email, password,hobbies } = req.body;
       await putUser(id, fname, email, password,hobbies);
       console.log(hobbies ,"mayal 51")
      res.status(200).send('User updated successfully');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
router.delete('/users/delete', async (req, res) => {
    const id = req.body.id;
    try {
      const result = await deleteUser(id);
      res.json(result);
    } catch (error) {
      res.status(500).json(error);
    }
});

router.post('/users/loginpost', async (req, res) => {
    try {
      const { fname,email, password } = req.body;
      let emailValidateStatus = await validateEmail(email);

      console.log("ujash 160", emailValidateStatus);
      const hashedPassword = await bcrypt.hash(password, 10);
  
      if (emailValidateStatus) {
        const insertedRows = await creatUser(fname,  email, hashedPassword);
        res.status(201).json({ status: true, message: "Success.", data: insertedRows });
      } else {
        res.status(201).json({ status: false, message: "Something went wrong / Email already exists." });
      }
    } catch (error) {
      res.status(500).json({ status: false, error: error.message });
    }
});
  

router.post("/users/loginapi", async (req, res) => {
    try{
    const {fname, password } = req.body;
    //check if user exists
      const result = await loginapi(fname, password);
      res.status(200).json(result);
    }
    catch (err) {
          console.log( "mayal 94 ", err.message )
          res.status(401).json({ message: err.message });
    
        }
});

router.get('/profile' ,async (req, res) => {
    try {
      const users = await profile();
      console.log(users,"106")
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error retrieving users from database.');
    }
});


router.post('/profile/create', async (req, res) => {
  try {
    
    const { fname,   email,hobbies} = req.body;
    const insertedRows = await profilepost(fname,email,hobbies);
    res.status(201).json(insertedRows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/profile/update', async (req, res) => {
    try {
      const { id,  hobbies } = req.body;
       await profileput(id, fname, email, hobbies);
      res.status(200).send('User updated successfully');
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
  
router.get('/profile/join', getUserProfiles);

router.post('/users/feedback', feedback);

router.get('/userslist', async (req, res) => {
  try {
    const page = parseInt(req.body.page) || 1;
    const limit = parseInt(req.body.limit) || 10; 

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const users = await userslist();

    const paginatedUsers = users.slice(startIndex, endIndex); 

    const totalPages = Math.ceil(users.length / limit);

    console.log(paginatedUsers, "106");
    res.json({
      totalPages,
      currentPage: page,
      users: paginatedUsers
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving users from the database.');
  }
});

router.post('/users/listing', async (req, res) => {
  try {
    const { page, limit, searchQuery } = req.body;
    const users = await userslistpost(page, limit, searchQuery);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

  module.exports = router;
