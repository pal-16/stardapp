import axios from 'axios';

import React, {Component} from 'react';
import { API_BASE_URL, PACKED_NONCE } from '../constants';
import {
  useParams
} from "react-router-dom";
import ReactPlayer from 'react-player/lazy'

const Resource = () => {
  let { id } = useParams();
  console.log(id);
  
  return (
      <section className="car_section">
        <img alt="" src="../img/model-s.jpg" className='car_image'/>
      </section>
  );
}

export default Resource;
