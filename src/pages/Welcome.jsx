import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "var(--color-bg)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "var(--color-card)",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "var(--shadow-sm)",
          width: "350px",
        }}
      >
        <h1 style={{ marginBottom: "10px" }}>Quiz Generator</h1>
        <p style={{ color: "var(--color-text-light)", marginBottom: "20px" }}>
          Generate quizzes from any topic using AI
        </p>

        {isAuthenticated ? (
          <Button onClick={() => (window.location.href = "/chat")}>
            Go to Chat
          </Button>
        ) : (
          <>
            <Button onClick={() => (window.location.href = "/login")}>
              Login / Register
            </Button>

            <div style={{ marginTop: "10px" }} />

            <Button
              variant="secondary"
              onClick={() => navigate("/guest")}
            >
              Continue as Guest
            </Button>
          </>
        )}
      </div>
    </div>
  );
}