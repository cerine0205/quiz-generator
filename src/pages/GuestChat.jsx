import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";
import ChatBubble from "../components/ChatBubble";
import QuizRenderer from "../components/QuizRenderer";
import { generateGuestQuiz, generatePlan } from "../api/quiz";

export default function GuestChat() {

  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});
  const [plan, setPlan] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setUserMessage(topic);
    setAnswers({});
    setPlan(null);

    try {
      const res = await generateGuestQuiz({ topic });
      setQuiz(res.data);

      setTopic("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    try {
      const res = await generatePlan({
        topic: userMessage,
        level: getLevel(),
      });

      setPlan(res.data);
    } catch (err) {
      setError("Failed to generate learning plan.");
      console.error(err);
    }
  };

  const calculateScore = () => {
    if (!quiz) return 0;

    return quiz.questions.reduce((score, question, index) => {
      return answers[index] === question.correct_answer ? score + 1 : score;
    }, 0);
  };

  const getLevel = () => {
    if (!quiz) return "";

    const score = calculateScore();
    const total = quiz.questions.length;

    if (score <= total * 0.4) return "Beginner";
    if (score <= total * 0.7) return "Intermediate";
    return "Advanced";
  };

  const isCompleted =
    quiz && Object.keys(answers).length === quiz.questions.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <header
        style={{
          height: "70px",
          padding: "0 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-card)",
        }}
      >
        <h2>Quiz Generator</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            variant="secondary"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </Button>

          <Button onClick={() => (window.location.href = "/register")}>
            Register
          </Button>
        </div>
      </header>

      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "32px",
          paddingBottom: "120px",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          {userMessage && <ChatBubble sender="user">{userMessage}</ChatBubble>}

          {loading && <Loading text="Generating quiz..." />}

          {quiz && (
            <ChatBubble sender="ai">
              <QuizRenderer
                quiz={quiz}
                answers={answers}
                onAnswerChange={(questionIndex, answer) => {
                  setAnswers((prev) => ({
                    ...prev,
                    [questionIndex]: answer,
                  }));
                }}
              />
            </ChatBubble>
          )}

          {isCompleted && (
            <div
              style={{
                marginTop: "16px",
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h3>Your Assessment Result</h3>
              <p>
                Score: {calculateScore()} / {quiz.questions.length}
              </p>
              <p>Level: {getLevel()}</p>
            </div>
          )}

          {plan && (
            <div
              style={{
                marginTop: "16px",
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <h3>7-Day Learning Plan</h3>
              <p>Level: {plan.level}</p>

              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.plan.map((day) => (
                  <div
                    key={day.day}
                    style={{
                      padding: "10px",
                      border: "1px solid var(--color-border)",
                      borderRadius: "10px",
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
          )}

          {error && <p style={{ color: "var(--color-danger)" }}>{error}</p>}

          {quiz && (
            <p
              style={{
                marginTop: "12px",
                color: "var(--color-text-light)",
                fontSize: "14px",
              }}
            >
              Guest quizzes are not saved. Login to save your chat history.
            </p>
          )}
        </div>
      </main>

      {!quiz && (
        <form
          onSubmit={handleGenerate}
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0",
            padding: "16px",
            background: "var(--color-card)",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            gap: "10px",
          }}
        >
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic..."
            disabled={loading}
          />

          <Button type="submit" disabled={loading}>
            Generate
          </Button>
        </form>
      )}

      {quiz && (
        <div
          style={{
            position: "fixed",
            bottom: "0",
            left: "0",
            right: "0",
            padding: "16px",
            background: "var(--color-card)",
            borderTop: "1px solid var(--color-border)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            type="button"
            disabled={!isCompleted}
            onClick={handleGeneratePlan}
          >
            Generate Plan
          </Button>
        </div>
      )}
    </div>
  );
}