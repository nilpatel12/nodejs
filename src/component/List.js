import React, { useState, useEffect } from 'react'
import Header from './Header'
import axios from "axios";
import { toast } from 'react-hot-toast';


const List = () => {

  const [users, setUsers] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(7);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (value) => {
    setSearchQuery(value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post('http://localhost:4000/Route/index/users/listing', {
          page: currentPage,
          limit: usersPerPage,
          searchQuery: searchQuery,
        });
        console.log(res.data);
        setTotalUser(res.data.totalUsers);
        setUsers(res.data.users);

      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
      }
    }
    fetchData();
  }, [currentPage, usersPerPage, searchQuery]);

  // const indexOfLastUser = currentPage * usersPerPage;
  // const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(totalUser / usersPerPage);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <>
      <Header />
      <br />
      <input
        className="form-control me-2 mr-50"
        style={{ width: "15%", marginLeft: "78%" }}
        type="search"
        placeholder="Search As Name"
        aria-label="Search"
        value={searchQuery}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div className="container mt-5">
        <h3>Users List</h3>

        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Hobbies</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.fname}</td>
                  <td>{item.email}</td>
                  <td>{item.hobbies.join(" || ")}</td>
                </tr>
              );
            })}

          </tbody>
        </table>
        <>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
              >
                Prev
              </button>
            </li>

            {pageNumbers.map((number) => (
              <li
                key={number}
                className={`page-item ${currentPage === number ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(number)}
                >
                  {number}
                </button>
              </li>
            ))}

            <li
              className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
            >
              <button
                className="page-link"
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </>
      </div>
    </>
  )
}

export default List;