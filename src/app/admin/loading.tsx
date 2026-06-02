export default function AdminLoading() {
  return (
    <div style={{ padding: "32px", display: "flex", alignItems: "center", gap: "12px" }}>
      <div
        style={{
          width: "20px",
          height: "20px",
          border: "2px solid #E5E5E5",
          borderTopColor: "#7B189F",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />
      <span style={{ fontSize: "14px", color: "#888" }}>Loading...</span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
