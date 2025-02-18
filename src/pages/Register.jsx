import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    subdomain: "",
    avatar: "",
    website: "",
    user_name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    note: "",
    user_avatar: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://" + window.location.hostname + "/api/api/register",
        formData
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setSuccess(response.data.message);
      setLoading(false);
      navigate("/thank-you");
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка регистрации");
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg p-4">
            <Card.Body>
              <h2 className="text-center mb-4">Регистрация</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Card className="mb-3 p-3 shadow-sm">
                  <Card.Body>
                    <h4 className="text-center">Информация о компании</h4>
                    <Form.Group className="mb-3">
                      <Form.Label>Название компании</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Поддомен</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          name="subdomain"
                          value={formData.subdomain}
                          onChange={handleChange}
                          required
                        />
                        <InputGroup.Text>.yourdomain.com</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Аватар компании (URL)</Form.Label>
                      <Form.Control
                        type="text"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Веб-сайт компании</Form.Label>
                      <Form.Control
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card className="mb-3 p-3 shadow-sm">
                  <Card.Body>
                    <h4 className="text-center">Информация о пользователе</h4>
                    <Form.Group className="mb-3">
                      <Form.Label>Имя пользователя</Form.Label>
                      <Form.Control
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Пароль</Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Подтверждение пароля</Form.Label>
                      <Form.Control
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Телефон</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Примечание</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                <div className="text-center">
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? "Регистрация..." : "Зарегистрироваться"}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
