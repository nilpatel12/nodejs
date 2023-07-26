import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login.js';
import Register from './component/Register.js'
import Dashboard from './component/Dahboard.js';
import Profile from './component/profile';
import Feedback from './component/Feedback';
import { Toaster } from 'react-hot-toast';
import List from './component/List';


function App() {

  return (
    <div className="App">

      <Router>
     
        <Routes>

          <Route path='/' element={<Login />} />
           <Route path='/Register' element={<Register />} />
           <Route path='/dashboard' element={<Dashboard />} />
           <Route path='/profile' element={<Profile />} />
           <Route path='/feedback' element={<Feedback />} />
           <Route path='/list' element={<List />} />
        </Routes>
        <Toaster/>
      </Router>
    </div>
  )
}

export default App;
