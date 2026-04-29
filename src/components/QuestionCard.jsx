export default function QuestionCard({ question, index, selected, onSelect }) {
  const getStyle = (option) => {
    const isSelected = selected === option;

    if (!isSelected) {
      return {
        border: "1px solid var(--color-border)",
        background: "var(--color-card)",
        color: "var(--color-text)",
      };
    }

    const isCorrect = option === question.correct_answer;

    return {
      border: isCorrect
        ? "2px solid var(--color-success)"
        : "2px solid var(--color-danger)",
      background: isCorrect ? "#dcfce7" : "#fee2e2",
      color: isCorrect ? "#166534" : "#7f1d1d",
    };
  };

  return (
    <div style={{
      background: "var(--color-card)",
      border: "1px solid var(--color-border)",
      borderRadius: "16px",
      padding: "16px",
      boxShadow: "var(--shadow-sm)",
    }}>
      <h3 style={{ marginBottom: "12px" }}>
        {index + 1}. {question.question}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {question.options.map((option, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onSelect(option)}
            style={{
              padding: "10px",
              borderRadius: "10px",
              cursor: "pointer",
              textAlign: "left",
              transition: "0.2s",
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