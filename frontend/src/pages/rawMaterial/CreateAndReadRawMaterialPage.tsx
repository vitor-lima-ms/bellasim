import { useState, useEffect, type FormEvent } from "react";
import { Container, Card, Form, Button, Alert, Table } from "react-bootstrap";
import axios from "axios";

const API_URL = "/api";

const apiClient = axios.create({
  withCredentials: true,
});

interface IRawMaterial {
  id: number;
  name: string;
  unit: string;
  unitCost: string;
}

export function CreateAndReadRawMaterialPage() {
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [rawMaterialsList, setRawMaterialsList] = useState<IRawMaterial[]>([]);
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

  useEffect(() => {
    const fetchRawMaterials = async () => {
      try {
        const response = await apiClient.get(`${API_URL}/raw-material/read`);

        setRawMaterialsList(response.data.rawMaterials);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Um erro desconhecido aconteceu!");
        }
      }
    };

    fetchRawMaterials();
  }, []);

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h3" className="text-center">
          Cadastro de matéria-prima
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

      <Card className="mt-5 mb-5">
        <Card.Header as="h3" className="text-center">
          Listagem de matérias-Primas
        </Card.Header>
        <Card.Body>
          {rawMaterialsList.length > 0 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  <th>Unidade</th>
                  <th>Custo unitário (R$)</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {rawMaterialsList.map((material) => (
                  <tr key={material.id}>
                    <td>{material.id}</td>
                    <td>{material.name}</td>
                    <td>{material.unit}</td>
                    <td>{material.unitCost}</td>
                    <td>
                      <Button variant="warning" size="sm">
                        Editar
                      </Button>{" "}
                      <Button variant="danger" size="sm">
                        Excluir
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info" className="text-center">
              Nenhuma matéria-prima cadastrada.
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
