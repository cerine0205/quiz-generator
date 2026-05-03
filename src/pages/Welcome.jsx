import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "radial-gradient(circle at top left, rgba(124, 58, 237, 0.28), transparent 35%), radial-gradient(circle at top right, rgba(6, 182, 212, 0.2), transparent 30%), var(--color-bg)",
        padding: "24px",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          width: "100%",
          textAlign: "center",
          background: "rgba(17, 24, 39, 0.88)",
          padding: "56px 40px",
          borderRadius: "28px",
          border: "1px solid var(--color-border)",
          boxShadow: "var(--shadow-sm)",
          backdropFilter: "blur(12px)",
        }}
      >
        <p
          style={{
            margin: "0 0 12px",
            color: "var(--color-accent)",
            fontSize: "13px",
            fontWeight: "700",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          AI Learning Platform
        </p>

        <h1
          style={{
            margin: "0 0 16px",
            fontSize: "52px",
            lineHeight: "1.05",
          }}
        >
          SkillPath AI
        </h1>

        <p
          style={{
            maxWidth: "560px",
            margin: "0 auto 30px",
            color: "var(--color-text-light)",
            fontSize: "18px",
            lineHeight: "1.6",
          }}
        >
          Discover your real level and generate a personalized 7-day learning
          plan built around your answers.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          {isAuthenticated ? (
            <Button onClick={() => navigate("/chat")}>Go to Chat</Button>
          ) : (
            <>
              <Button onClick={() => navigate("/login")}>
                Login / Register
              </Button>

              <Button variant="secondary" onClick={() => navigate("/guest")}>
                Continue as Guest
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}