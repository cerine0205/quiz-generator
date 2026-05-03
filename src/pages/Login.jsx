import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form);
      navigate("/chat");
    } catch (err) {
      setError("Invalid email or password.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <p style={styles.badge}>Welcome back</p>

        <h1 style={styles.title}>Login</h1>

        <p style={styles.subtitle}>
          Continue your personalized learning journey.
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>

        <p style={styles.text}>
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            style={styles.link}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "radial-gradient(circle at top left, rgba(124, 58, 237, 0.25), transparent 35%), radial-gradient(circle at top right, rgba(6, 182, 212, 0.18), transparent 30%), var(--color-bg)",
    padding: "20px",
  },
  card: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    background: "rgba(17, 24, 39, 0.88)",
    padding: "34px",
    borderRadius: "24px",
    border: "1px solid var(--color-border)",
    boxShadow: "var(--shadow-sm)",
    backdropFilter: "blur(12px)",
  },
  badge: {
    margin: 0,
    color: "var(--color-accent)",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.8px",
  },
  title: {
    margin: 0,
    fontSize: "34px",
  },
  subtitle: {
    margin: "0 0 10px",
    color: "var(--color-text-light)",
    lineHeight: "1.5",
  },
  error: {
    color: "var(--color-danger)",
    margin: 0,
  },
  text: {
    color: "var(--color-text-light)",
    textAlign: "center",
  },
  link: {
    border: "none",
    background: "transparent",
    color: "var(--color-accent)",
    cursor: "pointer",
    fontWeight: "700",
  },
};