import React, { useContext, useState, useEffect } from 'react';
import { Navbar, Form, FormControl, Button, Container, Collapse, Modal } from 'react-bootstrap';
import { AuthenticationContext } from '../services/authenticationContext/authentication.context';
import { ThemeContext } from '../services/ThemeContext/Theme.context'; 
import { useNavigate } from "react-router-dom";
import './buttons.css';
import logo from "../../assets/logo.png";


const Header = ({ setSearchTerm }) => {
  const { handleLogout, isWorker, isAdmin, setToken } = useContext(AuthenticationContext);  
  const { theme } = useContext(ThemeContext); 
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthenticationContext);
  const { role } = useContext(AuthenticationContext);
  
  
  const toggleCategories = () => setShowCategories(!showCategories);
  const toggleProfile = () => setShowProfile(!showProfile);

  const settingsHandler = () => navigate("/settings");
  const helpHandler = () => navigate("/help");
  const EditHandler = () => navigate("/profile");
  const EditWorkerHandler = () => navigate("/worker/editWorker");
  const BecomeWorkerHandler = () => navigate("/registerWorker");
  const SavedWorkerHandler = () => navigate("/favWorkers");
  const AdminHandler = () => navigate("/Admin");

  const navigationHandler = (path) => navigate(path);

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  
  const handleLogoutModalOpen = () => setShowLogoutModal(true);
  const handleLogoutModalClose = () => {
    setShowLogoutModal(false);
    
  };
  


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/jobs/all', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setCategories(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [token]);


  
  
  


  return (
    <div className={`header-container ${theme === 'dark' ? 'header-dark' : 'header-light'}`}>
      {/* Header Navbar */}
      <Navbar expand="lg" className={`p-3 header-navbar ${theme === 'dark' ? 'navbar-dark' : 'navbar-light'}`}>
        <Container fluid className="justify-content-between">
          {/* Logo */}
          <Button variant="link" onClick={() => navigate('/mainPage')}>
          <img 
            src={logo} 
            alt="Logo" 
            className="logo" 
            onClick={() => navigate("/mainPage")} 
            style={{ cursor: 'pointer', height: '40px' }} 
          />
          </Button>

          {/* Search Form */}
          <Form className="d-flex search-form mx-auto my-2">
            <FormControl 
              type="text" 
              placeholder="Search by name or lastname" 
              className={theme === 'dark' ? 'search-dark' : ''}
              onChange={(e) => setSearchTerm(e.target.value)} 
              aria-label="Buscar" 
            />
          </Form>

           {/* Logout Button */}
           <Button
             variant="outline-primary" 
             className={`rounded-circle border-0 p-2 shadow-none logout-button ${theme === 'dark' ? 'logout-dark' : ''}`} 
             onClick={() => {
               handleLogoutModalOpen(); 
               
             }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M4 18h2v2h12V4H6v2H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1zm2-7h7v2H6v3l-5-4l5-4z"/>
            </svg>
          </Button>

        </Container>
      </Navbar>

      {/* Menu Row */}
      <div className="menu-row">
        <Container className="d-flex justify-content-center">
          {/* Categories Button */}
          <div className="menu-container">
          <Button 
              className={`menu-button ${theme === 'dark' ? 'menu-button-dark' : ''}`} 
              onClick={() => navigationHandler("/categories")}
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path  d="M3 4h4v4H3zm0 6h4v4H3zm0 6h4v4H3zm6-12h12v4H9zm0 6h12v4H9zm0 6h12v4H9z"/>
              </svg>
              <span>Categories</span>
              
            </Button>

            
          </div>

          {/* Settings Button */}
          <Button className={`menu-button ${theme === 'dark' ? 'menu-button-dark' : ''}`} onClick={settingsHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
            </svg>
            <span>Settings</span>
          </Button>

          {/* Admin Button  */}
          {role === "ROLE_ADMIN" &&(
            <Button className={`menu-button ${theme === 'dark' ? 'menu-button-dark' : ''}`} onClick={AdminHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" >
                <path d="M480-440q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0-80q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0 440q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-400Zm0-315-240 90v189q0 54 15 105t41 96q42-21 88-33t96-12q50 0 96 12t88 33q26-45 41-96t15-105v-189l-240-90Zm0 515q-36 0-70 8t-65 22q29 30 63 52t72 34q38-12 72-34t63-52q-31-14-65-22t-70-8Z"/>
              </svg>
              <span>Admin</span>
            </Button>
          )}

          {/* Help Button */}
          <Button className={`menu-button ${theme === 'dark' ? 'menu-button-dark' : ''}`} onClick={helpHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
              <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/>
            </svg>
            <span>Help</span>
          </Button>

          {/* Profile Button */}
         <div className="menu-container">
          <Button className={`menu-button ${theme === 'dark' ? 'menu-button-dark' : ''}`} onClick={toggleProfile}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M12 12a4 4 0 1 1 0-8a4 4 0 0 1 0 8m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span className="color">Profile</span>
            <svg className={`arrow-icon ${showProfile ? 'rotate' : ''}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M7 10l5 5 5-5z"/>
              </svg>
            </Button>
            <Collapse in={showProfile}>
              <div className={`menu-dropdown ${theme === 'dark' ? 'menu-dropdown-dark' : ''}`}>
                <ul>
                  {role === "ROLE_WORKER" ? (
                    <li><a onClick={EditWorkerHandler}>Edit Worker Profile</a></li>
                  ) : (
                    <li><a onClick={BecomeWorkerHandler}>Become a Worker</a></li>
                  )}
                  <li><a onClick={EditHandler}>Edit User Profile</a></li>
                  <li><a onClick={SavedWorkerHandler}>Favourite Workers</a></li>
                </ul>
              </div>
            </Collapse>
          </div>
        </Container>

        <Modal
                  show={showLogoutModal}
                  onHide={handleLogoutModalClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Logout</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to logout from the app?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={handleLogoutModalClose}
                    >
                      Cancel
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                      Logout
                    </Button>
                  </Modal.Footer>
                </Modal>



      </div>
    </div>
  );
};

export default Header;