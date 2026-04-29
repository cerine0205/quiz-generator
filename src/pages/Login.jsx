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
        <h1>Login</h1>

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
    background: "var(--color-bg)",
  },
  card: {
    width: "380px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    background: "var(--color-card)",
    padding: "32px",
    borderRadius: "16px",
    border: "1px solid var(--color-border)",
    boxShadow: "var(--shadow-sm)",
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
    color: "var(--color-primary)",
    cursor: "pointer",
    fontWeight: "600",
  },
};