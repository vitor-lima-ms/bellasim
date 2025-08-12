import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import axios from "axios";

const API_URL = "/api";

const apiClient = axios.create({
  withCredentials: true,
});

export function UpdateRawMaterialPage() {
  const params = useParams();
  const id = params.id;
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRawMaterialData = async () => {
      try {
        const response = await apiClient.get(
          `${API_URL}/raw-material/read/${id}`
        );

        setName(response.data.rawMaterial.name);

        setUnit(response.data.rawMaterial.unit);

        setUnitCost(response.data.rawMaterial.unitCost);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Um erro desconhecido aconteceu!");
        }
      }
    };

    fetchRawMaterialData();
  }, [id]);

  const handleUpdateParameter = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await apiClient.put(`${API_URL}/raw-material/update/${id}`, {
        name: name,
        unit: unit,
        unitCost: unitCost,
      });

      navigate("/raw-material");
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
      <Row>
        <Col className="col-md-6 offset-md-3">
          <Card>
            <Card.Header as="h3" className="text-center">
              Atualizar matéria-prima
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleUpdateParameter}>
                <Form.Group className="mb-3" controlId="formRawMaterialName">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formRawMaterialUnit">
                  <Form.Label>Unidade</Form.Label>
                  <Form.Control
                    type="text"
                    value={unit}
                    onChange={(event) => setUnit(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formRawMaterialUnitCost"
                >
                  <Form.Label>Custo unitário (R$)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    value={unitCost}
                    onChange={(event) => setUnitCost(event.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button className="btn-custom-orange" type="submit">
                    Salvar alterações
                  </Button>
                  <Link
                    to="/raw-material"
                    className="btn btn-secondary fw-bold"
                  >
                    Cancelar
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
