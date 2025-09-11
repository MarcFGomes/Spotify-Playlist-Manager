// SavingScreen.jsx

import React from "react";
import "./SavingScreen.css";

function SavingScreen({ progress }) {
  return (
    <div className="saving-overlay">
      <div className="saving-box">
        <h2>💾 Saving Playlist...</h2>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p>{Math.round(progress)}%</p>
      </div>
    </div>
  );
}

export default SavingScreen;