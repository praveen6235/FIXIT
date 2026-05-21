export default function AdminFooter() {
  return (
    <footer style={{
      background: "rgba(5,8,18,0.95)",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      padding: "1.2rem",
      textAlign: "center",
      color: "var(--text-muted)",
      fontSize: "0.85rem",
    }}>
      © {new Date().getFullYear()}{" "}
      <span style={{ color: "var(--primary)", fontWeight: 700 }}>FixIt</span>{" "}
      Admin Panel · All Rights Reserved
    </footer>
  );
}
