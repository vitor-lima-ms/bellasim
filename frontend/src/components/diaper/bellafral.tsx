import { useState, useEffect, type FormEvent } from "react";
import { Card, Form, Button, Row, Col, Alert } from "react-bootstrap";
// import axios from "axios";

// const apiClient = axios.create({ withCredentials: true });

interface IParameter {
  id: number;
  description: string;
  cost?: string;
  percent?: string;
}

// interface IRawMaterial {
//   id: number;
//   name: string;
// }

export function Bellafral() {
  const [model, setModel] = useState("Bellafral");
  const [packageQuantity, setPackageQuantity] = useState("");
  const [packagingCost, setPackagingCost] = useState("");
  const [baleBagCost, setBaleBagCost] = useState("");
  const [commissionPercent, setCommissionPercent] = useState("");
  const [taxesPercent, setTaxesPercent] = useState("");
  const [freightPercent, setFreightPercent] = useState("");
  const [contributionMarginPercent, setContributionMarginPercent] =
    useState("");
  const [stPercent, setSTPercent] = useState("");
  const [packagingOptions, setPackagingOptions] = useState<IParameter[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setPackagingOptions([
      { id: 1, description: "Embalagem Padrão", cost: "1.50" },
      { id: 2, description: "Embalagem Econômica", cost: "1.20" },
    ]);
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    setError("");

    setSuccess("");

    const formData = {
      model,
      packageQuantity,
      packagingCost,
      baleBagCost,
      commissionPercent,
      taxesPercent,
      freightPercent,
      contributionMarginPercent,
      stPercent,
    };

    console.log("Dados a serem enviados:", formData);

    setSuccess("Produto cadastrado com sucesso!");
  };

  return (
    <Card>
      <Card.Header as="h3" className="text-center">
        Bellafral
      </Card.Header>
      <Card.Body>
        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formDiaperModel">
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                  type="text"
                  value={model}
                  onChange={(event) => setModel(event.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formPackageQuantity">
                <Form.Label>Quantidade por pacote</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  value={packageQuantity}
                  onChange={(event) => setPackageQuantity(event.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formRawMaterials">
            <Form.Label>Matérias-primas</Form.Label>
            <Card body className="text-center">
              <p className="mb-0">
                Aqui entrará um componente mais complexo para selecionar
                múltiplas matérias-primas e seus respectivos pesos.
              </p>
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
                  {packagingOptions.map((opt) => (
                    <option key={opt.id} value={opt.cost}>
                      {opt.description}
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
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formCommission">
                <Form.Label>Comissão (%)</Form.Label>
                <Form.Select
                  value={commissionPercent}
                  onChange={(event) => setCommissionPercent(event.target.value)}
                  required
                >
                  <option value="" disabled>
                    ...
                  </option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formTaxes">
                <Form.Label>Impostos (%)</Form.Label>
                <Form.Select
                  value={taxesPercent}
                  onChange={(event) => setTaxesPercent(event.target.value)}
                  required
                >
                  <option value="" disabled>
                    ...
                  </option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formFreight">
                <Form.Label>Frete (%)</Form.Label>
                <Form.Select
                  value={freightPercent}
                  onChange={(event) => setFreightPercent(event.target.value)}
                  required
                >
                  <option value="" disabled>
                    ...
                  </option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formContributionMargin">
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
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formST">
                <Form.Label>Substituição Tributária (%)</Form.Label>
                <Form.Select
                  value={stPercent}
                  onChange={(event) => setSTPercent(event.target.value)}
                  required
                >
                  <option value="" disabled>
                    ...
                  </option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-grid mt-3">
            <Button className="btn-custom-orange" type="submit">
              Cadastrar
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
