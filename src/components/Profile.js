import React, { useState, useEffect }from "react";
import AuthService from "../services/auth.service";
import '../styles/Moon.css';

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);
  
    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user && user.accessToken) {
        setCurrentUser(user);
      }
    }, []);
  
    if (!currentUser) {
      return <div>Loading...</div>;
    }
  
    // Make sure roles is defined and is an array before iterating
    const roles = currentUser.roles || [];
  
    
    return(
        <div className="container">
            <header className="jumbotron">
                <h3>
                    <strong>{currentUser.username}</strong>Profile
                </h3>
            </header>
                <p>
                <strong>Token:</strong>{currentUser.accessToken.substring(0,20)} ...{" "}
                    {currentUser.accessToken.substr(currentUser.accessToken.length -20)}
                </p>
                <p>
                 <strong>Id:</strong> {currentUser.id}
                 </p>
                 <p>
                 <strong>Email:</strong> {currentUser.email}
                 </p>
                 <strong>Authorities:</strong>
                 <ul>
                 {roles.length > 0 ? (
                 roles.map((role, index) => 
                 <li key={index}>{role}</li>)
            ) : (
                <li>No roles assigned</li>
        )}
                </ul>
         </div>
    );

};

export default Profile;
