export default function QuestionCard({ question, index, selected, onSelect }) {
  const getStyle = (option) => {
    const isSelected = selected === option;

    if (!isSelected) {
      return {
        border: "1px solid var(--color-border)",
        background: "var(--color-card-soft)",
        color: "var(--color-text)",
      };
    }

    const isCorrect = option === question.correct_answer;

    return {
      border: isCorrect
        ? "1px solid var(--color-success)"
        : "1px solid var(--color-danger)",
      background: isCorrect
        ? "rgba(34, 197, 94, 0.15)"
        : "rgba(239, 68, 68, 0.15)",
      color: isCorrect ? "var(--color-success)" : "var(--color-danger)",
    };
  };

  return (
    <div
      style={{
        background: "var(--color-card)",
        border: "1px solid var(--color-border)",
        borderRadius: "20px",
        padding: "18px",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "14px",
        }}
      >
        <span
          style={{
            fontSize: "12px",
            fontWeight: "700",
            color: "var(--color-accent)",
            textTransform: "uppercase",
            letterSpacing: "0.8px",
          }}
        >
          Question {index + 1}
        </span>

        <span
          style={{
            fontSize: "12px",
            color: "var(--color-text-light)",
          }}
        >
          {question.type}
        </span>
      </div>

      <h3
        style={{
          margin: "0 0 16px",
          fontSize: "17px",
          lineHeight: "1.5",
        }}
      >
        {question.question}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {question.options.map((option, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(option)}
            style={{
              padding: "12px 14px",
              borderRadius: "14px",
              cursor: "pointer",
              textAlign: "left",
              transition: "0.2s ease",
              fontWeight: "500",
              ...getStyle(option),
            }}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}