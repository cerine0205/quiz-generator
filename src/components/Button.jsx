export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
}) {
  const styles = {
    padding: "10px 16px",
    borderRadius: "12px",
    border: "none",
    fontWeight: "600",
    cursor: "pointer",
    background:
      variant === "primary"
        ? "var(--color-primary)"
        : "var(--color-card)",
    color:
      variant === "primary"
        ? "#fff"
        : "var(--color-primary)",
    border:
      variant === "secondary"
        ? "1px solid var(--color-primary)"
        : "none",
    opacity: disabled ? 0.5 : 1,
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} style={styles}>
      {children}
    </button>
  );
}