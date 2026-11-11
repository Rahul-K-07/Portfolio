export interface SkillCategory {
  id: string;
  category: string;
  code: string;
  description: string;
  skills: string[];
}

export const SKILL_GROUPS: SkillCategory[] = [
  {
    id: "ai-ml",
    category: "AI & MACHINE LEARNING",
    code: "MODULE // 01",
    description:
      "Statistical modeling, neural architectures, gradient boosted ensembles, and explainable AI pipelines.",
    skills: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Keras",
      "XGBoost",
      "CatBoost",
      "LightGBM",
      "TabNet",
    ],
  },
  {
    id: "web-dev",
    category: "WEB DEVELOPMENT",
    code: "MODULE // 02",
    description:
      "Modern full-stack web architectures, interactive interfaces, rapid API prototyping, and reactive state systems.",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Flask",
      "FastAPI",
      "Streamlit",
    ],
  },
  {
    id: "data-cloud",
    category: "DATA & CLOUD",
    code: "MODULE // 03",
    description:
      "Relational querying, geospatial raster analysis, earth observation pipelines, and scalable cloud compute.",
    skills: [
      "SQL",
      "MySQL",
      "PostgreSQL",
      "GCP",
      "AWS",
      "Google Earth Engine",
    ],
  },
  {
    id: "tools-systems",
    category: "TOOLS & SYSTEMS",
    code: "MODULE // 04",
    description:
      "Containerization, local LLM orchestration, embedded sensory runtime, OCR extraction, and Unix environments.",
    skills: ["Git", "Docker", "Ollama", "Linux", "PaddleOCR"],
  },
];
