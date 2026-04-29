export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  name,
}) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      style={{
        width: "100%",
        padding: "12px 14px",
        border: "1px solid var(--color-border)",
        borderRadius: "12px",
        background: "var(--color-card)",
        color: "var(--color-text)",
        outline: "none",
      }}
    />
  );
}