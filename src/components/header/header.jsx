// src/components/Header.js
import React from 'react';
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import { AuthenticationContext } from '../services/authenticationContext/authentication.context';
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
const Header = () => {

  const { handleLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  
  const profileHandler =()=>{

    navigate("/profile")
  }
  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between p-3">
      <Button variant="outline-primary" className="rounded-circle border-0 p-2 shadow-none"
    onClick={handleLogout} style={{ backgroundColor: "transparent" }} >
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" 
      height="1em" viewBox="0 0 24 24">
      <path fill="currentColor" d="M4 18h2v2h12V4H6v2H4V3a1 
      1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm2-7h7v2H6v3l-5-4l5-4z"/>
      </svg>
        <i className="bi bi-arrow-left"></i>
      </Button>
      <Form inline="true">
        <FormControl type="text" placeholder="buscar" className="mr-sm-2" />
      </Form>
    <Button   variant="outline-primary" className="rounded-circle border-0 p-2 shadow-none"
    onClick={profileHandler}style={{ backgroundColor: "transparent" }} >
      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 48 48"><g fill="currentColor">
      <path d="M32 20a8 8 0 1 1-16 0a8 8 0 0 1 16 0"/>
      <path fillRule="evenodd" d="M23.184 43.984C12.517 43.556 4 34.772 4 24C4 12.954 12.954 4 24 4s20 8.954 20 20s-8.954 20-20 20h-.274q-.272 0-.542-.016M11.166 36.62a3.028 3.028 0 0 1 2.523-4.005c7.796-.863 12.874-.785 20.632.018a2.99 
      2.99 0 0 1 2.498 4.002A17.94 17.94 0 0 0 42 24c0-9.941-8.059-18-18-18S6 <14.059 6 24c0 4.916 1.971 9.373 5.166 12.621" clipRule="evenodd"/>
      </g></svg>
        <i className="bi bi-person"></i>
      </Button>
    </Navbar>
  );
};

export default Header;