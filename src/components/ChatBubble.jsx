export default function ChatBubble({ sender, children }) {
  const isUser = sender === "user";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          maxWidth: "680px",
          padding: "14px 18px",
          borderRadius: isUser
            ? "18px 18px 6px 18px"
            : "18px 18px 18px 6px",

          background: isUser
            ? "var(--chat-user-bg)"
            : "var(--chat-ai-bg)",

          color: isUser
            ? "var(--chat-user-text)"
            : "var(--color-text)",

          border: isUser
            ? "none"
            : "1px solid var(--chat-ai-border)",

          boxShadow: isUser
            ? "0 8px 24px rgba(124, 58, 237, 0.25)"
            : "var(--shadow-sm)",

          backdropFilter: "blur(6px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}