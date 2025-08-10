import React, { useState } from "react";
import { Container, Form, Button, Alert, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "/api/auth";

export function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams<{ token: string }>();

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!");
      return;
    }
    setLoading(true);

    setMessage("");

    setError("");

    try {
      await axios.put(`${API_URL}/reset-password/${token}`, {
        password,
        confirmPassword,
      });

      setMessage(
        "Senha redefinida com sucesso! Redirecionando para o login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 3000);
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
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ width: "24rem" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4">
            Definir nova senha
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            {message && <Alert variant="success">{message}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>Nova senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Digite a nova senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirme a nova senha</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirme a nova senha"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />{" "}
                    Redefinindo...
                  </>
                ) : (
                  "Redefinir senha"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
