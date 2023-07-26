import React from 'react'
import './Home.css';
import img from '../photo/sailing-ship-659758_1280.jpg'

const Home = () => {

  return (
    <>
      <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">

        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={img} class="d-block w-100 h-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
            </div>
          </div>
        </div>
      </div>

      
    </>
  )
}

export default Home