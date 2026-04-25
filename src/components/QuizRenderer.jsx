import QuestionCard from "./QuestionCard";

export default function QuizRenderer({ quiz }) {
  if (!quiz) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h2>{quiz.title}</h2>

      {quiz.questions.map((q, i) => (
        <QuestionCard key={i} question={q} index={i} />
      ))}
    </div>
  );
}