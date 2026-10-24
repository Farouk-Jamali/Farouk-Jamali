import { useEffect, useId, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Briefcase,
  CalendarDays,
  Check,
  ChevronDown,
  CodeXml,
  Copy,
  Database,
  FolderGit2,
  Github,
  GraduationCap,
  Languages,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Phone,
  ScanSearch,
  Sigma,
  SquareFunction,
  Users,
  Wrench,
  X,
} from "lucide-react";
import {
  autresExperiences,
  competences,
  experiencePrincipale,
  formation,
  langues,
  profil,
  projets,
  vieAssociative,
} from "./donnees.js";
import { PHOTO } from "./photo.js";

const ICONES = { Sigma, ScanSearch, SquareFunction, Database, CodeXml, Monitor };

const NAVIGATION = [
  { id: "formation", libelle: "Formation" },
  { id: "experience", libelle: "Expérience" },
  { id: "competences", libelle: "Compétences" },
  { id: "projets", libelle: "Projets" },
];
const SECTIONS = ["formation", "experience", "competences", "projets", "langues", "contact"];

const cx = (...classes) => classes.filter(Boolean).join(" ");

/* ------------------------------------------------------------------ */
/* Comportements de la page                                            */
/* ------------------------------------------------------------------ */

function mouvementReduit() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function allerA(cible) {
  if (cible.id === "profil") window.scrollTo({ top: 0, behavior: mouvementReduit() ? "auto" : "smooth" });
  else cible.scrollIntoView({ behavior: mouvementReduit() ? "auto" : "smooth", block: "start" });
  const titre = cible.matches("main") ? cible : cible.querySelector("h1, h2");
  if (titre) titre.focus({ preventScroll: true });
}

// Liens internes : défilement doux, sans toucher à l'adresse de la page.
function useNavigationInterne() {
  useEffect(() => {
    const auClic = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const lien = e.target.closest && e.target.closest('a[href^="#"]');
      if (!lien) return;
      const cible = document.getElementById(lien.getAttribute("href").slice(1));
      if (!cible) return;
      e.preventDefault();
      allerA(cible);
    };
    document.addEventListener("click", auClic);
    return () => document.removeEventListener("click", auClic);
  }, []);
}

// Lien partagé avec une ancre (#projets…) : on s'y place à l'ouverture.
function useAncreInitiale() {
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const cible = id && /^[\w-]+$/.test(id) ? document.getElementById(id) : null;
    if (cible) cible.scrollIntoView({ block: "start" });
  }, []);
}

// Section en cours de lecture, pour la navigation.
function useSectionActive() {
  const [actif, setActif] = useState(null);
  useEffect(() => {
    let image = 0;
    const calculer = () => {
      image = 0;
      const ligne = window.innerHeight * 0.32;
      let courant = null;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ligne) courant = id;
      }
      const enBas = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (enBas && window.scrollY > 0) courant = SECTIONS[SECTIONS.length - 1];
      setActif((a) => (a === courant ? a : courant));
    };
    const planifier = () => {
      if (!image) image = requestAnimationFrame(calculer);
    };
    calculer();
    window.addEventListener("scroll", planifier, { passive: true });
    window.addEventListener("resize", planifier);
    return () => {
      window.removeEventListener("scroll", planifier);
      window.removeEventListener("resize", planifier);
      cancelAnimationFrame(image);
    };
  }, []);
  return actif;
}

