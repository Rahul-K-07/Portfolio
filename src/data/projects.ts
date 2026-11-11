export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  features?: string[];
  image: string;
  secondaryImages?: string[];
  githubUrl?: string;
  liveUrl?: string;
  alignment: "left" | "right";
}

export const PROJECTS: Project[] = [
  {
    id: "agrointellect",
    number: "01",
    title: "AgroIntellect",
    category: "AI / Machine Learning / Agriculture",
    description:
      "An intelligent agricultural platform combining machine learning, remote sensing, weather information, and explainable predictions to support agricultural decision-making.",
    technologies: [
      "Python",
      "Scikit-learn",
      "Random Forest",
      "Google Earth Engine",
      "SHAP",
      "Flask / Next.js",
    ],
    features: [
      "Crop recommendation",
      "Remote sensing indices",
      "Agricultural intelligence",
      "District-level analysis",
      "Fertilizer recommendations",
      "Explainable machine learning",
    ],
    image: "/images/agrointellect/Screenshot 2025-10-07 034604.png",
    secondaryImages: [
      "/images/agrointellect/Screenshot 2025-10-05 214450.png",
      "/images/agrointellect/Screenshot 2025-10-07 030631.png",
    ],
    githubUrl: "https://github.com/Rahul-K-07",
    alignment: "left",
  },
  {
    id: "nicheatlas",
    number: "02",
    title: "NicheAtlas",
    category: "Data Visualization / Biodiversity",
    description:
      "An interactive platform for exploring plant traits, botanical characteristics, and biodiversity relationships.",
    technologies: [
      "Python",
      "Flask",
      "Pandas",
      "Scikit-learn",
      "Plotly",
      "PCA",
      "K-Means",
    ],
    features: [
      "Plant trait distributions",
      "Root and growth-form analysis",
      "PCA clustering",
      "Plant relationship networks",
      "Trait comparisons",
      "Interactive data exploration",
    ],
    image: "/images/nicheatlas/home.jpeg",
    secondaryImages: [
      "/images/nicheatlas/pred1.jpeg",
      "/images/nicheatlas/schemareco.jpeg",
    ],
    githubUrl: "https://github.com/Rahul-K-07",
    alignment: "right",
  },
  {
    id: "ecommerce",
    number: "03",
    title: "E-Commerce Development",
    category: "Web Development / E-commerce",
    description:
      "A commercial e-commerce experience involving storefront design, product presentation, and shopping functionality.",
    technologies: ["Shopify", "Liquid", "HTML", "CSS", "JavaScript"],
    features: [
      "Custom Shopify theme development",
      "Liquid templating & component architecture",
      "Curated product catalog & discovery",
      "Mobile-optimized checkout & shopping journey",
      "Dynamic responsive layouts",
    ],
    image: "/images/ecommerce-placeholder.svg",
    githubUrl: "https://github.com/Rahul-K-07",
    alignment: "left",
  },
];
