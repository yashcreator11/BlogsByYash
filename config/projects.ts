import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "wmind",
    name: "wMind — Manufacturing Intelligence Platform",
    description:
      "Distributed microservice platform bridging industrial field devices to real-time analytics and AI-powered root cause analysis. Spans Device Service, ESP32 firmware, React frontend, and an LLaMA + Qdrant RAG module.",
    techStack: ["ASP.NET Core", "React", "RabbitMQ", "InfluxDB", "Qdrant", "LLaMA", "Docker", "OpenTelemetry", "ESP32"],
    githubUrl: "https://github.com/varad1777/wMind",
    featured: true,
  },
  {
    id: "devops-dashboard",
    name: "DevOps Dashboard v2",
    description:
      "Real-time Kubernetes observability and control panel — live pod management, replica scaling, HPA visibility, and cluster event streaming. Built by auditing a broken v1 and fixing 14 production-class bugs.",
    techStack: ["Python", "Flask", "Kubernetes", "Docker", "Redis"],
    githubUrl: "https://github.com/yashkhandagale-dotcom/DockerDashboardV2",
  },
  {
    id: "esp32-firmware",
    name: "ESP32 Layered Firmware",
    description:
      "Production-ready C++ firmware for an ESP32 industrial edge gateway — dual Modbus protocols simultaneously, OPC-UA discovery, OTA updates, and live sensor streaming.",
    techStack: ["C++", "ESP32", "PlatformIO", "ModbusTCP", "ModbusRTU", "OPC-UA"],
    githubUrl: "https://github.com/yashkhandagale-dotcom/ESP32_LAYERED_FIRMWARE",
  },
  {
    id: "ai-resume-screening",
    name: "AI Resume Screening",
    description:
      "Role-based platform where companies post jobs and candidates upload PDF resumes. Flask microservice computes NLP match scores with separate company and candidate dashboards.",
    techStack: ["React", "Flask", "MongoDB", "PyPDF2", "NLP"],
  },
  {
    id: "k8s-cicd",
    name: "K8s CI/CD Pipeline",
    description:
      "Helm-managed Kubernetes cluster with GitHub Actions CI/CD, NGINX Ingress path-based routing, and HPA auto-scaling — full GitOps workflow on a local cluster.",
    techStack: ["Kubernetes", "Helm", "GitHub Actions", "Docker", "NGINX"],
  },
  {
    id: "credit-risk",
    name: "Credit Risk Analysis",
    description:
      "XGBoost model predicting loan default with 86% ROC-AUC, using SMOTE for class imbalance handling and advanced feature engineering on financial datasets.",
    techStack: ["Python", "XGBoost", "SMOTE", "Scikit-learn"],
  },
];

export const allTechStacks = Array.from(
  new Set(projects.flatMap((p) => p.techStack))
).sort();
