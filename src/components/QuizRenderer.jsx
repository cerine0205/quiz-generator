import QuestionCard from "./QuestionCard";

export default function QuizRenderer({ quiz, answers, onAnswerChange }) {
  if (!quiz) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h2>{quiz.title}</h2>

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