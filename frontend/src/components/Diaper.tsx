import { useState, useEffect, type FormEvent } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
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
  // Variáveis para armazenar as listas de parâmetros constantes
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
  // Variável para armazenar as matérias-primas
  const [rawMaterialsList, setRawMaterialsList] = useState<IRawMaterial[]>([]);
  // Variáveis para serem enviadas para a API
  const model = props.modelProp;
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError("");

    const rawMaterialsWeightsJSON = Object.fromEntries(rawMaterialsWeights);

    apiClient.post(`${API_URL}/diaper/create-or-update`, {
      model: model,
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
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formDiaperModel">
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control type="text" value={model} readOnly required />
                  </Form.Group>
                </Col>
                <Col md={6}>
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
                          onChange={(event) => {
                            setRawMaterialsWeight(
                              rawMaterialsWeights.set(
                                rawMaterial.name,
                                event.target.value
                              )
                            );
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
        <Col md={6}></Col>
      </Row>
    </Card>
  );
}
