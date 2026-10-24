import { renderToString } from "react-dom/server";
import App from "./App.jsx";

export function rendre() {
  return renderToString(<App />);
}
