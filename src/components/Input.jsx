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
        borderRadius: "14px",
        border: "1px solid var(--color-border)",
        background: "var(--color-card)",
        color: "var(--color-text)",
        outline: "none",
        transition: "0.2s ease",
        boxShadow: disabled ? "none" : "0 2px 8px rgba(0,0,0,0.15)",
      }}
      onFocus={(e) => {
        e.target.style.border = "1px solid var(--color-primary)";
        e.target.style.boxShadow =
          "0 0 0 3px var(--color-primary-light)";
      }}
      onBlur={(e) => {
        e.target.style.border = "1px solid var(--color-border)";
        e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.15)";
      }}
    />
  );
}