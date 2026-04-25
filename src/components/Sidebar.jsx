import Button from "./Button";

export default function Sidebar({
  chats = [],
  onNewChat,
  onSelectChat,
  onLogout,
}) {
  return (
    <aside
      style={{
        width: "260px",
        height: "100vh",
        background: "var(--color-card)",
        borderRight: "1px solid var(--color-border)",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button onClick={onNewChat}>New Chat</Button>

      <div style={{ marginTop: "20px", flex: 1 }}>
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              textAlign: "left",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              borderRadius: "8px",
              color: "var(--color-text)",
            }}
          >
            {chat.title}
          </button>
        ))}
      </div>

      <button
        onClick={onLogout}
        style={{
          color: "var(--color-danger)",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Logout
      </button>
    </aside>
  );
}