export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
}) {
  const styles = {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid var(--color-border)",
    borderRadius: "12px",
    background: "var(--color-card)",
    color: "var(--color-text)",
    outline: "none",
  };

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      style={styles}
    />
  );
}