// Apparition douce des blocs au défilement. Le HTML est complet au chargement :
// seuls les blocs situés plus bas dans la page sont masqués, puis révélés
// quand on y arrive. Rien ne bouge sans action du visiteur.
function useApparitions() {
  useEffect(() => {
    if (mouvementReduit() || !("IntersectionObserver" in window)) return;
    const hauteur = window.innerHeight;
    const observateur = new IntersectionObserver(
      (entrees) => {
        for (const entree of entrees) {
          if (!entree.isIntersecting) continue;
          entree.target.dataset.reveal = "visible";
          observateur.unobserve(entree.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.01 }
    );
    for (const el of document.querySelectorAll("[data-reveal]")) {
      const r = el.getBoundingClientRect();
      if (r.top < hauteur * 0.94) continue; // déjà à l'écran ou au-dessus
      el.style.transition = "none";
      el.dataset.reveal = "masque";
      void el.offsetHeight;
      el.style.transition = "";
      observateur.observe(el);
    }
    return () => observateur.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ */
/* Briques                                                             */
/* ------------------------------------------------------------------ */

function Conteneur({ className, children }) {
  return <div className={cx("mx-auto w-full max-w-[1040px] gouttiere", className)}>{children}</div>;
}

function Revele({ delai = 0, className, children }) {
  return (
    <div data-reveal="" className={className} style={delai ? { "--reveal-delay": `${delai}ms` } : undefined}>
      {children}
    </div>
  );
}

function Tag({ petit = false, children }) {
  return (
    <li
      className={cx(
        "inline-flex items-center rounded-md border border-line bg-surface font-medium text-body",
        "transition-[color,background-color,border-color,transform] duration-200 ease-douce",
        "hover:-translate-y-px hover:border-accent-line hover:bg-accent-soft hover:text-accent",
        petit ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-[13px]"
      )}
    >
      {children}
    </li>
  );
}

function Pastille({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-accent-soft px-2 py-0.5 text-xs font-medium text-accent">
      {children}
    </span>
  );
}

function EnteteElement({ titre, periode, etat, grand = false }) {
  return (
    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <h3 className={cx("min-w-0 font-semibold tracking-[-0.01em] text-ink", grand ? "text-[17px]" : "text-base")}>
        {titre}
      </h3>
      <p className="flex shrink-0 items-center gap-2 text-sm text-muted tabular-nums">
        {etat && <Pastille>{etat}</Pastille>}
        <span>{periode}</span>
      </p>
    </div>
  );
}

function Puces({ elements, className }) {
  return (
    <ul className={cx("space-y-2 text-[15px] leading-relaxed text-body", className)}>
      {elements.map((element) => (
        <li key={element} className="flex gap-3">
          <span aria-hidden="true" className="mt-[0.68em] size-1 shrink-0 rounded-full bg-muted/70" />
          <span className="min-w-0">{element}</span>
        </li>
      ))}
    </ul>
  );
}

function Copiable({ valeur, libelle, lien }) {
  const [etat, setEtat] = useState("repos"); // repos | copie | selection
  const texte = useRef(null);
  const minuteur = useRef(0);
  useEffect(() => () => clearTimeout(minuteur.current), []);

  const terminer = (nouvel) => {
    setEtat(nouvel);
    clearTimeout(minuteur.current);
    minuteur.current = setTimeout(() => setEtat("repos"), 1800);
  };
  const selectionner = () => {
    const plage = document.createRange();
    plage.selectNodeContents(texte.current);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(plage);
    terminer("selection");
  };
  const copier = () => {
    const brut = valeur.replace(/[  ]/g, " ");
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(brut).then(() => terminer("copie"), selectionner);
      } else selectionner();
    } catch {
      selectionner();
    }
  };

  const Valeur = lien ? "a" : "span";
  return (
    <span className="flex min-w-0 items-center justify-between gap-2">
      <Valeur
        ref={texte}
        {...(lien ? { href: lien } : {})}
        className={cx("min-w-0 [overflow-wrap:anywhere]", lien && "transition-colors duration-200 hover:text-accent")}
      >
        {valeur}
      </Valeur>
      <button
        type="button"
        onClick={copier}
        aria-label={`Copier ${libelle}`}
        className="relative grid size-8 shrink-0 place-items-center rounded-md text-muted transition-colors duration-200 hover:bg-fill hover:text-ink"
      >
        {etat === "copie" ? (
          <Check size={15} strokeWidth={2} className="text-accent" />
        ) : (
          <Copy size={15} strokeWidth={1.75} />
        )}
        <span aria-hidden="true" className={cx("bulle", etat !== "repos" && "bulle-visible")}>
          {etat === "selection" ? "Sélectionné" : "Copié"}
        </span>
      </button>
      <span role="status" className="sr-only">
        {etat === "copie" ? "Copié dans le presse-papiers" : etat === "selection" ? "Texte sélectionné" : ""}
      </span>
    </span>
  );
}

function Deroulant({ titre, children }) {
  const [ouvert, setOuvert] = useState(false);
  const id = useId();
  return (
    <div className="mt-4">
      <button
        type="button"
        aria-expanded={ouvert}
        aria-controls={id}
        onClick={() => setOuvert((o) => !o)}
        className="inline-flex items-center gap-1 rounded-md text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-strong"
      >
        {titre}
        <ChevronDown
          size={16}
          strokeWidth={1.75}
          className={cx("transition-transform duration-300 ease-douce", ouvert && "rotate-180")}
        />
      </button>
      <div id={id} className="repli" data-ouvert={ouvert ? "oui" : "non"} inert={!ouvert}>
        <div>{children}</div>
      </div>
    </div>
  );
}

function Section({ id, titre, Icone, children }) {
  return (
    <section id={id} aria-labelledby={`titre-${id}`} className="border-t border-line py-16 sm:py-20">
      <Conteneur className="grid gap-8 md:grid-cols-[176px_minmax(0,1fr)] md:gap-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
        <div className="self-start md:sticky md:top-24">
          <Revele>
            <h2
              id={`titre-${id}`}
              tabIndex={-1}
              className="flex items-start gap-2.5 text-xl font-semibold tracking-[-0.015em] text-ink focus:outline-none"
            >
              <Icone size={19} strokeWidth={1.75} className="mt-[3px] shrink-0 text-accent" />
              <span>{titre}</span>
            </h2>
          </Revele>
        </div>
        <div className="min-w-0">{children}</div>
      </Conteneur>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* En-tête                                                             */
/* ------------------------------------------------------------------ */

function Entete({ actif }) {
  const [ouvert, setOuvert] = useState(false);
  const [defile, setDefile] = useState(false);
  const [indicateur, setIndicateur] = useState({ x: 0, largeur: 0, visible: false });
  const nav = useRef(null);
  const liens = useRef({});
  const bouton = useRef(null);

  useEffect(() => {
    const maj = () => setDefile(window.scrollY > 8);
    maj();
    window.addEventListener("scroll", maj, { passive: true });
    return () => window.removeEventListener("scroll", maj);
  }, []);

  useEffect(() => {
    const placer = () => {
      const lien = liens.current[actif];
      if (!lien || !nav.current || !lien.offsetWidth) {
        setIndicateur((i) => (i.visible ? { ...i, visible: false } : i));
        return;
      }
      const a = lien.getBoundingClientRect();
      const b = nav.current.getBoundingClientRect();
      setIndicateur({ x: a.left - b.left + 12, largeur: a.width - 24, visible: true });
    };
    placer();
    window.addEventListener("resize", placer);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(placer);
    return () => window.removeEventListener("resize", placer);
  }, [actif]);

  useEffect(() => {
    if (!ouvert) return;
    const clavier = (e) => {
      if (e.key === "Escape") {
        setOuvert(false);
        bouton.current && bouton.current.focus();
      }
    };
    const largeur = window.matchMedia("(min-width: 768px)");
    const fermer = () => largeur.matches && setOuvert(false);
    const dehors = (e) => {
      if (!e.target.closest("header")) setOuvert(false);
    };
    document.addEventListener("keydown", clavier);
    document.addEventListener("pointerdown", dehors);
    largeur.addEventListener("change", fermer);
    return () => {
      document.removeEventListener("keydown", clavier);
      document.removeEventListener("pointerdown", dehors);
      largeur.removeEventListener("change", fermer);
    };
  }, [ouvert]);

  return (
    <header
      className={cx(
        "entete sticky z-50 border-b transition-[border-color] duration-300",
        defile || ouvert ? "border-line" : "border-transparent"
      )}
    >
      <Conteneur className="flex h-15 items-center justify-between gap-6">
        <a href="#profil" className="rounded-md text-[15px] font-semibold tracking-[-0.01em] text-ink">
          {profil.nom}
        </a>
        <div className="flex items-center gap-3 self-stretch">
          <nav ref={nav} aria-label="Sections" className="relative hidden self-stretch md:flex md:items-center">
            <ul className="flex items-center">
              {NAVIGATION.map((n) => (
                <li key={n.id}>
                  <a
                    ref={(el) => {
                      liens.current[n.id] = el;
                    }}
                    href={`#${n.id}`}
                    aria-current={actif === n.id ? "location" : undefined}
                    className={cx(
                      "block rounded-md px-3 py-2 text-sm transition-colors duration-200",
                      actif === n.id ? "text-ink" : "text-muted hover:text-ink"
                    )}
                  >
                    {n.libelle}
                  </a>
                </li>
              ))}
            </ul>
            <span
              aria-hidden="true"
              className="indicateur pointer-events-none absolute -bottom-px left-0 h-0.5 rounded-full bg-accent"
              style={{
                width: `${indicateur.largeur}px`,
                transform: `translateX(${indicateur.x}px)`,
                opacity: indicateur.visible ? 1 : 0,
              }}
            />
          </nav>
          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="inline-flex h-9 items-center rounded-lg bg-accent px-3.5 text-sm font-medium text-white shadow-bouton transition-colors duration-200 hover:bg-accent-strong"
            >
              Contact
            </a>
            <button
              ref={bouton}
              type="button"
              className="grid size-9 place-items-center rounded-lg text-ink transition-colors duration-200 hover:bg-fill md:hidden"
              aria-expanded={ouvert}
              aria-controls="menu-mobile"
              aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => setOuvert((o) => !o)}
            >
              {ouvert ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </Conteneur>

      <div id="menu-mobile" className={cx("menu-mobile md:hidden", ouvert && "menu-ouvert")} inert={!ouvert}>
        <Conteneur>
          <ul className="flex flex-col py-2">
            {NAVIGATION.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOuvert(false)}
                  className={cx(
                    "flex h-12 items-center justify-between border-b border-line text-[15px] transition-colors duration-200",
                    actif === n.id ? "font-medium text-ink" : "text-body"
                  )}
                >
                  {n.libelle}
                  {actif === n.id && <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#langues"
                onClick={() => setOuvert(false)}
                className={cx(
                  "flex h-12 items-center justify-between text-[15px] transition-colors duration-200",
                  actif === "langues" ? "font-medium text-ink" : "text-body"
                )}
              >
                Langues et vie associative
                {actif === "langues" && <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />}
              </a>
            </li>
          </ul>
        </Conteneur>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

function Profil() {
  return (
    <section id="profil" aria-labelledby="titre-profil" className="pt-8 pb-16 sm:pt-16 sm:pb-20">
      <Conteneur className="grid gap-10 md:grid-cols-[minmax(0,1fr)_280px] md:items-center md:gap-12 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-20">
        <div className="min-w-0">
          <h1
            id="titre-profil"
            tabIndex={-1}
            className="text-[2.125rem] leading-[1.1] font-semibold tracking-[-0.028em] text-ink focus:outline-none sm:text-[2.75rem]"
          >
            {profil.nom}
          </h1>
          <p className="mt-3 text-lg leading-snug text-balance text-secondaire sm:text-xl">{profil.accroche}</p>
          <div className="mt-6 max-w-[62ch] space-y-4 leading-[1.75] text-body">
            {profil.parcours.map((paragraphe) => (
              <p key={paragraphe.slice(0, 24)}>{paragraphe}</p>
            ))}
          </div>
          <p className="mt-6 flex max-w-[62ch] gap-3 leading-relaxed text-ink">
            <CalendarDays size={18} strokeWidth={1.75} className="mt-[3px] shrink-0 text-accent" />
            <span>{profil.recherche}</span>
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="group inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-medium text-white shadow-bouton transition-colors duration-200 hover:bg-accent-strong"
            >
              Me contacter
              <ArrowRight
                size={16}
                strokeWidth={1.75}
                className="transition-transform duration-200 ease-douce group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#projets"
              className="inline-flex h-10 items-center rounded-lg border border-line bg-surface px-4 text-sm font-medium text-ink transition-colors duration-200 hover:border-line-strong hover:bg-fill"
            >
              Voir les projets
            </a>
          </div>
        </div>
        <div className="order-first md:order-none">
          <img
            src={PHOTO}
            alt="Portrait de Farouk Jamali"
            width={1080}
            height={1440}
            fetchPriority="high"
            className="aspect-[3/4] w-full max-w-[420px] rounded-3xl bg-surface object-cover shadow-photo ring-1 ring-line md:max-w-none"
          />
        </div>
      </Conteneur>
    </section>
  );
}

function Formation() {
  return (
    <Section id="formation" titre="Formation" Icone={GraduationCap}>
      <ol className="divide-y divide-line">
        {formation.map((f, i) => (
          <li key={f.titre} className="py-6 first:pt-0 last:pb-0">
            <Revele delai={Math.min(i, 3) * 60}>
              <EnteteElement titre={f.titre} periode={f.periode} etat={f.etat} />
              <p className="mt-1 text-[15px] text-body">{f.lieu}</p>
              {f.detail && <p className="mt-0.5 text-[15px] text-muted">{f.detail}</p>}
              {f.programme && (
                <Deroulant titre={f.programme.titre}>
                  <ul className="flex flex-wrap gap-2 pt-3">
                    {f.programme.elements.map((e) => (
                      <Tag key={e}>{e}</Tag>
                    ))}
                  </ul>
                  <p className="pt-3 pb-1 text-sm text-muted">{f.programme.outils}</p>
                </Deroulant>
              )}
            </Revele>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function CarteExperience({ exp, principale = false }) {
  return (
    <article
      className={cx(
        "group h-full rounded-2xl border border-line bg-surface shadow-carte",
        "transition-[transform,box-shadow,border-color] duration-300 ease-douce",
        "hover:-translate-y-0.5 hover:border-line-strong hover:shadow-survol",
        principale ? "p-6 sm:p-7" : "p-5 sm:p-6"
      )}
    >
      <EnteteElement titre={exp.poste} periode={exp.periode} etat={exp.etat} grand={principale} />
      <p className="mt-1 text-[15px] text-body">
        <span className="font-medium text-ink transition-colors duration-300 group-hover:text-accent">
          {exp.entreprise}
        </span>
        <span className="text-muted"> · {exp.lieu}</span>
      </p>
      {exp.contexte && <p className="mt-0.5 text-sm text-muted">{exp.contexte}</p>}
      <Puces elements={exp.missions} className="mt-4" />
      {exp.tags && (
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Méthodes">
          {exp.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>
      )}
    </article>
  );
}

function Experience() {
  return (
    <Section id="experience" titre="Expérience" Icone={Briefcase}>
      <Revele>
        <CarteExperience exp={experiencePrincipale} principale />
      </Revele>
      <Revele>
        <h3 className="mt-12 text-sm font-medium text-muted">Autres expériences</h3>
      </Revele>
      <div className="mt-4 grid gap-4">
        {autresExperiences.map((e, i) => (
          <Revele key={e.entreprise} delai={i * 70}>
            <CarteExperience exp={e} />
          </Revele>
        ))}
      </div>
    </Section>
  );
}

function Competences() {
  return (
    <Section id="competences" titre="Compétences techniques" Icone={Wrench}>
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {competences.map((g, i) => {
          const Icone = ICONES[g.icone];
          return (
            <Revele key={g.titre} delai={(i % 2) * 70}>
              <div className="border-t border-line pt-5">
                <h3 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                  <Icone size={16} strokeWidth={1.75} className="shrink-0 text-accent" />
                  {g.titre}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {g.elements.map((e) => (
                    <Tag key={e}>{e}</Tag>
                  ))}
                </ul>
                {g.sous && (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-muted">{g.sous.titre}</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {g.sous.elements.map((e) => (
                        <Tag key={e} petit>
                          {e}
                        </Tag>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Revele>
          );
        })}
      </div>
    </Section>
  );
}

function CarteProjet({ projet }) {
  return (
    <article
      className={cx(
        "group rounded-2xl border border-line bg-surface shadow-carte",
        "transition-[transform,box-shadow,border-color] duration-300 ease-douce",
        "hover:-translate-y-0.5 hover:border-line-strong hover:shadow-survol"
      )}
    >
      <div className="p-6 sm:p-8">
        <p className="text-sm text-muted">
          {projet.cadre} · {projet.periode}
        </p>
        <h3 className="mt-2 text-xl leading-snug font-semibold tracking-[-0.015em] text-ink">{projet.titre}</h3>
        <p className="mt-3 max-w-[64ch] text-[15px] leading-relaxed text-body">{projet.resume}</p>
        <div className="mt-6 border-t border-line pt-6">
          <p className="text-sm font-medium text-muted">Démarche</p>
          <ol className="mt-4 grid gap-5 md:grid-cols-2 md:gap-8">
            {projet.etapes.map((etape, i) => (
              <li key={etape.titre} className="grid grid-cols-[24px_minmax(0,1fr)] gap-x-3">
                <span
                  aria-hidden="true"
                  className="grid size-6 place-items-center rounded-full bg-accent-soft text-xs font-semibold text-accent tabular-nums"
                >
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] leading-6 font-medium text-ink">{etape.titre}</p>
                  <p className="mt-1 text-[15px] leading-relaxed text-body">{etape.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="Méthodes">
          {projet.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </ul>
      </div>
      {projet.liens.length > 0 && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-line px-6 py-4 sm:px-8">
          {projet.liens.map((l) => (
            <a
              key={l.url}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group/lien inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors duration-200 hover:text-accent-strong"
            >
              {l.texte}
              <ArrowUpRight
                size={15}
                strokeWidth={1.75}
                className="transition-transform duration-200 ease-douce group-hover/lien:translate-x-0.5 group-hover/lien:-translate-y-0.5"
              />
            </a>
          ))}
        </div>
      )}
    </article>
  );
}

function Projets() {
  return (
    <Section id="projets" titre="Projets" Icone={FolderGit2}>
      <div className="grid gap-4">
        {projets.map((p, i) => (
          <Revele key={p.titre} delai={i * 80}>
            <CarteProjet projet={p} />
          </Revele>
        ))}
      </div>
      <Revele>
        <p className="mt-6 text-sm text-muted">D’autres projets du master viendront s’ajouter au cours de l’année.</p>
      </Revele>
    </Section>
  );
}

function LanguesEtAssociation() {
  return (
    <Section id="langues" titre="Langues et vie associative" Icone={Languages}>
      <div className="grid gap-10 sm:grid-cols-2">
        <Revele>
          <h3 className="text-sm font-medium text-muted">Langues</h3>
          <dl className="mt-3 border-t border-line">
            {langues.map((l) => (
              <div key={l.langue} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                <dt className="font-medium text-ink">{l.langue}</dt>
                <dd className="text-right text-sm text-muted">
                  <span className="font-semibold text-ink">{l.niveau}</span> · {l.detail}
                </dd>
              </div>
            ))}
          </dl>
        </Revele>
        <Revele delai={70}>
          <h3 className="text-sm font-medium text-muted">Vie associative</h3>
          <div className="mt-3 border-t border-line pt-3">
            <p className="flex items-start gap-2 font-medium text-ink">
              <Users size={16} strokeWidth={1.75} className="mt-[3px] shrink-0 text-accent" />
              <span>{vieAssociative.titre}</span>
            </p>
            <p className="mt-1 pl-6 text-sm text-muted tabular-nums">
              {vieAssociative.lieu} · {vieAssociative.periode}
            </p>
            <p className="mt-2 pl-6 text-[15px] text-body">{vieAssociative.texte}</p>
          </div>
        </Revele>
      </div>
    </Section>
  );
}

function CarteContact({ Icone, libelle, valeur, lien, libelleCopie }) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-carte transition-[border-color,box-shadow] duration-300 ease-douce hover:border-line-strong hover:shadow-survol">
      <p className="flex items-center gap-2 text-sm text-muted">
        <Icone size={15} strokeWidth={1.75} className="text-accent" />
        {libelle}
      </p>
      <div className="mt-2 text-[15px] font-medium text-ink">
        <Copiable valeur={valeur} lien={lien} libelle={libelleCopie} />
      </div>
    </div>
  );
}

function Contact() {
  const reseaux = [
    profil.linkedin && { libelle: "LinkedIn", url: profil.linkedin, Icone: Linkedin },
    profil.github && { libelle: "GitHub", url: profil.github, Icone: Github },
  ].filter(Boolean);
  return (
    <Section id="contact" titre="Contact" Icone={Mail}>
      <Revele>
        <p className="max-w-[54ch] text-lg leading-relaxed text-ink">
          Pour un stage à partir de mai 2027 ou une alternance en 2027–2028, le plus simple est de m’écrire. Vous pouvez
          aussi m’appeler.
        </p>
      </Revele>
      <Revele delai={70}>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <CarteContact
            Icone={Mail}
            libelle="E-mail"
            valeur={profil.email}
            lien={`mailto:${profil.email}`}
            libelleCopie="l’adresse e-mail"
          />
          <CarteContact
            Icone={Phone}
            libelle="Téléphone"
            valeur={profil.telephone}
            lien={`tel:${profil.lienTelephone}`}
            libelleCopie="le numéro de téléphone"
          />
        </div>
      </Revele>
      <Revele delai={140}>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-muted">
            <MapPin size={15} strokeWidth={1.75} className="shrink-0 text-accent" />
            {profil.ville} · {profil.permis}
          </p>
          {reseaux.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {reseaux.map((r) => (
                <li key={r.libelle}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-9 items-center gap-2 rounded-lg border border-line bg-surface px-3 text-sm font-medium text-ink transition-colors duration-200 hover:border-line-strong hover:bg-fill"
                  >
                    <r.Icone size={15} strokeWidth={1.75} className="text-muted" />
                    {r.libelle}
                    <ArrowUpRight
                      size={14}
                      strokeWidth={1.75}
                      className="text-muted transition-transform duration-200 ease-douce group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Revele>
    </Section>
  );
}

function Pied() {
  return (
    <footer className="border-t border-line py-8">
      <Conteneur className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {profil.nom} · Rennes · Mis à jour en {profil.miseAJour}
        </p>
        <a
          href="#profil"
          className="group inline-flex items-center gap-1.5 self-start rounded-md transition-colors duration-200 hover:text-ink sm:self-auto"
        >
          Haut de page
          <ArrowUp
            size={14}
            strokeWidth={1.75}
            className="transition-transform duration-200 ease-douce group-hover:-translate-y-0.5"
          />
        </a>
      </Conteneur>
    </footer>
  );
}

export default function App() {
  useAncreInitiale();
  useApparitions();
  useNavigationInterne();
  const actif = useSectionActive();
  return (
    <>
      <a href="#contenu" className="lien-evitement">
        Aller au contenu
      </a>
      <Entete actif={actif} />
      <main id="contenu" tabIndex={-1} className="focus:outline-none">
        <Profil />
        <Formation />
        <Experience />
        <Competences />
        <Projets />
        <LanguesEtAssociation />
        <Contact />
      </main>
      <Pied />
    </>
  );
}
