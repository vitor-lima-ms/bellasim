import { useState, useEffect, type FormEvent } from "react";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Alert,
  ListGroup,
  Badge,
} from "react-bootstrap";
import axios from "axios";

const API_URL = "/api";

const apiClient = axios.create({ withCredentials: true });

interface IConstantParameter {
  id: number;
  description: string;
  cost?: string;
  percent?: string;
}

interface IRawMaterial {
  id: number;
  name: string;
  unit: string;
  unitCost: string;
}

export function Diaper(props: { modelProp: string }) {
  // Variáveis para armazenar as listas de parâmetros constantes vindas da API
  const [packageQuantity, setPackageQuantity] = useState("");
  const [baleBags, setBaleBags] = useState<IConstantParameter[]>([]);
  const [commissions, setCommissions] = useState<IConstantParameter[]>([]);
  const [contributionMargins, setContributionMargins] = useState<
    IConstantParameter[]
  >([]);
  const [freights, setFreights] = useState<IConstantParameter[]>([]);
  const [packagings, setPackagings] = useState<IConstantParameter[]>([]);
  const [sts, setSts] = useState<IConstantParameter[]>([]);
  const [taxes, setTaxes] = useState<IConstantParameter[]>([]);
  // Variável para armazenar as matérias-primas vindas da API
  const [rawMaterialsList, setRawMaterialsList] = useState<IRawMaterial[]>([]);
  // Variáveis para preencher os campos e/ou serem enviadas para a API
  const model = props.modelProp;
  const [size, setSize] = useState("");
  const [baleBagCost, setBaleBagCost] = useState("");
  const [commissionPercent, setCommissionPercent] = useState("");
  const [contributionMarginPercent, setContributionMarginPercent] =
    useState("");
  const [freightPercent, setFreightPercent] = useState("");
  const [packagingCost, setPackagingCost] = useState("");
  const [stPercent, setStPercent] = useState("");
  const [taxPercent, setTaxPercent] = useState("");
  const [rawMaterialsWeights, setRawMaterialsWeight] = useState<
    Map<string, string>
  >(new Map());
  const [costPerRawMaterial, setCostPerRawMaterial] = useState<string[][]>([]);
  const [salePrice, setSalePrice] = useState("");
  const [unitSalePrice, setUnitSalePrice] = useState("");
  const [salePriceWithST, setSalePriceWithST] = useState("");
  const [unitSalePriceWithST, setUnitSalePriceWithST] = useState("");
  // Flag para utilizada como dependência do useEffect que preenche os
  // campos de formulário. Sempre que o formulário for enviado, a flag
  // é atualizada, e os dados atualizados são buscados da API e utilizados
  // para preencher os campos do formulário
  const [submitFlag, setSubmitFlag] = useState(false);

  const [error, setError] = useState("");

  // Chamada para listagem de parâmetros constantes e matérias-primas
  useEffect(() => {
    const fetchBaleBags = async () => {
      try {
        const response = await apiClient.get(`${API_URL}/bale-bag/read`);

        setBaleBags(response.data.baleBags);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Um erro desconhecido aconteceu!");
        }
      }
    };

    const fetchCommissions = async () => {
      try {
        const response = await apiClient.get(`${API_URL}/commission/read`);

        setCommissions(response.data.commissions);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Um erro desconhecido aconteceu!");
        }
      }
    };

    const fetchContributionMargins = async () => {
      try {
        const response = await apiClient.get(
          `${API_URL}/contribution-margin/read`
        );

        setContributionMargins(response.data.contributionMargins);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Um erro desconhecido aconteceu!");
        }
      }
    };

    const fetchFreights = async () => {
      try {
        const response = await apiClient.get(`${API_URL}/freight/read`);

        setFreights(response.data.freights);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Um erro desconhecido aconteceu!");
        }
      }
    };

    const fetchPackagings = async () => {
      try {
        const response = await apiClient.get(`${API_URL}/packaging/read`);

        setPackagings(response.data.packagings);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Um erro desconhecido aconteceu!");
        }
      }
    };

    const fetchSts = async () => {
      try {
        const response = await apiClient.get(`${API_URL}/st/read`);

        setSts(response.data.sts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Um erro desconhecido aconteceu!");
        }
      }
    };

    const fetchTaxes = async () => {
      try {
        const response = await apiClient.get(`${API_URL}/tax/read`);

        setTaxes(response.data.taxes);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Um erro desconhecido aconteceu!");
        }
      }
    };

    const fetchRawMaterials = async () => {
      try {
        const response = await apiClient.get(`${API_URL}/raw-material/read`);

        setRawMaterialsList(response.data.rawMaterials);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Um erro desconhecido aconteceu!");
        }
      }
    };

    fetchBaleBags();

    fetchCommissions();

    fetchContributionMargins();

    fetchFreights();

    fetchPackagings();

    fetchSts();

    fetchTaxes();

    fetchRawMaterials();
  }, []);

  // Chamada para preencher os campos do formulário (editáveis e não editáveis)
  useEffect(() => {
    const fetchDiaper = async () => {
      try {
        const response = await apiClient.get(
          `${API_URL}/diaper/read-by-model-size`,
          { params: { model: model, size: size } }
        );

        if (response.data.diaper) {
          setPackageQuantity(response.data.diaper.packageQuantity);
          setPackagingCost(response.data.diaper.packagingCost);
          setBaleBagCost(response.data.diaper.baleBagCost);
          setCommissionPercent(response.data.diaper.commissionPercent);
          setTaxPercent(response.data.diaper.taxPercent);
          setFreightPercent(response.data.diaper.freightPercent);
          setContributionMarginPercent(
            response.data.diaper.contributionMarginPercent
          );
          setStPercent(response.data.diaper.STPercent);
          setRawMaterialsWeight(
            new Map(Object.entries(response.data.diaper.rawMaterialsWeight))
          );
          setCostPerRawMaterial(
            Object.entries(response.data.diaper.costPerRawMaterial)
          );
          setSalePrice(response.data.diaper.salePrice);
          setUnitSalePrice(response.data.diaper.unitSalePrice);
          setSalePriceWithST(response.data.diaper.salePriceWithST);
          setUnitSalePriceWithST(response.data.diaper.unitSalePriceWithST);
        } else {
          setPackageQuantity("");
          setPackagingCost("");
          setBaleBagCost("");
          setCommissionPercent("");
          setTaxPercent("");
          setFreightPercent("");
          setContributionMarginPercent("");
          setStPercent("");
          setRawMaterialsWeight(new Map());
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Um erro desconhecido aconteceu!");
        }
      }
    };

    fetchDiaper();
  }, [model, size, submitFlag]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError("");

    const rawMaterialsWeightsJSON = Object.fromEntries(rawMaterialsWeights);

    try {
      await apiClient.post(`${API_URL}/diaper/create-or-update`, {
        model: model,
        size: size,
        packageQuantity: packageQuantity,
        packagingCost: packagingCost,
        baleBagCost: baleBagCost,
        commissionPercent: commissionPercent,
        taxPercent: taxPercent,
        freightPercent: freightPercent,
        contributionMarginPercent: contributionMarginPercent,
        stPercent: stPercent,
        rawMaterialsWeightsJSON: rawMaterialsWeightsJSON,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Um erro desconhecido aconteceu!");
      }
    } finally {
      setSubmitFlag(!submitFlag);
    }
  };

  return (
    <Card>
      <Card.Header as="h3" className="text-center">
        {model}
      </Card.Header>
      <Row>
        <Col md={6}>
          <Card.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formDiaperModel">
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control type="text" value={model} readOnly required />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formPackageQuantity">
                    <Form.Label>Tamanho</Form.Label>
                    <Form.Select
                      value={size}
                      onChange={(event) => setSize(event.target.value)}
                      required
                    >
                      <option value="" disabled>
                        ...
                      </option>
                      <option value="XG">XG</option>
                      <option value="G">G</option>
                      <option value="M">M</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formPackageQuantity">
                    <Form.Label>Quantidade por pacote</Form.Label>
                    <Form.Control
                      type="number"
                      min={0}
                      value={packageQuantity}
                      onChange={(event) =>
                        setPackageQuantity(event.target.value)
                      }
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formRawMaterials">
                <Form.Label>Matérias-primas</Form.Label>
                <Card>
                  <Card.Body style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {rawMaterialsList.map((rawMaterial) => (
                      <>
                        <Form.Label>{rawMaterial.name}</Form.Label>
                        <Form.Control
                          className="mb-3"
                          type="number"
                          step="0.0001"
                          min={0}
                          placeholder="Quantidade"
                          value={rawMaterialsWeights.get(rawMaterial.name)}
                          onChange={(event) => {
                            const newMap = new Map(rawMaterialsWeights);

                            newMap.set(rawMaterial.name, event.target.value);

                            setRawMaterialsWeight(newMap);
                          }}
                        />
                      </>
                    ))}
                  </Card.Body>
                </Card>
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formPackaging">
                    <Form.Label>Embalagem (R$)</Form.Label>
                    <Form.Select
                      value={packagingCost}
                      onChange={(event) => setPackagingCost(event.target.value)}
                      required
                    >
                      <option value="" disabled>
                        ...
                      </option>
                      {packagings.map((packaging) => (
                        <option key={packaging.id} value={packaging.cost}>
                          {packaging.cost}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBaleBag">
                    <Form.Label>Saco para fardos (R$)</Form.Label>
                    <Form.Select
                      value={baleBagCost}
                      onChange={(event) => setBaleBagCost(event.target.value)}
                      required
                    >
                      <option value="" disabled>
                        ...
                      </option>
                      {baleBags.map((baleBag) => (
                        <option key={baleBag.id} value={baleBag.cost}>
                          {baleBag.cost}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formCommission">
                    <Form.Label>Comissão (%)</Form.Label>
                    <Form.Select
                      value={commissionPercent}
                      onChange={(event) =>
                        setCommissionPercent(event.target.value)
                      }
                      required
                    >
                      <option value="" disabled>
                        ...
                      </option>
                      {commissions.map((commission) => (
                        <option key={commission.id} value={commission.percent}>
                          {commission.percent}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formTaxes">
                    <Form.Label>Impostos (%)</Form.Label>
                    <Form.Select
                      value={taxPercent}
                      onChange={(event) => setTaxPercent(event.target.value)}
                      required
                    >
                      <option value="" disabled>
                        ...
                      </option>
                      {taxes.map((tax) => (
                        <option key={tax.id} value={tax.percent}>
                          {tax.percent}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3" controlId="formFreight">
                    <Form.Label>Frete (%)</Form.Label>
                    <Form.Select
                      value={freightPercent}
                      onChange={(event) =>
                        setFreightPercent(event.target.value)
                      }
                      required
                    >
                      <option value="" disabled>
                        ...
                      </option>
                      {freights.map((freight) => (
                        <option key={freight.id} value={freight.percent}>
                          {freight.percent}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group
                    className="mb-3"
                    controlId="formContributionMargin"
                  >
                    <Form.Label>Margem de Contribuição (%)</Form.Label>
                    <Form.Select
                      value={contributionMarginPercent}
                      onChange={(event) =>
                        setContributionMarginPercent(event.target.value)
                      }
                      required
                    >
                      <option value="" disabled>
                        ...
                      </option>
                      {contributionMargins.map((contributionMargin) => (
                        <option
                          key={contributionMargin.id}
                          value={contributionMargin.percent}
                        >
                          {contributionMargin.percent}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formST">
                    <Form.Label>Substituição Tributária (%)</Form.Label>
                    <Form.Select
                      value={stPercent}
                      onChange={(event) => setStPercent(event.target.value)}
                      required
                    >
                      <option value="" disabled>
                        ...
                      </option>
                      {sts.map((sts) => (
                        <option key={sts.id} value={sts.percent}>
                          {sts.percent}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-grid mt-3">
                <Button className="btn-custom-orange" type="submit">
                  Simular
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Col>
        <Col md={6}>
          <div style={{ padding: "16px" }}>
            <h4>Resultados da simulação</h4>

            <div>
              <label className="form-label">Custo por matéria-prima</label>
              <ListGroup variant="flush" className="border rounded mb-4">
                {costPerRawMaterial.map((rawMaterial, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>{rawMaterial[0]}</span>
                    <Badge bg="secondary">R$ {rawMaterial[1]}</Badge>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>

            <div className="mt-auto">
              <Row>
                <Col sm={6}>
                  <Alert variant="light" className="text-center p-2">
                    <span className="d-block small">Preço de venda</span>
                    <strong className="d-block fs-4">
                      R$ {salePrice || "0,00"}
                    </strong>
                    <small className="text-muted">
                      R$ {unitSalePrice || "0,00"} / fralda
                    </small>
                  </Alert>
                </Col>
                <Col sm={6}>
                  <Alert variant="info" className="text-center p-2">
                    <span className="d-block small">
                      Preço de venda (com ST)
                    </span>
                    <strong className="d-block fs-4">
                      R$ {salePriceWithST || "0,00"}
                    </strong>
                    <small className="text-muted">
                      R$ {unitSalePriceWithST || "0,00"} / fralda
                    </small>
                  </Alert>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
