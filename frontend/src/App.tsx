import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Routes, Route } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ProtectedRoute } from "./components/ProtectedRoute";

import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { LogoutPage } from "./pages/auth/LogoutPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";

function AppContent() {
  const auth = useAuth();

  return (
    <div className="App">
      {auth.isAuthenticated && (
        <>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/campaign">Campanhas</Nav.Link>
                  <NavDropdown title="Biblioteca de parâmetros">
                    <NavDropdown.Item href="/generic-parameters">
                      Parâmetros genéricos
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/lsct-parameters">
                      LSCT
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link href="/register">Registrar</Nav.Link>
                  <Nav.Link href="/logout">Sair</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <LogoutPage />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      </Routes>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
