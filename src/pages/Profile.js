import React from "react";
import "./Profile.css";

export default function Profile() {
  return (
    <div className="profile">
      <div className="div-2">
        <div className="div-wrapper">
          Profile
        </div>

        <div className="overlap-group">
          <div className="rectangle">
            Servers Hosted
          </div>

          <div className="rectangle-2">
          </div>

        </div>

        <div className="overlap">
          <div className="rectangle">
            Wallet
          </div>

          <div className="rectangle-2">
            
          </div>
          
        </div>

        <div className="overlap-2">
          <div className="rectangle">
            Sent Projects
          </div>

          <div className="rectangle-2">
            
          </div>
        </div>

        <div className="overlap-3">
          <div className="rectangle">
            Models Trained
          </div>

          <div className="rectangle-2">
            
          </div>
          
        </div>
      </div>
    </div>
  );
};
