import axios from 'axios';

import React, {Component} from 'react';
import {
  useParams
} from "react-router-dom";

const Resource = () => {
  let { id } = useParams();
  console.log(id);
  
  return (
    <div className="car_container">
      <section className="car_section">
        <img alt="" src="https://i.pinimg.com/236x/2c/d1/d2/2cd1d2eb9f3f490bbba210077439c764.jpg" className='car_image'/>
      </section>
      <div className='resource_title'>
        Title which is somewhat long
      </div>
      <div className='resource_nft'>
        NFT
      </div>
      <div className="car_buttons">
        <button>
          Donate
        </button>
      </div>
    </div>
  );
}

export default Resource;
