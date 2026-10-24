// Génère src/lucide-react.js : un module qui reproduit l'API de lucide-react
// (<Mail size={16} strokeWidth={1.75} />) à partir des tracés Lucide fournis
// par react-icons (jeu « lu »). Le code de la page importe donc "lucide-react"
// exactement comme dans un projet React classique.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Lancer avec « npm run icones » après avoir ajouté un nom à la liste ci-dessous.
const ICI = path.dirname(fileURLToPath(import.meta.url));
const DOSSIERS = [process.env.MODULES, path.join(ICI, "..", "node_modules")].filter(Boolean);
const REACT_ICONS = DOSSIERS.map((d) => path.join(d, "react-icons")).find((d) => existsSync(path.join(d, "package.json")));
if (!REACT_ICONS) throw new Error("Paquet introuvable : react-icons. Lancez d'abord « npm install ».");
const SOURCE = path.join(REACT_ICONS, "lu/index.mjs");
const ICONES = [
  "ArrowRight", "ArrowUp", "ArrowUpRight", "Briefcase", "CalendarDays", "Car", "Check",
  "ChevronDown", "CodeXml", "Copy", "Database", "Download", "FileDown", "FolderGit2",
  "Github", "GraduationCap", "Languages", "Linkedin", "Mail", "MapPin", "Menu", "Monitor",
  "Network", "Phone", "ScanSearch", "Sigma", "SquareFunction", "Users", "Wrench", "X",
];

const texte = readFileSync(SOURCE, "utf8");
const version = JSON.parse(readFileSync(path.join(REACT_ICONS, "package.json"), "utf8")).version;

function noeuds(nom) {
  const debut = texte.indexOf(`export function Lu${nom} (props)`);
  if (debut < 0) throw new Error(`Icône introuvable : ${nom}`);
  const appel = texte.indexOf("GenIcon(", debut) + "GenIcon(".length;
  const fin = texte.indexOf(")(props)", appel);
  const arbre = JSON.parse(texte.slice(appel, fin));
  return arbre.child.map((c) => [c.tag, c.attr]);
}

const lignes = ICONES.map((nom) => `export const ${nom} = createLucideIcon("${nom}", ${JSON.stringify(noeuds(nom))});`);

const module = `// Fichier généré par scripts/generer-icones.mjs : ne pas modifier à la main.
// Icônes Lucide (https://lucide.dev, licence ISC), tracés repris de react-icons ${version}.
import { createElement, forwardRef } from "react";

const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([a-zA-Z])([0-9])/g, "$1-$2").toLowerCase();

function createLucideIcon(nom, enfants) {
  const Icone = forwardRef(function Icone(
    { color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth = false, className = "", ...reste },
    ref
  ) {
    const trait = absoluteStrokeWidth ? (Number(strokeWidth) * 24) / Number(size) : strokeWidth;
    return createElement(
      "svg",
      {
        ref,
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth: trait,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: ["lucide", "lucide-" + kebab(nom), className].filter(Boolean).join(" "),
        "aria-hidden": reste["aria-label"] ? undefined : true,
        focusable: "false",
        ...reste,
      },
      enfants.map(([balise, attributs], i) => createElement(balise, { key: i, ...attributs }))
    );
  });
  Icone.displayName = nom;
  return Icone;
}

${lignes.join("\n")}
`;

writeFileSync(new URL("../src/lucide-react.js", import.meta.url), module);
console.log(`${ICONES.length} icônes écrites dans src/lucide-react.js`);
