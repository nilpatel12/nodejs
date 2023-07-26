
const knex = require('../Database/db.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();


async function getUser() {
  try {
    const users = await knex('users').select()
    // .where('first_name', 'like', `%${name}%`)
    // .where('first_name', '=', name);
    return users;
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving users from database.');
  }
}

async function postUser(fname, email, hashedPassword) {

  try {
    const user = await knex('users').insert({ fname, email, password: hashedPassword }).returning('*');
    return user;
  } catch (error) {
    return error;

  }
}

async function putUser(id, fname, email, password, hobbies) {

  try {
    await knex('users')
      .where({ 'id': id })
      .update({
        "users.fname": fname,

        "users.email": email,
        "users.password": password,
        "users.hobbies": JSON.stringify(hobbies),
      });
    return user;
  } catch (error) {
    return error;
  }
}

async function deleteUser(id) {
  try {
    const result = await knex('users').where({ id: id }).del().returning('*');
    return result;
  } catch (error) {
    return error;
  }
}

async function validateEmail(Email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(Email)) {
    return 'Invalid email address';
  }
  const user = await knex('users').where({ Email }).first();
  console.log(user)
  if (user) {
    return false;
  } else {
    return true;
  }
}

async function creatUser(fname, email, password) {

  try {
    new date()
    const user = await knex('users').insert({ fname, email, password, 'created_at': new date() }).returning('*');

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userData: user,
    }

    const token = jwt.sign(data, jwtSecretKey);
    return { message: 'successful', token: token };


  } catch (error) {
    return error;

  }
}

async function loginapi(fname, password) {
  console.log(fname);
  try {

    const user = await knex('users')
      .where("fname", "like", `%${fname}%`)
      .orWhere("email", "like", `%${fname}%`)
      .first();

    if (!user) {
      throw new Error('User not found');
    }
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Invalid password');
    } else {
      let jwtSecretKey = process.env.JWT_SECRET_KEY;

      let data = {
        time: Date(),
        userData: user,
      }

      const token = jwt.sign(data, jwtSecretKey);
      return { message: 'Login successful', token: token };
    }
  } catch (err) {

    throw err;
  }
}

async function profile() {
  try {
    const users = await knex('users').first();

    let tempValue = users.hobbies;
    let parsedValue = JSON.parse(tempValue);
    users.hobbies = parsedValue;

    return users;
  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving users from the database.');
  }
}

async function profilepost(fname, email, hobbies) {

  try {
    new date();
    const user = await knex('profile').insert({ fname, email, hobbies: JSON.stringify(hobbies), 'created_at': new date() }).returning('*');

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
      time: Date(),
      userData: user,
    }

    const token = jwt.sign(data, jwtSecretKey);
    return { message: 'successful', token: token };
    return user;
  } catch (error) {
    return error;

  }
}

async function profileput(id, fname, email, hobbies) {

  try {

    await knex('profile').where({ 'id': id }).update({ fname, email, hobbies, });
    return user;
  } catch (error) {
    return error;
  }
}

async function getUserProfiles(req, res) {
  try {
    const results = await knex('users')
      .join('profile', 'users.id', '=', 'profile.id')
      .select('users.id', 'users.fname', 'profile.hobbies', 'users.email', 'users.password')
      .first();

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

async function feedback(req, res) {
  try {
    const { name, email, message } = req.body;
    const user = await knex('feedback').insert({ name, email, message }).returning('*');

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function userslist() {
  try {
    const users = await knex('users');
    // .where('first_name', 'like', `%${name}%`)
    // .where('first_name', '=', name);
    let tempValue = users.hobbies;
    console.log(tempValue, "132")
    tempValue = JSON.stringify(tempValue);
    users.hobbies = tempValue;
    console.log(tempValue, " mayal 134")
    return users;

  } catch (error) {
    console.error(error);
    throw new Error('Error retrieving users from database.');
  }
}

async function userslistpost(page = 1, limit = 10, searchQuery) {
  try {
    const offset = (page - 1) * limit;
    let query = knex('users')
      .select('*')
      .limit(limit)
      .offset(offset);

    let queryCount = knex('users')
      .count('id as totalUserCount').first();

    if (searchQuery) {  
      query = query.where('fname', 'like', `%${searchQuery}%`);
      query = query.orWhere('hobbies', 'like', `%${searchQuery}%`);
      queryCount = queryCount.where('fname', 'like', `%${searchQuery}%`);
      queryCount = queryCount.orWhere('hobbies', 'like', `%${searchQuery}%`);
    }
    
    let users = await query;

    users = users.map(row => (row.hobbies = JSON.parse(row.hobbies), row))

    const totalUser = await queryCount;

    const finalData = {};
    finalData['totalUsers'] = totalUser.totalUserCount;
    finalData['users'] = users;
    return finalData;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getUser,
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
  userslistpost,
};
