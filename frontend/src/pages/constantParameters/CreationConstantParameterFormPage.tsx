import { useState, type FormEvent } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const API_URL = "/api";

const apiClient = axios.create({
  withCredentials: true,
});

const configItems = {
  packaging: { name: "Embalagem", field: "Custo (R$)", fieldType: "cost" },
  baleBag: { name: "Saco para fardos", field: "Custo (R$)", fieldType: "cost" },
  commission: {
    name: "Comissão",
    field: "Percentual (%)",
    fieldType: "percent",
  },
  tax: { name: "Impostos", field: "Percentual (%)", fieldType: "percent" },
  freight: { name: "Frete", field: "Percentual (%)", fieldType: "percent" },
  contributionMargin: {
    name: "Margem de Contribuição",
    field: "Percentual (%)",
    fieldType: "percent",
  },
  st: {
    name: "Substitução Tributária (ST)",
    field: "Percentual (%)",
    fieldType: "percent",
  },
};

export function CreationConstantParameterFormPage() {
  const [itemType, setItemType] =
    useState<keyof typeof configItems>("packaging");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!description) {
      setError("O campo de descrição é obrigatório! ");
      return;
    }

    if (!value) {
      setError("O campo de valor é obrigatório! ");
      return;
    }

    try {
      switch (itemType) {
        case "packaging":
          await apiClient.post(`${API_URL}/packaging/create`, {
            description: description,
            cost: value,
          });
          break;
        case "baleBag":
          await apiClient.post(`${API_URL}/bale-bag/create`, {
            description: description,
            cost: value,
          });
          break;
        case "commission":
          await apiClient.post(`${API_URL}/commission/create`, {
            description: description,
            percent: value,
          });
          break;
        case "tax":
          await apiClient.post(`${API_URL}/tax/create`, {
            description: description,
            percent: value,
          });
          break;
        case "freight":
          await apiClient.post(`${API_URL}/freight/create`, {
            description: description,
            percent: value,
          });
          break;
        case "contributionMargin":
          await apiClient.post(`${API_URL}/contributionMargin/create`, {
            description: description,
            percent: value,
          });
          break;
        case "st":
          await apiClient.post(`${API_URL}/st/create`, {
            description: description,
            percent: value,
          });
          break;
        default:
          break;
      }
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
          Cadastro de parâmetros
        </Card.Header>
        {error && <Alert variant="danger">{error}</Alert>}
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formItemType">
              <Form.Label>Tipo de parâmetro</Form.Label>
              <Form.Select
                value={itemType}
                required
                onChange={(event) => {
                  setItemType(event.target.value as keyof typeof configItems);
                }}
              >
                {Object.keys(configItems).map((key) => (
                  <option key={key} value={key}>
                    {configItems[key as keyof typeof configItems].name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ex: Embalagem padrão"
                value={description}
                required
                onChange={(event) => setDescription(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formValue">
              <Form.Label>{configItems[itemType].field}</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                min={0}
                required
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </Form.Group>

            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                className="btn-custom-orange"
              >
                Criar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
