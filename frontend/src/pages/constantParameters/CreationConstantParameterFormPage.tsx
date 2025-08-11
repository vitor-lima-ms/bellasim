import { useState, type FormEvent } from "react";
import { Container, Card, Form, Button, Alert, Table } from "react-bootstrap";
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

interface IItemsWithCost {
  id: number;
  description: string;
  cost: string;
}

interface IItemsWithPercent {
  id: number;
  description: string;
  percent: string;
}

export function CreationConstantParameterFormPage() {
  const [itemType, setItemType] =
    useState<keyof typeof configItems>("packaging");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [parametersList, setParametersList] = useState<
    IItemsWithCost[] | IItemsWithPercent[]
  >([]);
  const [searched, setSearched] = useState(false)
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [listParametersError, setListParametersError] = useState("");

  const handleRegisterSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!description) {
      setRegisterError("O campo de descrição é obrigatório! ");
      return;
    }

    if (!value) {
      setRegisterError("O campo de valor é obrigatório! ");
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
          await apiClient.post(`${API_URL}/contribution-margin/create`, {
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

      setRegisterSuccess("Parâmetro cadastrado com sucesso!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setRegisterError(error.message);
      } else {
        setRegisterError("Um erro desconhecido aconteceu!");
      }
    }
  };

  const handleListParametersSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setSearched(true)

    let response: AxiosResponse;

    try {
      switch (itemType) {
        case "packaging":
          response = await apiClient.get(`${API_URL}/packaging/read`);

          setParametersList(response.data.packagings);

          break;
        case "baleBag":
          response = await apiClient.get(`${API_URL}/bale-bag/read`);

          setParametersList(response.data.baleBags);

          break;
        case "commission":
          response = await apiClient.get(`${API_URL}/commission/read`);

          setParametersList(response.data.commissions);

          break;
        case "tax":
          response = await apiClient.get(`${API_URL}/tax/read`);

          setParametersList(response.data.taxes);

          break;
        case "freight":
          response = await apiClient.get(`${API_URL}/freight/read`);

          setParametersList(response.data.freights);

          break;
        case "contributionMargin":
          response = await apiClient.get(`${API_URL}/contribution-margin/read`);

          setParametersList(response.data.contributionMargins);

          break;
        case "st":
          response = await apiClient.get(`${API_URL}/st/read`);

          setParametersList(response.data.sts);

          break;
        default:
          break;
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setListParametersError(error.message);

        setParametersList([]);
      } else {
        setListParametersError("Um erro desconhecido aconteceu!");

        setParametersList([]);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Card>
        <Card.Header as="h3" className="text-center">
          Cadastro de parâmetros
        </Card.Header>
        {registerError && (
          <Alert style={{ margin: "5px" }} variant="danger">
            {registerError}
          </Alert>
        )}
        {registerSuccess && (
          <Alert style={{ margin: "5px" }} variant="success">
            {registerSuccess}
          </Alert>
        )}
        <Card.Body>
          <Form onSubmit={handleRegisterSubmit}>
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

      <Card className="mt-5 mb-5">
        <Card.Header as="h3" className="text-center">
          Listagem de parâmetros
        </Card.Header>
        {listParametersError && (
          <Alert style={{ margin: "5px" }} variant="danger">
            {listParametersError}
          </Alert>
        )}
        <Card.Body>
          <Form onSubmit={handleListParametersSubmit}>
            <Form.Group className="mb-3" controlId="formItemType">
              <Form.Label>
                Selecione o tipo de parâmetro a ser listado
              </Form.Label>
              <Form.Select
                value={itemType}
                required
                onChange={(event) => {
                  setItemType(event.target.value as keyof typeof configItems);

                  setSearched(false)
                }}
              >
                {Object.keys(configItems).map((key) => (
                  <option key={key} value={key}>
                    {configItems[key as keyof typeof configItems].name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <div className="d-grid">
              <Button
                variant="primary"
                type="submit"
                className="btn-custom-orange"
              >
                Buscar
              </Button>
            </div>
          </Form>
          {searched && parametersList.length === 0 ? (
            <Alert style={{ margin: "15px" }} variant="danger">
              Nenhum parâmetro encontrado!
            </Alert>
          ) : searched && parametersList.length > 0 && (
            <Table striped bordered hover responsive className="mt-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descrição</th>
                  <th>{configItems[itemType].field}</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {parametersList.map((parameter) => (
                  <tr key={parameter.id}>
                    <td>{parameter.id}</td>
                    <td>{parameter.description}</td>
                    <td>
                      {"cost" in parameter ? parameter.cost : parameter.percent}
                    </td>
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
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
