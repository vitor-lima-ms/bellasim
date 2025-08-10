import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await auth.login(email, password);

      navigate("/");
    } catch (error) {
      console.log(error);

      setError("Email ou senha inválidos!");
    }
  }

  return (
    <Container>
      <Row>
        <Col className="col-md-6 offset-md-3 mt-3 text-center">
          <h1>Login</h1>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-6 offset-md-3">
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
        </Col>
      </Row>
      <Row>
        <Col className="col-md-6 offset-md-3">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Form.Group>

            <Button className="mt-2" variant="primary" type="submit">
              Entrar
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col className="col-md-6 offset-md-3 mt-2 text-center">
          <Link to={"/forgot-password"}>Esqueci minha senha.</Link>
        </Col>
      </Row>
    </Container>
  );
}
