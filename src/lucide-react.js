// Fichier généré par scripts/generer-icones.mjs : ne pas modifier à la main.
// Icônes Lucide (https://lucide.dev, licence ISC), tracés repris de react-icons 5.7.0.
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

export const ArrowRight = createLucideIcon("ArrowRight", [["path",{"d":"M5 12h14"}],["path",{"d":"m12 5 7 7-7 7"}]]);
export const ArrowUp = createLucideIcon("ArrowUp", [["path",{"d":"m5 12 7-7 7 7"}],["path",{"d":"M12 19V5"}]]);
export const ArrowUpRight = createLucideIcon("ArrowUpRight", [["path",{"d":"M7 7h10v10"}],["path",{"d":"M7 17 17 7"}]]);
export const Briefcase = createLucideIcon("Briefcase", [["path",{"d":"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"}],["rect",{"width":"20","height":"14","x":"2","y":"6","rx":"2"}]]);
export const CalendarDays = createLucideIcon("CalendarDays", [["path",{"d":"M8 2v4"}],["path",{"d":"M16 2v4"}],["rect",{"width":"18","height":"18","x":"3","y":"4","rx":"2"}],["path",{"d":"M3 10h18"}],["path",{"d":"M8 14h.01"}],["path",{"d":"M12 14h.01"}],["path",{"d":"M16 14h.01"}],["path",{"d":"M8 18h.01"}],["path",{"d":"M12 18h.01"}],["path",{"d":"M16 18h.01"}]]);
export const Car = createLucideIcon("Car", [["path",{"d":"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"}],["circle",{"cx":"7","cy":"17","r":"2"}],["path",{"d":"M9 17h6"}],["circle",{"cx":"17","cy":"17","r":"2"}]]);
export const Check = createLucideIcon("Check", [["path",{"d":"M20 6 9 17l-5-5"}]]);
export const ChevronDown = createLucideIcon("ChevronDown", [["path",{"d":"m6 9 6 6 6-6"}]]);
export const CodeXml = createLucideIcon("CodeXml", [["path",{"d":"m18 16 4-4-4-4"}],["path",{"d":"m6 8-4 4 4 4"}],["path",{"d":"m14.5 4-5 16"}]]);
export const Copy = createLucideIcon("Copy", [["rect",{"width":"14","height":"14","x":"8","y":"8","rx":"2","ry":"2"}],["path",{"d":"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}]]);
export const Database = createLucideIcon("Database", [["ellipse",{"cx":"12","cy":"5","rx":"9","ry":"3"}],["path",{"d":"M3 5V19A9 3 0 0 0 21 19V5"}],["path",{"d":"M3 12A9 3 0 0 0 21 12"}]]);
export const Download = createLucideIcon("Download", [["path",{"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["polyline",{"points":"7 10 12 15 17 10"}],["line",{"x1":"12","x2":"12","y1":"15","y2":"3"}]]);
export const FileDown = createLucideIcon("FileDown", [["path",{"d":"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"}],["path",{"d":"M14 2v4a2 2 0 0 0 2 2h4"}],["path",{"d":"M12 18v-6"}],["path",{"d":"m9 15 3 3 3-3"}]]);
export const FolderGit2 = createLucideIcon("FolderGit2", [["path",{"d":"M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"}],["circle",{"cx":"13","cy":"12","r":"2"}],["path",{"d":"M18 19c-2.8 0-5-2.2-5-5v8"}],["circle",{"cx":"20","cy":"19","r":"2"}]]);
export const Github = createLucideIcon("Github", [["path",{"d":"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"}],["path",{"d":"M9 18c-4.51 2-5-2-7-2"}]]);
export const GraduationCap = createLucideIcon("GraduationCap", [["path",{"d":"M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"}],["path",{"d":"M22 10v6"}],["path",{"d":"M6 12.5V16a6 3 0 0 0 12 0v-3.5"}]]);
export const Languages = createLucideIcon("Languages", [["path",{"d":"m5 8 6 6"}],["path",{"d":"m4 14 6-6 2-3"}],["path",{"d":"M2 5h12"}],["path",{"d":"M7 2h1"}],["path",{"d":"m22 22-5-10-5 10"}],["path",{"d":"M14 18h6"}]]);
export const Linkedin = createLucideIcon("Linkedin", [["path",{"d":"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}],["rect",{"width":"4","height":"12","x":"2","y":"9"}],["circle",{"cx":"4","cy":"4","r":"2"}]]);
export const Mail = createLucideIcon("Mail", [["rect",{"width":"20","height":"16","x":"2","y":"4","rx":"2"}],["path",{"d":"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"}]]);
export const MapPin = createLucideIcon("MapPin", [["path",{"d":"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"}],["circle",{"cx":"12","cy":"10","r":"3"}]]);
export const Menu = createLucideIcon("Menu", [["line",{"x1":"4","x2":"20","y1":"12","y2":"12"}],["line",{"x1":"4","x2":"20","y1":"6","y2":"6"}],["line",{"x1":"4","x2":"20","y1":"18","y2":"18"}]]);
export const Monitor = createLucideIcon("Monitor", [["rect",{"width":"20","height":"14","x":"2","y":"3","rx":"2"}],["line",{"x1":"8","x2":"16","y1":"21","y2":"21"}],["line",{"x1":"12","x2":"12","y1":"17","y2":"21"}]]);
export const Network = createLucideIcon("Network", [["rect",{"x":"16","y":"16","width":"6","height":"6","rx":"1"}],["rect",{"x":"2","y":"16","width":"6","height":"6","rx":"1"}],["rect",{"x":"9","y":"2","width":"6","height":"6","rx":"1"}],["path",{"d":"M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"}],["path",{"d":"M12 12V8"}]]);
export const Phone = createLucideIcon("Phone", [["path",{"d":"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"}]]);
export const ScanSearch = createLucideIcon("ScanSearch", [["path",{"d":"M3 7V5a2 2 0 0 1 2-2h2"}],["path",{"d":"M17 3h2a2 2 0 0 1 2 2v2"}],["path",{"d":"M21 17v2a2 2 0 0 1-2 2h-2"}],["path",{"d":"M7 21H5a2 2 0 0 1-2-2v-2"}],["circle",{"cx":"12","cy":"12","r":"3"}],["path",{"d":"m16 16-1.9-1.9"}]]);
export const Sigma = createLucideIcon("Sigma", [["path",{"d":"M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"}]]);
export const SquareFunction = createLucideIcon("SquareFunction", [["rect",{"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],["path",{"d":"M9 17c2 0 2.8-1 2.8-2.8V10c0-2 1-3.3 3.2-3"}],["path",{"d":"M9 11.2h5.7"}]]);
export const Users = createLucideIcon("Users", [["path",{"d":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],["circle",{"cx":"9","cy":"7","r":"4"}],["path",{"d":"M22 21v-2a4 4 0 0 0-3-3.87"}],["path",{"d":"M16 3.13a4 4 0 0 1 0 7.75"}]]);
export const Wrench = createLucideIcon("Wrench", [["path",{"d":"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"}]]);
export const X = createLucideIcon("X", [["path",{"d":"M18 6 6 18"}],["path",{"d":"m6 6 12 12"}]]);
