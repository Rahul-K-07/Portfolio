export interface TimelineItem {
  id: string;
  type: "EXPERIENCE" | "EDUCATION";
  role: string;
  organization: string;
  location?: string;
  period: string;
  metrics?: string;
  description: string;
  skills?: string[];
}

export const TIMELINE: TimelineItem[] = [
  {
    id: "genzee-internship",
    type: "EXPERIENCE",
    role: "AI & Embedded Systems Intern",
    organization: "Genzee Technologies",
    location: "Ernakulam, Kerala",
    period: "JULY 2024",
    description:
      "Worked with Raspberry Pi applications, sensors, actuators, and Python-based embedded systems.",
    skills: ["Python", "Raspberry Pi", "Sensors & Actuators", "Embedded Systems"],
  },
  {
    id: "vidya-btech",
    type: "EDUCATION",
    role: "B.Tech — Artificial Intelligence & Machine Learning",
    organization: "Vidya Academy of Science and Technology",
    location: "Thrissur, Kerala",
    period: "2020 — 2024",
    metrics: "Consolidated CGPA: 8.89",
    description:
      "Specialized in machine learning algorithms, deep neural architectures, data analytics, and software engineering principles.",
    skills: ["Machine Learning", "Deep Learning", "Algorithms", "Linear Algebra", "Data Structures"],
  },
];
