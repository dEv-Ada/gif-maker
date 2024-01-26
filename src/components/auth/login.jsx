import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { CommonConstant } from "../common/commonContants";
import { LoginApi } from "../service/apiAction";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = () => {
    setError("");
    const login = LoginApi({ userId: userId, password: password });
    if (login) {
      navigate("/");
    } else {
      setError("User Name/Password incorrect");
    }
  };
  return (
    <div className="login">
      <Container>
        <Card className="login-card shadow-lg bg-body rounded">
          <div className="fs-3 fw-semibold text-center pt-1">
            <FontAwesomeIcon icon={faPaw} />
            {CommonConstant.APP_TITLE}
          </div>
          <Form className="login-form">
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="12">
                {CommonConstant.USER_NAME}
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  onChange={(e) => setUserId(e.target.value)}
                  type="text"
                  placeholder={CommonConstant.USER_NAME_PLACEHOLDER}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPassword"
            >
              <Form.Label column sm="12">
                {CommonConstant.PASSWORD}
              </Form.Label>
              <Col sm="12">
                <Form.Control
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder={CommonConstant.PASSWORD_PLACEHOLDER}
                />
              </Col>
            </Form.Group>
            <Button
              variant="primary"
              disabled={userId === ""}
              onClick={handleLogin}
              className="float-end"
            >
              {CommonConstant.LOGIN}
            </Button>
            <p class="text-danger">{error}</p>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
