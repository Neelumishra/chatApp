import React from 'react'
import "./message.css"
function Message({message,user,classs}) {
 if(user){
     return <div className={`messagebox ${classs}`}>{`${user}: ${message}`}</div>;
 }else{
     return <div className={`messagebox ${classs}`}>{`You : ${message}`}</div>;
 }
}

export default Message