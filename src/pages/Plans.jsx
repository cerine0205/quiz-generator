import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import { getPlans } from "../api/quiz";
import { useAuth } from "../context/AuthContext";

export default function Plans() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await getPlans();
        setPlans(res.data);
      } catch (err) {
        setError("Failed to load plans.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      
      {/* Sidebar */}
      <Sidebar
        chats={[]} // ما نحتاجه هنا
        onNewChat={() => navigate("/chat")}
        onSelectChat={() => {}}
        onLogout={handleLogout}
      />

      {/* Main */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "32px",
          background: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      >
        <h1 style={{ marginBottom: "20px" }}>Your Learning Plans</h1>

        {loading && <Loading text="Loading plans..." />}

        {error && (
          <p style={{ color: "var(--color-danger)" }}>{error}</p>
        )}

        {!loading && plans.length === 0 && (
          <p style={{ color: "var(--color-text-light)" }}>
            No plans yet. Generate one from chat . . .
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              style={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h2>{plan.topic}</h2>
              <p style={{ marginBottom: "12px" }}>
                Level: <strong>{plan.level}</strong>
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.plan.map((day) => (
                  <div
                    key={day.day}
                    style={{
                      padding: "12px",
                      border: "1px solid var(--color-border)",
                      borderRadius: "12px",
                    }}
                  >
                    <strong>Day {day.day}</strong>
                    <p>{day.task}</p>
                    <small style={{ color: "var(--color-text-light)" }}>
                      {day.resource}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}