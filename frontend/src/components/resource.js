import axios from 'axios';

import React, {Component} from 'react';
import {
  useParams,
  useLocation
} from "react-router-dom";
import { reconstructBlobUrl } from '../utils/manipulator';

const Resource = () => {
  let { slug } = useParams();
  const location = useLocation()
  var { filename } = location.state;
  return (
    <div className="car_container">
      <table className="table-auto">
        <thead>
          <tr>
            <th>Song</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-[#181b21]">
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
      <section className="car_section">
        <img alt="" src={reconstructBlobUrl(slug)} className='car_image'/>
      </section>
      <div className='resource_title'>
        {filename.split('encrypted_')[1]}
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
