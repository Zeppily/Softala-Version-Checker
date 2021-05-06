import React from "react";
import "../App.css";

function Footer() {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
    
          <p className="col-lg" >
            &copy; {new Date().getFullYear()}
          </p>
          <br/>
        </div> 
      </div>
    </div>
  );
}

export default Footer;