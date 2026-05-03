import Button from "./Button";
import ThemeToggle from "../ThemeToggle";
import { useNavigate } from "react-router-dom";

export default function Sidebar({
  chats = [],
  activeChatId,
  onNewChat,
  onSelectChat,
  onLogout,
}) {
  const navigate = useNavigate();

  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        background: "var(--color-card)",
        borderRight: "1px solid var(--color-border)",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "10px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            SkillPath AI
          </h2>

          <p
            style={{
              margin: "4px 0 0",
              fontSize: "12px",
              color: "var(--color-text-light)",
            }}
          >
            Learn smarter
          </p>
        </div>

        <div style={{ marginTop: "-4px" }}>
          <ThemeToggle />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Button onClick={onNewChat}>+ New Assessment</Button>

        <Button variant="secondary" onClick={() => navigate("/plans")}>
          View Plans
        </Button>
      </div>

      <div
        style={{
          marginTop: "20px",
          flex: 1,
          overflowY: "auto",
          paddingRight: "4px",
        }}
      >
        {chats.map((chat) => {
          const isActive = chat.id === activeChatId;

          return (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              style={{
                display: "block",
                width: "100%",
                padding: "10px 12px",
                textAlign: "left",
                border: "none",
                cursor: "pointer",
                borderRadius: "12px",
                marginBottom: "6px",
                background: isActive
                  ? "var(--color-primary-light)"
                  : "transparent",
                color: isActive ? "var(--color-primary)" : "var(--color-text)",
                fontWeight: isActive ? "600" : "400",
                transition: "0.2s ease",
              }}
            >
              {chat.title}
            </button>
          );
        })}
      </div>

      <button
        onClick={onLogout}
        style={{
          marginTop: "12px",
          width: "100%",
          padding: "11px 12px",
          borderRadius: "14px",
          border: "1px solid rgba(239, 68, 68, 0.35)",
          background: "rgba(239, 68, 68, 0.10)",
          color: "var(--color-danger)",
          cursor: "pointer",
          fontWeight: "700",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M10 12h10M17 9l3 3-3 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        Logout
      </button>
    </aside>
  );
}