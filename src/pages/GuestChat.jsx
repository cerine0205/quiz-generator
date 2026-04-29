import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";
import ChatBubble from "../components/ChatBubble";
import QuizRenderer from "../components/QuizRenderer";
import { generateGuestQuiz } from "../api/quiz";

export default function GuestChat() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!topic.trim()) return;

    setLoading(true);
    setError("");
    setUserMessage(topic);

    try {
      const res = await generateGuestQuiz({
        topic: topic,
      });

      setQuiz(res.data);
      setTopic("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewQuiz = () => {
    setTopic("");
    setQuiz(null);
    setUserMessage("");
    setError("");
    setAnswers({});
    setQuiz(res.data);
    setTopic("");
  };

  const inputDisabled = loading || quiz;

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
          <Button variant="secondary" onClick={() => (window.location.href = "/login")}>
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
          {userMessage && (
            <ChatBubble sender="user">
              {userMessage}
            </ChatBubble>
          )}

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

          {error && (
            <p style={{ color: "var(--color-danger)" }}>
              {error}
            </p>
          )}
        </div>

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
            disabled={inputDisabled}
          />

          {!quiz ? (
            <Button type="submit" disabled={loading}>
              Generate
            </Button>
          ) : (
            <Button type="button" onClick={handleNewQuiz}>
              New Quiz
            </Button>
          )}
        </form>

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
      </main>
    </div>
  );
}