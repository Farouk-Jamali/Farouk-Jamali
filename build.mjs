// Construction du site : npm run build
//
// Produit le dossier docs/, publié tel quel par GitHub Pages :
//   docs/index.html            page complète, HTML pré-rendu par React
//   docs/assets/styles.css     CSS Tailwind (seulement les classes utilisées)
//   docs/assets/app.js         React, qui reprend la main sur le HTML pré-rendu
//   docs/assets/portrait.webp  photo
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ICI = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(ICI, "src");
const PUBLIC = path.join(ICI, "public");
const DOCS = path.join(ICI, "docs");
const TEMP = path.join(ICI, ".construction");

// Dépendances : node_modules du projet, ou un autre dossier via la variable MODULES.
const DOSSIERS = [process.env.MODULES, path.join(ICI, "node_modules")].filter(Boolean);
function paquet(nom) {
  for (const dossier of DOSSIERS) {
    const chemin = path.join(dossier, nom);
    if (existsSync(path.join(chemin, "package.json"))) return chemin;
  }
  throw new Error(`Paquet introuvable : ${nom}. Lancez d'abord « npm install ».`);
}
const esbuild = require(paquet("esbuild"));
const TAILWIND = paquet("tailwindcss");
const { compile } = require(path.join(TAILWIND, "dist/lib.js"));

const TITRE = "Farouk Jamali";
const DESCRIPTION =
  "CV de Farouk Jamali, étudiant en master MAS à l’Université Rennes 2 : stage en data science à partir de mai 2027, alternance en 2027–2028.";
const POLICE = "https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400..700&display=swap";

mkdirSync(TEMP, { recursive: true });

/* ---------- CSS Tailwind v4 ---------- */
async function construireCss() {
  const chargerFeuille = async (id, base) => {
    let fichier;
    if (id === "tailwindcss") fichier = path.join(TAILWIND, "index.css");
    else if (id.startsWith("tailwindcss/")) fichier = path.join(TAILWIND, id.slice("tailwindcss/".length));
    else fichier = path.resolve(base, id);
    return { path: fichier, base: path.dirname(fichier), content: readFileSync(fichier, "utf8") };
  };
  const entree = path.join(SRC, "styles.css");
  const compilateur = await compile(readFileSync(entree, "utf8"), {
    base: SRC,
    from: entree,
    loadStylesheet: chargerFeuille,
    polyfills: 3,
  });
  // Les classes utilisées sont relevées dans le code, comme le fait le scanner de Tailwind.
  const sources = ["App.jsx", "donnees.js"].map((f) => readFileSync(path.join(SRC, f), "utf8")).join("\n");
  const candidats = [...new Set(sources.split(/[\s"'`{}<>;]+/).filter(Boolean))];
  const brut = compilateur.build(candidats);
  const { code } = await esbuild.transform(brut, {
    loader: "css",
    minify: true,
    target: ["chrome105", "safari15", "firefox110"],
  });
  return code.trim();
}

/* ---------- Pré-rendu et bundle React ---------- */
async function construireReact(cible, fichierPhoto) {
  const plugins = fichierPhoto
    ? [
        {
          name: "photo",
          setup(b) {
            b.onResolve({ filter: /^\.\/photo\.js$/ }, () => ({ path: fichierPhoto }));
          },
        },
      ]
    : [];
  const communs = {
    bundle: true,
    jsx: "automatic",
    define: { "process.env.NODE_ENV": '"production"' },
    // Les icônes Lucide viennent de src/lucide-react.js (généré par npm run icones).
    alias: { "lucide-react": path.join(SRC, "lucide-react.js") },
    nodePaths: DOSSIERS,
    charset: "utf8",
    logLevel: "warning",
    plugins,
  };
  const serveur = path.join(TEMP, `serveur-${cible}.cjs`);
  await esbuild.build({
    ...communs,
    entryPoints: [path.join(SRC, "serveur.jsx")],
    platform: "node",
    format: "cjs",
    outfile: serveur,
  });
  const html = require(serveur).rendre();
  const client = await esbuild.build({
    ...communs,
    entryPoints: [path.join(SRC, "client.jsx")],
    platform: "browser",
    format: "iife",
    minify: true,
    target: ["es2019"],
    legalComments: "eof",
    write: false,
  });
  return { html, js: client.outputFiles[0].text.trim() };
}

const ko = (n) => `${(n / 1024).toFixed(1)} Ko`;
const css = await construireCss();

/* ---------- docs/ : le site publié par GitHub Pages ---------- */
{
  const { html, js } = await construireReact("github");
  // Politique de sécurité : seuls les fichiers du site et la police Inter sont autorisés.
  const csp = [
    "default-src 'none'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src https://fonts.gstatic.com",
    "img-src 'self'",
    "base-uri 'none'",
    "form-action 'none'",
  ].join("; ");
  const page = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="${csp}">
<meta name="referrer" content="strict-origin-when-cross-origin">
<title>${TITRE}</title>
<meta name="description" content="${DESCRIPTION}">
<meta name="author" content="Farouk Jamali">
<meta name="color-scheme" content="light">
<meta name="theme-color" content="#f6f7f9">
<meta property="og:type" content="website">
<meta property="og:title" content="${TITRE}">
<meta property="og:description" content="${DESCRIPTION}">
<meta property="og:locale" content="fr_FR">
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${POLICE}">
<link rel="stylesheet" href="assets/styles.css">
<script src="assets/app.js" defer></script>
</head>
<body>
<div id="racine">${html}</div>
</body>
</html>
`;
  rmSync(DOCS, { recursive: true, force: true });
  mkdirSync(path.join(DOCS, "assets"), { recursive: true });
  writeFileSync(path.join(DOCS, "index.html"), page);
  writeFileSync(path.join(DOCS, "assets/styles.css"), css + "\n");
  writeFileSync(path.join(DOCS, "assets/app.js"), js + "\n");
  copyFileSync(path.join(PUBLIC, "portrait.webp"), path.join(DOCS, "assets/portrait.webp"));
  copyFileSync(path.join(PUBLIC, "favicon.svg"), path.join(DOCS, "assets/favicon.svg"));
  writeFileSync(path.join(DOCS, ".nojekyll"), "");
  console.log(`docs/ : HTML ${ko(Buffer.byteLength(page))} · CSS ${ko(css.length)} · JS ${ko(js.length)}`);
}
