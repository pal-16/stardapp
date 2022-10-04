import axios from 'axios';

import React, {Component} from 'react';
import {
  useParams
} from "react-router-dom";
import { reconstructBlobUrl } from '../utils/manipulator';

const Resource = () => {
  let { slug } = useParams();
  console.log(slug);
  
  return (
    <div className="car_container">
      <section className="car_section">
        <img alt="" src={reconstructBlobUrl(slug)} className='car_image'/>
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
