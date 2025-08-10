import React, { useState } from "react";
import { Container, Form, Button, Alert, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "/api/auth";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);

    setMessage("");

    setError("");

    try {
      await axios.post(`${API_URL}/forgot-password`, { email });

      setMessage("Verifique seu e-mail para o link de redefinição.");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "24rem" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">Recuperar senha</Card.Title>
          <Form onSubmit={handleSubmit}>
            <p className="text-muted">
              Digite seu e-mail e enviaremos um link para você redefinir sua
              senha.
            </p>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

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
              <Button variant="primary" type="submit" disabled={loading}>
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
            <Link to="/login">Voltar para o login.</Link>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
