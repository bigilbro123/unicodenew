import React, { useEffect, useState } from "react";
import "./profile.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../../api/api";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const storedUser = localStorage.getItem('usercode');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Update the state with user info from localStorage
    } else {
      setUser(null); // If no user data in localStorage, set user state to null
    }
  }, []); // Empty dependency array to run only once, similar to componentDidMount

  const Handlelogout = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Clear user data from localStorage
    localStorage.setItem("usercode", JSON.stringify(null));
    setUser(null); // Explicitly reset the state
    window.location.reload();

    // Clear JWT cookie (client-side)
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    try {
      // Send the logout request to the server
      const response = await fetch(baseUrl.baseUrl + "api/user/logout", {
        method: "GET",
        credentials: 'include' // Include cookies for server-side handling
      });

      const res = await response.json();

      // Handle success response
      if (res.message === "Logout successful") {
        // Optionally, redirect to the login page after logout
        navigate("/login"); // Assuming you have a login route
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={Handlelogout}>

      <div className="profile-container">
        <div className="header">
          <div style={{ alignItems: "center", position: 'absolute', top: '30px', left: '30px', display: 'flex' }}>
            <img
              src='/assets/rootments logo 2.jpg'
              alt="Logo"
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <h3 style={{ color: "black", margin: 0 }}>
              Product Unique Code Generation
            </h3>
          </div>
          <Link to={'/'}>
            <button className="btn btn-light text-success" style={{ position: 'absolute', top: '100px', left: '20px' }}>back</button>
          </Link>
        </div>
        <div className="main" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 className="profile-title" style={{ display: 'flex', justifyContent: 'center' }}>Profile</h2>

          <div className="profile-card">
            <div className="profile-icon">
              <div className="icon-circle">
                <i
                  className="fas fa-user user-icon"
                  style={{ fontSize: "50px", color: 'white', alignItems: 'center' }}
                ></i>
              </div>
            </div>

            {user ? (
              <>
                <div className="input-group">
                  <label htmlFor="employeeId" className="input-icon">
                    <i className="fa-regular fa-user"
                      style={{ color: '#016E5B', fontSize: '20px' }}
                    ></i>
                  </label>
                  <input
                    type="text"
                    value={user?._id}
                    id="employeeId"
                    placeholder="Employee ID"
                    className="input-field"
                    readOnly
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="email" className="input-icon">
                    <i className="fa-regular fa-envelope"
                      style={{ color: '#016E5B', fontSize: '20px' }}
                    ></i>
                  </label>
                  <input
                    value={user?.email}
                    type="email"
                    id="email"
                    placeholder="employee@gmail.com"
                    className="input-field"
                    readOnly
                  />
                </div>
              </>
            ) : (
              <p>No user data available</p> // Display this if there's no user data
            )}

            <button type="submit" className="btn" style={{ color: 'red' }}>LOGOUT</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Profile;