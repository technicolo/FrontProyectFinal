import React, { useState } from 'react';
import { Button, Card, Form, Container, Row, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Footer from '../footer/footer';

const user = {
  Name: "Jose Luis",
  Email: "JoseLuis@gmail.com",
  Surname: "Carlos Bodoque",
  Password: "asdf1234",
  profileImage: "https://via.placeholder.com/100"
};

const Profile = ({ Name, Email, Surname, Password, profileImage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    Name: Name || user.Name,
    Email: Email || user.Email,
    Surname: Surname || user.Surname,
    Password: Password || user.Password,
    profileImage: profileImage || user.profileImage,
  });

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
    // Aquí puedes agregar la lógica para guardar los cambios
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    // Restablecer los valores originales
    setFormData({
      Name: Name || user.Name,
      Email: Email || user.Email,
      Surname: Surname || user.Surname,
      Password: Password || user.Password,
      profileImage: profileImage || user.profileImage,
    });
    setIsEditing(false);
  };

  return (
    <>
      <Header />

      <Container fluid className="py-4" style={{ background: "linear-gradient(45deg, #322A94, #645DB5, #87ACF7, #6BF8EF)", minHeight: "calc(100vh - 56px - 40px)" }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="p-4 shadow-lg" style={{ backgroundColor: "#8677C2", borderRadius: "20px" }}>
              <Row>
                <Col md={6}>
                  <div className="d-flex align-items-center mb-4">
                    <Button variant="link" className="text-light">
                      <i className="bi bi-arrow-left"></i>
                    </Button>
                  </div>
                  <div className="text-center mb-4">
                    <Image src={formData.profileImage} roundedCircle />
                  </div>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Nombre:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="text"
                        name="Name"
                        value={formData.Name}
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
                        name="Email"
                        value={formData.Email}
                        onChange={handleChange}
                        className="text-dark"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-light">Password:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="password"
                        name="Password"
                        value={formData.Password}
                        onChange={handleChange}
                        className="text-dark"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="text-dark">Apellido:</Form.Label>
                      <Form.Control
                        plaintext={!isEditing}
                        readOnly={!isEditing}
                        type="text"
                        name="Surname"
                        value={formData.Surname}
                        onChange={handleChange}
                        className="text-dark"
                      />
                    </Form.Group>
                    {isEditing ? (
                      <>
                        <Button variant="primary" className="w-100" onClick={handleSaveClick}>
                          Guardar
                        </Button>
                        <Button variant="secondary" className="w-100 mt-2" onClick={handleCancelClick}>
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleEditClick} variant="primary" className="w-100">
                        Editar
                      </Button>
                    )}
                  </Form>
                </Col>

                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <div className="text-center " style={{ border: "2px dashed #00FFFF", borderRadius: "10px", padding: "20px", width: "auto", height: "auto" }}>
                    <div style={{ fontSize: "60px", color: "#00FFFF" }}>+</div>
                    <p className="text-light">Tienes una habilidad práctica o útil? Agrega una profesión sin costo y espera a ser contactado por un cliente!</p>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

Profile.propTypes = {
  Name: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired,
  Surname: PropTypes.string.isRequired,
  Password: PropTypes.string.isRequired,
  profileImage: PropTypes.string
};

export default Profile;

