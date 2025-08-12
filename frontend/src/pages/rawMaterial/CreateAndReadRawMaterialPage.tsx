import { useState, type FormEvent } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const API_URL = "/api";

const apiClient = axios.create({
  withCredentials: true,
});

export function CreateAndReadRawMaterialPage() {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError("");

    setSuccess("");

    if (!name || !unit || !unitCost) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    try {
      await apiClient.post(`${API_URL}/raw-material/create`, {
        name,
        unit,
        unitCost,
      });

      setSuccess(`Matéria-prima "${name}" cadastrada com sucesso!`);

      setName("");

      setUnit("");

      setUnitCost("");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Um erro desconhecido aconteceu!");
      }
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h3" className="text-center">
          Cadastro de Matéria-prima
        </Card.Header>
        <Card.Body>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formRawMaterialName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Celulose Virgem"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRawMaterialUnit">
              <Form.Label>Unidade</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Kg"
                value={unit}
                onChange={(event) => setUnit(event.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRawMaterialUnitCost">
              <Form.Label>Custo unitário (R$)</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min={0}
                value={unitCost}
                onChange={(event) => setUnitCost(event.target.value)}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button className="btn-custom-orange" type="submit">
                Criar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
