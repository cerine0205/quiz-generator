export default function ChatBubble({ sender, children }) {
  const isUser = sender === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          maxWidth: "650px",
          padding: "12px 16px",
          borderRadius: "16px",
          background: isUser
            ? "var(--chat-user-bg)"
            : "var(--chat-ai-bg)",
          color: isUser
            ? "var(--chat-user-text)"
            : "var(--color-text)",
          border: isUser
            ? "none"
            : "1px solid var(--chat-ai-border)",
        }}
      >
        {children}
      </div>
    </div>
  );
}