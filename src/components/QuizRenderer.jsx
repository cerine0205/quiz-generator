import QuestionCard from "./QuestionCard";

export default function QuizRenderer({
  quiz,
  answers = {},
  onAnswerChange = () => {},
}) {
  if (!quiz) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
      <div
        style={{
          paddingBottom: "12px",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <p
          style={{
            margin: "0 0 6px",
            color: "var(--color-accent)",
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
          }}
        >
          Diagnostic Quiz
        </p>

        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            color: "var(--color-text)",
          }}
        >
          {quiz.title}
        </h2>
      </div>

      {quiz.questions.map((question, index) => (
        <QuestionCard
          key={`${quiz.title}-${index}`}
          question={question}
          index={index}
          selected={answers[index]}
          onSelect={(answer) => onAnswerChange(index, answer)}
        />
      ))}
    </div>
  );
}