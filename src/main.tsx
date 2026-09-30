  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  // Prerendered pages ship their JSON-LD as static tags (see
  // scripts/prerender.mjs). The app re-adds the same data from useSEO and
  // Layout once it's running, so drop the static copies first — otherwise
  // every block would appear twice to anything that renders JavaScript.
  document.querySelectorAll('script[data-seo-ssr]').forEach((el) => el.remove());

  createRoot(document.getElementById("root")!).render(<App />);
