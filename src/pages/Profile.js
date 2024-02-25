import React from "react";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile">
      <div className="profile-title">Profile</div>
      <div className="div-2">
      <div className="overlap-group">
          <div className="rectangle">
            <span className="rectangle-text">Servers Hosted</span>
          </div>

          <div className="rectangle-2">
          </div>

        </div>

        <div className="overlap">
          <div className="rectangle">
            <span className="rectangle-text">Wallet</span>
          </div>

          <div className="rectangle-2"></div>
          
        </div>

        <div className="overlap-2">
          <div className="rectangle">
            <span className="rectangle-text">Sent Projects</span>
          </div>

          <div className="rectangle-2"></div>
        </div>

        <div className="overlap-3">
          <div className="rectangle">
            <span className="rectangle-text">Models Trained</span>
          </div>

          <div className="rectangle-2"></div>
          
        </div>
      </div>
    </div>
  );
};
