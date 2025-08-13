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
import axios, { type AxiosResponse } from "axios";

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

export function UpdateConstantParameterPage() {
  const params = useParams();
  const itemType = params.itemType as keyof typeof configItems;
  const id = params.id;
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchParameterData = async () => {
      let response: AxiosResponse;

      try {
        switch (itemType) {
          case "packaging":
            response = await apiClient.get(`${API_URL}/packaging/read/${id}`);

            setDescription(response.data.packaging.description);

            setValue(response.data.packaging.cost);

            break;
          case "baleBag":
            response = await apiClient.get(`${API_URL}/bale-bag/read/${id}`);

            setDescription(response.data.baleBag.description);

            setValue(response.data.baleBag.cost);

            break;
          case "commission":
            response = await apiClient.get(`${API_URL}/commission/read/${id}`);

            setDescription(response.data.commission.description);

            setValue(response.data.commission.percent);

            break;
          case "tax":
            response = await apiClient.get(`${API_URL}/tax/read/${id}`);

            setDescription(response.data.tax.description);

            setValue(response.data.tax.percent);

            break;
          case "freight":
            response = await apiClient.get(`${API_URL}/freight/read/${id}`);

            setDescription(response.data.freight.description);

            setValue(response.data.freight.percent);

            break;
          case "contributionMargin":
            response = await apiClient.get(
              `${API_URL}/contribution-margin/read/${id}`
            );

            setDescription(response.data.contributionMargin.description);

            setValue(response.data.contributionMargin.percent);

            break;
          case "st":
            response = await apiClient.get(`${API_URL}/st/read/${id}`);

            setDescription(response.data.st.description);

            setValue(response.data.st.percent);

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

    fetchParameterData();
  }, [itemType, id]);

  const handleUpdateParameter = async (event: FormEvent) => {
    event.preventDefault();

    try {
      switch (itemType) {
        case "packaging":
          await apiClient.put(`${API_URL}/packaging/update/${id}`, {
            description: description,
            cost: value,
          });

          navigate("/constant-parameter");

          break;
        case "baleBag":
          await apiClient.put(`${API_URL}/bale-bag/update/${id}`, {
            description: description,
            cost: value,
          });

          navigate("/constant-parameter");

          break;
        case "commission":
          await apiClient.put(`${API_URL}/commission/update/${id}`, {
            description: description,
            percent: value,
          });

          navigate("/constant-parameter");

          break;
        case "tax":
          await apiClient.put(`${API_URL}/tax/update/${id}`, {
            description: description,
            percent: value,
          });

          navigate("/constant-parameter");

          break;
        case "freight":
          await apiClient.put(`${API_URL}/freight/update/${id}`, {
            description: description,
            percent: value,
          });

          navigate("/constant-parameter");

          break;
        case "contributionMargin":
          await apiClient.put(`${API_URL}/contribution-margin/update/${id}`, {
            description: description,
            percent: value,
          });

          navigate("/constant-parameter");

          break;
        case "st":
          await apiClient.put(`${API_URL}/st/update/${id}`, {
            description: description,
            percent: value,
          });

          navigate("/constant-parameter");

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
      <Row>
        <Col className="col-md-6 offset-md-3">
          <Card>
            <Card.Header as="h3" className="text-center">
              {`Atualizar ${configItems[itemType].name}`}
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleUpdateParameter}>
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formValue">
                  <Form.Label>{configItems[itemType].field}</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min={0}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" className="btn-custom-orange">
                    Salvar alterações
                  </Button>
                  <Link
                    to="/constant-parameter"
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
