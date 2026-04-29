import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Input from "../components/Input";
import Button from "../components/Button";
import ChatBubble from "../components/ChatBubble";
import QuizRenderer from "../components/QuizRenderer";
import Loading from "../components/Loading";

import { createChat, getChats, getChat } from "../api/chat";
import { generateQuiz } from "../api/quiz";
import { useAuth } from "../context/AuthContext";

export default function Chat() {
    const { logout } = useAuth();

    const [chats, setChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);

    const [topic, setTopic] = useState("");
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userMessage, setUserMessage] = useState("");

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
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleNewChat = () => {
        setActiveChatId(null);
        setQuiz(null);
        setUserMessage("");
        setTopic("");
    };

   return (
  <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
    <Sidebar
      chats={chats}
      activeChatId={activeChatId}
      onNewChat={handleNewChat}
      onSelectChat={handleSelectChat}
      onLogout={logout}
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
        {userMessage && <ChatBubble sender="user">{userMessage}</ChatBubble>}

        {loading && <Loading />}

        {quiz && (
          <ChatBubble sender="ai">
            <QuizRenderer quiz={quiz} />
          </ChatBubble>
        )}
      </div>

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
          disabled={loading || quiz}
        />

        {!quiz ? (
          <Button type="submit" disabled={loading}>
            Generate
          </Button>
        ) : (
          <Button type="button" onClick={handleNewChat}>
            New Chat
          </Button>
        )}
      </form>
    </div>
  </div>
);
}