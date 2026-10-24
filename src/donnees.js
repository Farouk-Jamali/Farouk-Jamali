// Contenu du CV, repris des deux CV (stage et alternance). Tout ce qui s'affiche
// sur la page vient de ce fichier : pour corriger une date ou ajouter un projet,
// c'est ici.

// Typographie française : espace insécable avant « : », espace fine insécable
// avant « ; ? ! », espaces insécables dans les numéros de téléphone.
function typo(texte) {
  return texte
    .replace(/'/g, "’")
    .replace(/data science/g, "data\u00a0science")
    .replace(/machine learning/g, "machine\u00a0learning")
    .replace(/ ([:])/g, " $1")
    .replace(/ ([;?!])/g, " $1")
    .replace(/(\d{2}) (?=\d{2}\b)/g, "$1 ")
    .replace(/(\d) – (\d)/g, "$1 – $2");
}
function corriger(valeur) {
  if (typeof valeur === "string") return typo(valeur);
  if (Array.isArray(valeur)) return valeur.map(corriger);
  if (valeur && typeof valeur === "object") {
    const copie = {};
    for (const [cle, v] of Object.entries(valeur)) {
      // Les adresses et liens ne passent pas par la typographie.
      copie[cle] = ["email", "url", "lienTelephone", "fichier", "chemin"].includes(cle) ? v : corriger(v);
    }
    return copie;
  }
  return valeur;
}

export const profil = corriger({
  nom: "Farouk Jamali",
  accroche: "Étudiant en science\u00a0des\u00a0données à l'Université Rennes\u00a02.",
  parcours: [
    "Passionné par les mathématiques depuis mon plus jeune âge, j'ai d'abord suivi une licence de mathématiques appliquées à Fès, centrée sur les fondamentaux de la discipline : théorie de la mesure, topologie générale, calcul différentiel, analyse numérique et science des données.",
    "J'ai ensuite entamé une nouvelle licence à Rennes, directement en troisième année, dans un parcours beaucoup plus appliqué, Mathématiques et interactions. En y rencontrant la science des données pour la deuxième fois, j'en suis tombé amoureux. D'où mon master de statistique, parcours science des données et intelligence artificielle, où j'accumule de jour en jour des connaissances qui me seront utiles dans le monde professionnel.",
  ],
  recherche:
    "Je recherche un stage de 2 à 4 mois à partir de mai 2027, puis une alternance pour l'année 2027–2028, en data science : préparation des données, modélisation statistique et machine learning.",
  ville: "Rennes",
  permis: "Permis B",
  email: "faroukjamali83@gmail.com",
  telephone: "07 51 29 30 74",
  lienTelephone: "+33751293074",
  // À compléter : les liens apparaîtront automatiquement dans la section Contact.
  linkedin: "",
  github: "",
  miseAJour: "octobre 2026",
});

export const langues = corriger([
  { langue: "Français", niveau: "C1", detail: "Courant, DALF" },
  { langue: "Anglais", niveau: "C1", detail: "Courant, EF SET" },
]);

export const formation = corriger([
  {
    titre: "Master Mathématiques appliquées, statistique (MAS)",
    periode: "2026 – 2028",
    etat: "M1 en cours",
    lieu: "Université Rennes 2",
    detail: "Parcours Science des données, intelligence artificielle",
    programme: {
      titre: "Programme du M1",
      elements: [
        "Modèle linéaire et ANOVA",
        "Statistique inférentielle",
        "Analyse factorielle",
        "Apprentissage supervisé",
        "Apprentissage non supervisé",
        "Modèle logistique",
        "Séries temporelles",
        "Visualisation de données",
      ],
      outils: "Logiciels : R, Python, SAS et SQL.",
    },
  },
  {
    titre: "Magistère Statistique et modélisation économique",
    periode: "2026 – 2028",
    etat: "M1 en cours",
    lieu: "Université de Rennes et Université Rennes 2",
    detail: "Double diplomation avec le master MAS",
  },
  {
    titre: "Licence de mathématiques, parcours Mathématiques et interactions",
    periode: "2025 – 2026",
    lieu: "Université de Rennes",
    detail: "Obtenue en mai 2026",
  },
  {
    titre: "Licence de mathématiques appliquées, de la L1 à la L3",
    periode: "2021 – 2025",
    lieu: "Université Sidi Mohamed Ben Abdellah, Fès, Maroc",
  },
  {
    titre: "Baccalauréat scientifique, option mathématiques",
    periode: "2021",
    lieu: "Lycée Abdelkrim Rais, Fès, Maroc",
  },
]);

export const experiencePrincipale = corriger({
  poste: "Stage en analyse de données",
  entreprise: "AjiwExplore",
  lieu: "Fès, Maroc",
  periode: "Juillet – août 2025",
  contexte: "Entreprise de services touristiques",
  missions: [
    "Exploration et nettoyage de données bruitées pour les rendre exploitables",
    "ACP, AFCM, classification et régression, puis interprétation des résultats",
    "Création d'un dashboard et présentation des résultats à l'équipe",
  ],
  tags: ["Nettoyage de données", "ACP", "AFCM", "Classification", "Régression", "Dashboard"],
});

export const autresExperiences = corriger([
  {
    poste: "Vendeur et négociateur",
    entreprise: "IBHAR",
    lieu: "Fès, Maroc",
    periode: "Février – août 2025",
    contexte: "Anciennement DEVER, services informatiques pour les entreprises et les commerces locaux",
    missions: [
      "Visites de magasins et d'entreprises pour proposer nos services",
      "Négociation des tarifs et des horaires, rédaction des cahiers des charges",
      "Compte rendu des rendez-vous à l'équipe et explication détaillée des besoins",
    ],
  },
  {
    poste: "Inventoriste",
    entreprise: "RGIS",
    lieu: "Rennes",
    periode: "Depuis 2024",
    etat: "En cours",
    missions: ["Comptage de stocks en horaires décalés, avec précision et rapidité"],
  },
]);

// icone : nom d'une icône exportée par src/lucide-react.js
export const competences = corriger([
  {
    titre: "Statistique",
    icone: "Sigma",
    elements: ["Statistiques descriptives", "Tests statistiques", "Statistique inférentielle"],
  },
  {
    titre: "Analyse de données",
    icone: "ScanSearch",
    elements: ["ACP", "AFCM", "Clustering"],
  },
  {
    titre: "Modélisation et machine learning",
    icone: "SquareFunction",
    elements: ["Régression linéaire", "Modèles non linéaires", "Classification", "Forêt aléatoire", "Réseau de neurones"],
  },
  {
    titre: "Données",
    icone: "Database",
    elements: ["Gestion de bases de données", "Nettoyage de données", "Visualisation de données", "Power BI"],
  },
  {
    titre: "Langages",
    icone: "CodeXml",
    elements: ["R", "Python", "SAS", "SQL", "C", "MATLAB", "LaTeX"],
    sous: { titre: "Bibliothèques Python", elements: ["pandas", "NumPy", "scikit-learn", "Matplotlib"] },
  },
  {
    titre: "Web et systèmes",
    icone: "Monitor",
    elements: ["HTML", "CSS", "JavaScript", "Windows", "Linux (Debian, Fedora)", "macOS"],
  },
]);

// Pour ajouter un projet : copier l'objet ci-dessous, le placer en tête de liste
// et le remplir. liens : [{ texte: "Code sur GitHub", url: "https://github.com/..." }]
export const projets = corriger([
  {
    titre: "Prédiction de la mortalité sur données cliniques",
    cadre: "Projet universitaire",
    periode: "Mars 2026",
    resume:
      "Prédire la mortalité de patients à partir de leurs données cliniques, un jeu de données où se mêlent variables qualitatives et quantitatives.",
    etapes: [
      {
        titre: "Apprentissage non supervisé",
        texte: "AFCM, vu le mélange de variables qualitatives et quantitatives dans le jeu de données.",
      },
      {
        titre: "Apprentissage supervisé",
        texte: "Forêt aléatoire et réseau de neurones pour prédire la mortalité.",
      },
    ],
    tags: ["AFCM", "Forêt aléatoire", "Réseau de neurones"],
    liens: [],
  },
]);

export const vieAssociative = corriger({
  titre: "Association informatique de l'Université Sidi Mohamed Ben Abdellah",
  lieu: "Fès, Maroc",
  periode: "2022 – 2024",
  texte: "Ateliers de programmation et participation à des hackathons.",
});
