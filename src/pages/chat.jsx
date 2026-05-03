import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Button from "../components/Button";
import ChatBubble from "../components/ChatBubble";
import QuizRenderer from "../components/QuizRenderer";
import Loading from "../components/Loading";

import { createChat, getChats, getChat } from "../api/chat";
import { generateQuiz, generatePlan } from "../api/quiz";
import { useAuth } from "../context/AuthContext";

export default function Chat() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const [chats, setChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);

    const [topic, setTopic] = useState("");
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userMessage, setUserMessage] = useState("");

    const [answersByChat, setAnswersByChat] = useState({});
    const [plan, setPlan] = useState(null);

    const currentAnswers = answersByChat[activeChatId] || {};

    const handleLogout = async () => {
        await logout();
        navigate("/");
    };

    useEffect(() => {
        const loadChats = async () => {
            try {
                const res = await getChats();
                setChats(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        loadChats();
    }, []);

    const handleSelectChat = async (id) => {
        try {
            const res = await getChat(id);

            const userMsg = res.data.messages.find((msg) => msg.sender === "user");
            const aiMsg = res.data.messages.find((msg) => msg.sender === "ai");

            setActiveChatId(id);
            setUserMessage(userMsg?.content?.text || "");
            setQuiz(aiMsg?.content || null);
            setTopic("");
            setPlan(null);
        } catch (err) {
            console.error(err);
        }
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!topic.trim()) return;

        setLoading(true);
        setUserMessage(topic);

        try {
            const chatRes = await createChat({
                title: topic,
            });

            const chatId = chatRes.data.id;

            setChats((prev) => [chatRes.data, ...prev]);
            setActiveChatId(chatId);

            const quizRes = await generateQuiz(chatId, {
                topic,
            });

            setQuiz(quizRes.data);
            setTopic("");
            setPlan(null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGeneratePlan = async () => {
        const res = await generatePlan({
            topic: userMessage,
            level: getLevel(),
            chat_id: activeChatId,
        });

        setPlan(res.data);
    };
    const handleNewChat = () => {
        setActiveChatId(null);
        setQuiz(null);
        setUserMessage("");
        setTopic("");
        setPlan(null);
    };

    const calculateScore = () => {
        if (!quiz) return 0;

        return quiz.questions.reduce((score, question, index) => {
            if (currentAnswers[index] === question.correct_answer) {
                return score + 1;
            }

            return score;
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
        quiz && Object.keys(currentAnswers).length === quiz.questions.length;

    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            <Sidebar
                chats={chats}
                activeChatId={activeChatId}
                onNewChat={handleNewChat}
                onSelectChat={handleSelectChat}
                onLogout={handleLogout}
            />

            <div
                style={{
                    flex: 1,
                    position: "relative",
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        overflowY: "auto",
                        padding: "32px",
                        paddingBottom: "120px",
                    }}
                >


                    {!quiz && !loading && !userMessage && (
                        <div
                            style={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <div
                                style={{
                                    maxWidth: "500px",
                                    textAlign: "center",
                                }}
                            >
                                <h2 style={{ marginBottom: "12px" }}>
                                    Learn Smarter with AI
                                </h2>

                                <p style={{ color: "var(--color-text-light)", lineHeight: "1.6" }}>
                                    Enter any topic to generate a quick quiz, discover your level,
                                    and get a personalized 7-day learning plan.
                                </p>

                       
                            </div>
                        </div>
                    )}
                    {userMessage && <ChatBubble sender="user">{userMessage}</ChatBubble>}

                    {loading && <Loading />}

                    {quiz && (
                        <ChatBubble sender="ai">
                            <QuizRenderer
                                key={activeChatId}
                                quiz={quiz}
                                answers={currentAnswers}
                                onAnswerChange={(questionIndex, answer) => {
                                    setAnswersByChat((prev) => ({
                                        ...prev,
                                        [activeChatId]: {
                                            ...(prev[activeChatId] || {}),
                                            [questionIndex]: answer,
                                        },
                                    }));
                                }}
                            />
                        </ChatBubble>
                    )}

                    {isCompleted && (
                        <div
                            style={{
                                marginTop: "18px",
                                background:
                                    "linear-gradient(135deg, var(--color-primary-light), var(--color-accent-light))",
                                border: "1px solid var(--color-border)",
                                borderRadius: "20px",
                                padding: "18px",
                                boxShadow: "var(--shadow-sm)",
                            }}
                        >
                            <p
                                style={{
                                    margin: "0 0 6px",
                                    color: "var(--color-accent)",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.8px",
                                }}
                            >
                                Assessment Result
                            </p>

                            <h3 style={{ margin: 0 }}>
                                Score: {calculateScore()} / {quiz.questions.length}
                            </h3>

                            <p style={{ marginBottom: 0, color: "var(--color-text-light)" }}>
                                Level: <strong style={{ color: "var(--color-text)" }}>{getLevel()}</strong>
                            </p>
                        </div>
                    )}


                    {plan && (
                        <div
                            style={{
                                marginTop: "18px",
                                background: "var(--color-card)",
                                border: "1px solid var(--color-border)",
                                borderRadius: "20px",
                                padding: "20px",
                                boxShadow: "var(--shadow-sm)",
                            }}
                        >
                            <p
                                style={{
                                    margin: "0 0 6px",
                                    color: "var(--color-accent)",
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.8px",
                                }}
                            >
                                Learning Plan
                            </p>

                            <h3 style={{ margin: "0 0 6px" }}>7-Day Roadmap</h3>
                            <p style={{ marginTop: 0, color: "var(--color-text-light)" }}>
                                Level: {plan.level}
                            </p>

                            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                {plan.plan.map((day) => (
                                    <div
                                        key={day.day}
                                        style={{
                                            padding: "14px",
                                            border: "1px solid var(--color-border)",
                                            borderRadius: "14px",
                                            background: "var(--color-card-soft)",
                                        }}
                                    >
                                        <strong style={{ color: "var(--color-accent)" }}>
                                            Day {day.day}
                                        </strong>
                                        <p style={{ margin: "8px 0" }}>{day.task}</p>
                                        <small style={{ color: "var(--color-text-light)" }}>
                                            {day.resource}
                                        </small>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                </div>

                {!quiz && (
                    <form
                        onSubmit={handleGenerate}
                        style={{
                            position: "absolute",
                            bottom: "20px",
                            left: "20px",
                            right: "20px",
                            display: "flex",
                            gap: "10px",
                            background: "var(--color-card)",
                            padding: "12px",
                            borderRadius: "16px",
                            border: "1px solid var(--color-border)",
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
                            position: "absolute",
                            bottom: "20px",
                            left: "20px",
                            right: "20px",
                            display: "flex",
                            justifyContent: "center",
                            background: "rgba( var(--card-rgb), 0.85 )",
                            backdropFilter: "blur(12px)",
                            padding: "12px",
                            borderRadius: "20px",
                            border: "1px solid var(--color-border)",
                            boxShadow: "var(--shadow-sm)",
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
        </div>
    );
}