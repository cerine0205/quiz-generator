export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
}) {
  const base = {
    padding: "10px 18px",
    borderRadius: "14px",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
    transition: "0.2s ease",
    opacity: disabled ? 0.5 : 1,
  };

  const variants = {
    primary: {
      background:
        "linear-gradient(135deg, var(--color-primary), var(--color-accent))",
      color: "#fff",
      boxShadow: "0 6px 20px rgba(124, 58, 237, 0.35)",
    },
    secondary: {
      background: "transparent",
      color: "var(--color-primary)",
      border: "1px solid var(--color-border)",
    },
    ghost: {
      background: "transparent",
      color: "var(--color-text)",
    },
  };

  const styles = {
    ...base,
    ...(variants[variant] || variants.primary),
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={styles}
    >
      {children}
    </button>
  );
}