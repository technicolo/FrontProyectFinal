import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import SidebarButton from "../sidebar button/sidebarMenu";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../services/ThemeContext/Theme.context";
import "./WorkerForm.css";
import { AuthenticationContext } from "../../services/authenticationContext/authentication.context";
import AdminConfirmationAlert from "../../ConfirmationAlert/ConfirmationAlert"; 
const WorkerForm = () => {
  const [worker, setWorker] = useState({
    description: "",
    phoneNumber: "",
    direccion: "",
    
  });

  const [formErrors, setFormErrors] = useState({
    description: null,
    phoneNumber: null,
    direccion: null,
  });

  const { id: userId } = useParams();
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case "description":
        return value.trim() === "" ? "Description is required." : null;
      case "phoneNumber":
        return /^[0-9]+$/.test(value)
          ? null
          : "Phone number must contain only numbers.";
      case "direccion":
        return value.trim() === "" ? "Address is required." : null;
      default:
        return null;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorker({
      ...worker,
      [name]: value,
    });

    const error = validateField(name, value);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const isFormValid = () => {
    return (
      Object.values(worker).every((field) => field.trim() !== "") &&
      Object.values(formErrors).every((error) => error === null)
    );
  };

  const handleConfirmSubmit = () => {
    if (isFormValid()) {
      AdminConfirmationAlert({
        title: "Are you sure about this?",
        text: "This action will save the changes in the worker's profile.",
        onConfirm: handleSubmit,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/admin/edit_profile/${userId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(worker),
        }
      );

      if (!response.ok) {
        throw new Error("Error updating the worker's profile");
      }

      navigate("/admin/adminWorkersPage");
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div
      className={`page-background ${
        theme === "dark" ? "background-dark" : "background-light"
      }`}
    >
      <Header />
      <Container fluid className="d-flex" style={{ minHeight: "90vh" }}>
        <Col md={2} className="bg-dark text-light sidebar-button-padding">
          <SidebarButton />
        </Col>
        <Col md={10} className="p-4">
          <h2 className="text-center mb-4">Edit Worker</h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleConfirmSubmit();
            }}
            className={`edit-worker-form ${
              theme === "dark" ? "edit-worker-form-dark" : ""
            }`}
          >
            <Row>
              <Col md={6}>
                <Form.Group controlId="workerDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Brief description"
                    name="description"
                    value={worker.description}
                    onChange={handleChange}
                    className={formErrors.description ? "is-invalid" : ""}
                    required
                  />
                  {formErrors.description && (
                    <div className="invalid-feedback">{formErrors.description}</div>
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="workerPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={worker.phoneNumber}
                    onChange={handleChange}
                    className={formErrors.phoneNumber ? "is-invalid" : ""}
                    required
                  />
                  {formErrors.phoneNumber && (
                    <div className="invalid-feedback">{formErrors.phoneNumber}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col md={6}>
                <Form.Group controlId="workerDireccion">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    name="direccion"
                    value={worker.direccion}
                    onChange={handleChange}
                    className={formErrors.direccion ? "is-invalid" : ""}
                    required
                  />
                  {formErrors.direccion && (
                    <div className="invalid-feedback">{formErrors.direccion}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
            <Row className="mt-4 text-center">
              <Col>
                <Button
                  type="submit"
                  className="btn-save"
                  disabled={!isFormValid()}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  className="ms-3 btn-cancel"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Container>
      <Footer />
    </div>
  );
};

export default WorkerForm;
