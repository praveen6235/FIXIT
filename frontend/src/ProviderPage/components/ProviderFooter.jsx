export default function ProviderFooter() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0">
          © {new Date().getFullYear()} FixIt Provider Panel. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
}
