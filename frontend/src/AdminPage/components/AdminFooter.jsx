import React from "react";

export default function AdminFooter() {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p className="mb-0">
        © {new Date().getFullYear()} FixIt Admin Panel | All Rights Reserved
      </p>
    </footer>
  );
}

