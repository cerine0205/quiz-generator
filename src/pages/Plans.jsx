import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";
import Button from "../components/Button";
import { getPlans, updatePlanProgress } from "../api/quiz";

export default function Plans() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [openPlanId, setOpenPlanId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const normalizeCompletedDays = (value) => {
    if (!value) return [];

    if (Array.isArray(value)) {
      return value.map(Number);
    }

    if (typeof value === "string") {
      try {
        return JSON.parse(value).map(Number);
      } catch {
        return [];
      }
    }

    return [];
  };

  const handleToggleDay = async (planId, dayNumber) => {
    const plan = plans.find((p) => p.id === planId);

    let completed = normalizeCompletedDays(plan.completed_days);

    if (completed.includes(dayNumber)) {
      completed = completed.filter((d) => d !== dayNumber);
    } else {
      completed = [...completed, dayNumber];
    }

    setPlans((prev) =>
      prev.map((p) =>
        p.id === planId ? { ...p, completed_days: completed } : p
      )
    );

    try {
      await updatePlanProgress(planId, {
        completed_days: completed,
      });
    } catch (err) {
      console.error(err);
    }
  };

const getTitleFromUrl = (url) => {
  try {
    const domain = new URL(url).hostname.replace("www.", "");

    if (domain.includes("youtube")) return "YouTube";
    if (domain.includes("github")) return "GitHub";
    if (domain.includes("freecodecamp")) return "freeCodeCamp";
    if (domain.includes("developer.mozilla")) return "MDN Docs";
    if (domain.includes("reactjs")) return "React Docs";

    return domain;
  } catch {
    return "Open Resource";
  }
};

const renderResource = (resource) => {
  if (!resource) return null;

  const isLink = resource.startsWith("http");
  const title = isLink ? getTitleFromUrl(resource) : resource;

  return isLink ? (
    <a
      href={resource}
      target="_blank"
      rel="noreferrer"
      style={{
        marginTop: "10px",
        padding: "8px 12px",
        borderRadius: "12px",
        background: "var(--color-card)",
        color: "var(--color-accent)",
        fontSize: "13px",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        textDecoration: "none",
        fontWeight: "600",
        border: "1px solid var(--color-border)",
        maxWidth: "100%",
      }}
    >
      🔗 {title}
    </a>
  ) : (
    <div
      style={{
        marginTop: "10px",
        padding: "8px 12px",
        borderRadius: "12px",
        background: "var(--color-card)",
        color: "var(--color-text-light)",
        fontSize: "13px",
        display: "inline-block",
      }}
    >
      📚 {resource}
    </div>
  );
};  

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, rgba(124, 58, 237, 0.22), transparent 35%), radial-gradient(circle at top right, rgba(6, 182, 212, 0.16), transparent 30%), var(--color-bg)",
        color: "var(--color-text)",
        padding: "32px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <Button variant="secondary" onClick={() => navigate("/chat")}>
          ← Back to Chat
        </Button>

        <div style={{ marginTop: "28px", marginBottom: "28px" }}>
          <p
            style={{
              margin: "0 0 8px",
              color: "var(--color-accent)",
              fontSize: "13px",
              fontWeight: "700",
              textTransform: "uppercase",
              letterSpacing: "0.8px",
            }}
          >
            Learning Dashboard
          </p>

          <h1 style={{ margin: 0, fontSize: "42px" }}>
            Your Learning Plans
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "var(--color-text-light)",
              fontSize: "16px",
            }}
          >
            Review your generated roadmaps and open any plan when you need it.
          </p>
        </div>

        {loading && <Loading text="Loading plans..." />}
        {error && <p style={{ color: "var(--color-danger)" }}>{error}</p>}

        {!loading && plans.length === 0 && (
          <div
            style={{
              background: "var(--color-card)",
              border: "1px solid var(--color-border)",
              borderRadius: "22px",
              padding: "28px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <h3 style={{ marginTop: 0 }}>No plans yet</h3>
            <p style={{ color: "var(--color-text-light)" }}>
              Generate a learning plan from chat to see it here.
            </p>

            <Button onClick={() => navigate("/chat")}>
              Generate Your First Plan
            </Button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {plans.map((plan) => {
            const isOpen = openPlanId === plan.id;
            const completedDays = normalizeCompletedDays(plan.completed_days);
            const progress =
              plan.plan.length > 0
                ? (completedDays.length / plan.plan.length) * 100
                : 0;

            return (
              <div
                key={plan.id}
                style={{
                  background: "rgba(var(--card-rgb), 0.85)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "22px",
                  padding: "20px",
                  boxShadow: "var(--shadow-sm)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p
                      style={{
                        margin: "0 0 6px",
                        color: "var(--color-accent)",
                        fontSize: "12px",
                        fontWeight: "700",
                        textTransform: "uppercase",
                        letterSpacing: "0.8px",
                      }}
                    >
                      7-Day Roadmap
                    </p>

                    <h2 style={{ margin: "0 0 8px", fontSize: "24px" }}>
                      {plan.topic}
                    </h2>

                    <p style={{ margin: 0, color: "var(--color-text-light)" }}>
                      Level:{" "}
                      <strong style={{ color: "var(--color-accent)" }}>
                        {plan.level}
                      </strong>
                    </p>

                    <p style={{ marginTop: "6px", fontSize: "13px", color: "var(--color-text-light)" }}>
                      Progress: {completedDays.length} / {plan.plan.length}
                    </p>

                    <div
                      style={{
                        marginTop: "8px",
                        height: "6px",
                        borderRadius: "999px",
                        background: "var(--color-border)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: `${progress}%`,
                          height: "100%",
                          background:
                            "linear-gradient(90deg, var(--color-primary), var(--color-accent))",
                          transition: "0.3s",
                        }}
                      />
                    </div>
                  </div>

                  <Button
                    variant="secondary"
                    onClick={() => setOpenPlanId(isOpen ? null : plan.id)}
                  >
                    {isOpen ? "Hide Plan" : "View Plan"}
                  </Button>
                </div>

                {isOpen && (
                  <div
                    style={{
                      marginTop: "18px",
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "12px",
                    }}
                  >
                    {plan.plan.map((day, index) => {
                      const dayNumber = index + 1;
                      const isDone = completedDays.includes(dayNumber);

                      return (
                        <div
                          key={day.day}
                          style={{
                            padding: "16px",
                            border: "1px solid var(--color-border)",
                            borderRadius: "16px",
                            background: isDone
                              ? "rgba(34,197,94,0.1)"
                              : "var(--color-card-soft)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <button
                              onClick={() => handleToggleDay(plan.id, dayNumber)}
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "6px",
                                border: "1px solid var(--color-border)",
                                background: isDone ? "var(--color-success)" : "transparent",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontSize: "12px",
                                cursor: "pointer",
                              }}
                            >
                              {isDone ? "✓" : ""}
                            </button>

                            <strong style={{ color: "var(--color-accent)" }}>
                              Day {day.day}
                            </strong>
                          </div>

                          <p style={{ margin: "10px 0", lineHeight: "1.5" }}>
                            {day.task}
                          </p>

                          {renderResource(day.resource)}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}