import axios from 'axios';

import React, {Component} from 'react';
import {
  useParams,
  useLocation
} from "react-router-dom";
import { reconstructBlobUrl } from '../utils/manipulator';
import { useState, useEffect } from "react";
import DonateModal from './DonateModal';

const SingleFileView = () => {
  const [showDonateModal, setShowDonateModal] = useState(false);
  const onDonateClick = async () => {
    setShowDonateModal(true);
  };
  const onDonateClose = async () => {
    setShowDonateModal(false);
  };
  let { slug } = useParams();
  const location = useLocation()
  var { filename } = location.state;
  return (
    <div className="car_container">
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
        <button onClick={onDonateClick} className="navLink navLink-hover mb-2"> Donate </button>
        { showDonateModal && <DonateModal onClose={onDonateClose}/> }
      </div>
    </div>
  );
}

export default SingleFileView;
