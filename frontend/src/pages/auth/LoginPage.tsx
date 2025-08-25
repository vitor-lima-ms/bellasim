import { useState } from "react";
import type { FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Alert,
} from "react-bootstrap";

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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }

      setError("Email ou senha inválidos!");
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col className="col-md-6 offset-md-3">
          <Card>
            <Card.Header as="h3" className="text-center">
              Login
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    className="btn-custom-orange"
                    variant="primary"
                    type="submit"
                  >
                    Entrar
                  </Button>
                </div>
              </Form>
              <div className="mt-3 text-center">
                <Link to={"/forgot-password"} className="link-custom-orange">
                  Esqueci minha senha.
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
