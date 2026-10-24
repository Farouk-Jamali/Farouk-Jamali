import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";

document.documentElement.lang = "fr";
const racine = document.getElementById("racine");

// Le HTML est pré-rendu à la construction : React reprend la main sans tout redessiner.
if (racine.firstElementChild) {
  hydrateRoot(racine, <App />, {
    onRecoverableError: (erreur) => console.error("Hydratation", erreur),
  });
} else {
  createRoot(racine).render(<App />);
}
