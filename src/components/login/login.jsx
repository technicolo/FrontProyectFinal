import React, { useRef, useState, useContext, useEffect } from "react";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import { AuthenticationContext } from "../services/authenticationContext/authentication.context";
import { ThemeContext } from "../services/ThemeContext/Theme.context";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Asegúrate de tener este archivo para aplicar los estilos

const Login = () => {
  const { handleLogin } = useContext(AuthenticationContext);
  const { theme } = useContext(ThemeContext);
  const [loginError, setLoginError] = useState(""); 
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const USERNAME_MIN_LENGTH = 3;
  const USERNAME_MAX_LENGTH = 15;
  const PASSWORD_MIN_LENGTH = 8;
  

  const validateUsername = (value) => {
    if (!value) return "El nombre de usuario es obligatorio";
    if (value.length < USERNAME_MIN_LENGTH) return `Debe tener entre ${USERNAME_MIN_LENGTH} y ${USERNAME_MAX_LENGTH} caracteres`;
    if (value.length > USERNAME_MAX_LENGTH) return `Debe tener entre ${USERNAME_MIN_LENGTH} y ${USERNAME_MAX_LENGTH} caracteres`;
    
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "La contraseña es obligatoria";
    if (value.length < PASSWORD_MIN_LENGTH) return `Debe tener al menos ${PASSWORD_MIN_LENGTH} caracteres`;
    
    return "";
  };

 


  const changeUsernameHandler = (event) => {
    const value = event.target.value;
    setUsername(value);
    setErrors((prevErrors) => ({ ...prevErrors, username: validateUsername(value) }));
  };

  const changePasswordHandler = (event) => {
    const value = event.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({ ...prevErrors, password: validatePassword(value) }));
  };

  useEffect(() => {
    const allValid =
      !validateUsername(username) &&
      !validatePassword(password);
    setIsFormValid(allValid);
  }, [username, password]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    
    
    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username, 
          password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const { token } = data;
        localStorage.setItem("token", token);
        handleLogin(username, token);
      
        // Debug logging
        console.log("Token saved to localStorage:", localStorage.getItem("token"));
        console.log("Token passed to handleLogin:", token);
      
        setTimeout(() => navigate("/mainPage"), 100);
      } else {
        setLoginError("Usuario o contraseña incorrectos.");
      }
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      setLoginError("Hubo un problema con el servidor. Intenta de nuevo.");
    }
  };

  return (
    <div
      className={`principal d-flex justify-content-center align-items-center vh-100 ${theme === "dark" ? "theme-dark" : "theme-default"}`}
    >
      <Card className="p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}> 
        <Card.Body>
          <h2 className="text-center mb-4">Iniciar Sesión</h2>
          <p className="text-center mb-4">Inicie sesión para disfrutar de todos nuestros servicios</p>
          <Form onSubmit={submitHandler}>
            {loginError && <p className="text-danger text-center">{loginError}</p>} 
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.username ? "border border-danger" : ""}
                value={username}
                onChange={changeUsernameHandler}
                type="text"
                placeholder="Nombre de usuario"
                style={{
                  backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
                
              />
              {errors.username && <p className="pt-2 text-danger">{errors.username}</p>}
            </FormGroup>
            <FormGroup className="mb-3">
              <Form.Control
                className={errors.password ? "border border-danger" : ""}
                value={password}
                onChange={changePasswordHandler}
                type="password"
                placeholder="Contraseña"
                style={{
                  backgroundColor: theme === "dark" ? "#2B2B2B" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
               
              />
               {errors.password && <p className="pt-2 text-danger">{errors.password}</p>}
            </FormGroup>
            <Button variant="primary" type="submit" className="w-100" disabled={!isFormValid}>
              Iniciar sesión
            </Button>
            <p className="text-center mt-3">
              ¿No tiene una cuenta? <a href="/register">Regístrese aquí</a>
            </p>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
