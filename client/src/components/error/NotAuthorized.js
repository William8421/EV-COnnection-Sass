import React from "react";
import lock from "../../img/lock_black_red.png"
function NotAuthorized() {
  return (
    <div className="notAuthorizedContainer">
      <h3>To Access This Area</h3>
      <div>
        <img src={lock} alt="lock"/>
      </div>
      <h3>Please <span>Log-In</span> or <span>Sign-Up</span></h3>
    
    </div>
  );
}

export default NotAuthorized;
