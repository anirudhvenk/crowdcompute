import React from "react";

import "./Profile.css";

export default function Profile () {
  return (
    <div className="profile">
      
        <div className="profile-sec">
          <div className="overlap-group">
            <div className="rectangle" />
            <div className="text-wrapper">Servers Hosted</div>
          </div>
          <div className="overlap">
            <img className="arrow" alt="Arrow" src="arrow-1.svg" />
            <div className="rectangle-2" />
          </div>
        </div>
        <div className="overlap-wrapper">
          <div className="overlap-2">
            <div className="rectangle-3" />
            <img className="img" alt="Arrow" src="arrow-1-3.svg" />
            <div className="rectangle-4" />
            <div className="text-wrapper-2">Wallet</div>
          </div>
        </div>
        <div className="profile-sec-2">
          <div className="overlap-3">
            <div className="rectangle-3" />
            <div className="text-wrapper-3">Models Trained</div>
          </div>
          <div className="overlap">
            <img className="arrow" alt="Arrow" src="arrow-1-2.svg" />
            <div className="rectangle-2" />
          </div>
        </div>
        <div className="profile-sec-3">
          <div className="overlap-3">
            <div className="rectangle-3" />
            <div className="text-wrapper">Sent Projects</div>
          </div>
          <div className="overlap-4">
            <img className="arrow-2" alt="Arrow" src="image.svg" />
            <div className="rectangle-2" />
          </div>
        </div>
      </div>
    
  );
};
