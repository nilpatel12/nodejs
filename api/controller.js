





//   app.post('/users/create', (req, res) => {
//     const { first_name, last_name, mobile, address, age } = req.body;
  
//     postUser(first_name, last_name, mobile, address, age)
//       .then(insertedRows => {
//         res.status(201).json(insertedRows);
//       })
//       .catch(error => {
//         res.status(500).json({ error: error.message });
//       });
//   });
  

//   app.put('/users/update', (req, res) => {
//     const { id, first_name, last_name, mobile, address, age } = req.body;
  
//     putUser(id, first_name, last_name, mobile, address, age)
//       .then(() => {
//         res.status(200).send('User updated successfully');
//       })
//       .catch(error => {
//         res.status(500).json({ error: error.message });
//       });
//   });
  

//   app.delete('/users/delete', (req, res) => {
//     const { id } = req.body;
  
//     deleteUser(id)
//       .then(() => {
//         res.status(200).send('User deleted successfully');
//       })
//       .catch(error => {
//         res.status(500).json({ error: error.message });
//       });
//   });


//   app.get('/users/join', (req, res) => {
//     joinUser()
//       .then(results => {
//         res.json(results);
//       })
//       .catch(error => {
//         console.error(error);
//         res.status(500).json({ error: 'An error occurred' });
//       });
//   });
  