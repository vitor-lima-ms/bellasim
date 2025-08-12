import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import { ProtectedRoute } from "./components/ProtectedRoute";

import { Routes, Route } from "react-router-dom";

import { Container, Nav, Navbar } from "react-bootstrap";

import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { LogoutPage } from "./pages/auth/LogoutPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";

import { CreationConstantParameterFormPage } from "./pages/constantParameters/CreationConstantParameterFormPage";
import { UpdateConstantParameterPage } from "./pages/constantParameters/UpdateConstantParameterPage";

function AppContent() {
  const auth = useAuth();

  const navbarBackgroundColor = "#e67e00";

  return (
    <div className="App">
      {auth.isAuthenticated && (
        <>
          <Navbar
            variant="light"
            className="shadow-sm"
            style={{
              backgroundColor: navbarBackgroundColor,
              fontWeight: "bold",
            }}
          >
            <Container fluid>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/constant-parameters">
                    Parâmetros constantes
                  </Nav.Link>
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
        
        <Route
          path="/constant-parameters"
          element={
            <ProtectedRoute>
              <CreationConstantParameterFormPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/:itemType/update-constant-parameter/:id"
          element={
            <ProtectedRoute>
              <UpdateConstantParameterPage />
            </ProtectedRoute>
          }
        />
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
