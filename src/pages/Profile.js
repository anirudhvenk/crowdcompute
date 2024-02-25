import React from "react";

import "./Profile.css";

export default function Profile ()  {
    return (
        <div className="profile">
            <div className="div-2">
                
                <div className="profile-sec">
                    <div className="overlap-group">
                        <div className="rectangle" />
                        <div className="text-wrapper">Servers Hosted</div>
                    </div>
                    <div className="rectangle-2" />
                </div>
                <div className="profile-sec-2">
                    <div className="overlap">
                        <div className="rectangle-3" />
                        <div className="text-wrapper-2">Wallet</div>
                    </div>
                    <div className="rectangle-2" />
                </div>
                <div className="profile-sec-3">
                    <div className="overlap">
                        <div className="rectangle-3" />
                        <div className="text-wrapper">Sent Projects</div>
                    </div>
                    <div className="rectangle-4" />
                </div>
                <div className="group">
                    <div className="div-wrapper">
                        <div className="text-wrapper-3">Profile</div>
                    </div>
                </div>
                <div className="profile-sec-4">
                    <div className="overlap">
                        <div className="rectangle-3" />
                        <div className="text-wrapper-4">Models Trained</div>
                    </div>
                    <div className="rectangle-2" />
                </div>
            </div>
        </div>
    );
};
