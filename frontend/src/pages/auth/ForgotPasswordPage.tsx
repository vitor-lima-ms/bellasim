import axios from "axios";
import { useState, type FormEvent } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Card,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const API_URL = "/api/auth";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);

    setMessage("");

    setError("");

    try {
      await axios.post(`${API_URL}/forgot-password`, { email });

      setMessage("Verifique seu e-mail para o link de redefinição.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Um erro desconhecido aconteceu!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col className="col-md-6 offset-md-3">
          <Card>
            <Card.Header as="h3" className="text-center">
              Recuperar senha
            </Card.Header>
            <Card.Body>
              <p className="text-muted">
                Digite seu e-mail e enviaremos um link para você redefinir sua
                senha.
              </p>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Endereço de e-mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    className="btn-custom-orange"
                    variant="primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />{" "}
                        Enviando...
                      </>
                    ) : (
                      "Enviar link de recuperação"
                    )}
                  </Button>
                </div>
              </Form>
              <div className="mt-3 text-center">
                <Link className="link-custom-orange" to="/login">
                  Voltar para o login.
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
