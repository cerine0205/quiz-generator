import { useEffect, useState } from "react";

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("plans");
    if (stored) {
      setPlans(JSON.parse(stored));
    }
  }, []);

  if (plans.length === 0) {
    return <p style={{ padding: "20px" }}>No plans yet</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Plans</h2>

      {plans.map((plan, i) => (
        <div
          key={i}
          style={{
            marginTop: "16px",
            border: "1px solid var(--color-border)",
            padding: "16px",
            borderRadius: "12px",
          }}
        >
          <h3>{plan.topic}</h3>
          <p>Level: {plan.level}</p>
        </div>
      ))}
    </div>
  );
}