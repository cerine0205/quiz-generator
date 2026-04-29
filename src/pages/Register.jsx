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
        <h1>Register</h1>

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