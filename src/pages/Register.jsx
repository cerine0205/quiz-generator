import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
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
      await register(form);
      navigate("/chat");
    } catch (err) {
      setError("Registration failed. Please check your information.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <p style={styles.badge}>Start learning smarter</p>

        <h1 style={styles.title}>Create account</h1>

        <p style={styles.subtitle}>
          Build a personalized learning path based on your real level.
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <Input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <Input
          name="password_confirmation"
          type="password"
          placeholder="Confirm Password"
          value={form.password_confirmation}
          onChange={handleChange}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </Button>

        <p style={styles.text}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={styles.link}
          >
            Login
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
    width: "420px",
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