import React from 'react';
import "./join.css";
import {  useNavigate } from 'react-router-dom';
function Join({name ,value}) {
  let navigate = useNavigate();
  return (
    <div className="joinpage ">
      <div className="joincontainer">
        <h1 className=" text-center text-white">CHAT APP</h1>
        <input
          className="form-control p-2 text-center"
          placeholder="Enter Your Name"
          onChange={name}
        />
        <div className=" d-flex justify-content-center mt-2">
          {" "}
          
            {" "}
            <button onClick={()=>navigate("/chat")} disabled={value.length===0} className="btn btn-info ">JOIN</button>
          
        </div>
      </div>
    </div>
  );
}

export default Join