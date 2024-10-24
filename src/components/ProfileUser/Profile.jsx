import React, { useState, useEffect, useContext } from 'react';
import { Button, Card, Form, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Footer from '../footer/footer';
import { useNavigate } from "react-router-dom";
import { AuthenticationContext } from '../services/authenticationContext/authentication.context'; 
import './Profile.css';  

const Profile = () => {
  const { token } = useContext(AuthenticationContext); 
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    lastname: '',
    username: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        console.error("No token available.");
        return; 
      }

      try {
        const response = await fetch('http://localhost:8081/api/users/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setFormData({
          name: data.name,
          email: data.email,
          lastname: data.lastname,
          username: data.username,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const backHandler = () => {
    navigate('/');
  };

  const getInitials = () => {
    const { name, lastname } = formData;
    if (!name || !lastname) return '';
    return `${name.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`;
  };

  return (
    <div className="profile-container-Background">
      <Header />
      <Container fluid className="profile-container">
  <Row className="justify-content-center">
    <Col md={6}>
      <Card className="p-4 shadow-lg" style={{ backgroundColor: "#8677C2", borderRadius: "20px" }}>
              <Row>
                <Col md={6}>
                  <div className="back-button">
                    <Button variant="link" className="text-light" onClick={backHandler}>
                      <i className="bi bi-arrow-left text-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
                          <path d="M400-120 160-360l241-241 56 57-144 144h367v-400h80v480H313l144 143-57 57Z" />
                        </svg>
                      </i>
                    </Button>
                  </div>

                  <div className="profile-initials-circle">
                    {getInitials()}
                  </div>

                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Username:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="text-dark"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Name:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="text-dark"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Email:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="text-dark"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Last Name:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="text-dark"
                      />
                    </Form.Group>
                    {isEditing ? (
                      <>
                        <Button variant="primary" className="w-100" onClick={handleSaveClick}>
                          Save
                        </Button>
                        <Button variant="secondary" className="w-100 mt-2" onClick={handleCancelClick}>
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleEditClick} variant="primary" className="w-100">
                        Edit
                      </Button>
                    )}
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

Profile.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  lastname: PropTypes.string,
  username: PropTypes.string,
};

export default Profile;
