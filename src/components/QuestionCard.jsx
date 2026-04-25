export default function QuestionCard({ question, index }) {
  return (
    <div
      style={{
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>
        {index + 1}. {question.question}
      </h3>

      {question.type === "mcq" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {question.options.map((option, i) => (
            <button
              key={i}
              style={{
                padding: "10px",
                border: "1px solid var(--color-border)",
                borderRadius: "10px",
                background: "var(--color-card)",
                cursor: "pointer",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {question.type === "TF" && (
        <div style={{ display: "flex", gap: "10px" }}>
          {question.options.map((option) => (
            <button
              key={option}
              style={{
                padding: "10px 20px",
                border: "1px solid var(--color-border)",
                borderRadius: "10px",
                background: "var(--color-card)",
                cursor: "pointer",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}