import { useState } from "react";
import axios from "axios";
import type { FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Alert,
} from "react-bootstrap";

const API_URL = "/api";

const apiClient = axios.create({ withCredentials: true });

export function RegisterPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      setLoading(true);

      await apiClient.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        confirmPassword,
        role,
      });

      setSuccess(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Um erro desconhecido aconteceu!");
      }
    } finally {
      setLoading(false);
    }

    if (success) {
      try {
        await auth.login(email, password);

        navigate("/");
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Um erro desconhecido aconteceu!");
        }
      }
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col className="col-md-6 offset-md-3">
          <Card>
            <Card.Header as="h3" className="text-center">
              Registrar novo usuário
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Label>Confirmar senha</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicRole">
                  <Form.Label>Função</Form.Label>
                  <Form.Select
                    value={role}
                    onChange={(event) => setRole(event.target.value)}
                    required
                  >
                    <option value="user">Usuário</option>
                    <option value="admin">Administrador</option>
                  </Form.Select>
                </Form.Group>

                <div className="d-grid">
                  <Button
                    className="btn-custom-orange"
                    variant="primary"
                    type="submit"
                    disabled={loading}
                  >
                    <>
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />{" "}
                          Registrando...
                        </>
                      ) : (
                        "Registrar"
                      )}
                    </>
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
