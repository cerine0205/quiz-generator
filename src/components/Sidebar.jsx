import Button from "./Button";

export default function Sidebar({
  chats = [],
  activeChatId,
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
          padding: "10px",
          textAlign: "left",
          border: "none",
          cursor: "pointer",
          borderRadius: "8px",
          color: isActive ? "white" : "var(--color-text)",
          background: isActive ? "var(--color-primary)" : "transparent",
          fontWeight: isActive ? "600" : "400",
          marginBottom: "6px",
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