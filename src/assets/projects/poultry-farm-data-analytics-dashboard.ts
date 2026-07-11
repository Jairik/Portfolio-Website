import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "data analytics",
  about: [
    "This closed-source capstone turns a poultry client's litter-survey data into a repeatable view of farm performance. The dashboard helps nontechnical stakeholders compare farms, inspect the measurements associated with weaker outcomes, and decide which locations deserve a closer look.",
    "The work starts in PostgreSQL, where farm and survey records have to be reconciled before any chart is trustworthy. Python scripts and notebooks clean fields, check data quality, and build the analytical features used by the reports."
  ],
  sections: [
    {
      label: "reporting",
      body: [
        "Pandas and NumPy handle the tabular work, while SciPy and scikit-learn support statistical analysis and risk-oriented modeling. Quarto keeps the analysis reproducible, and Plotly gives stakeholders a way to compare cohorts and inspect at-risk signals without opening a notebook.",
        "The dashboard supports decisions; it does not make them automatically. The source, client identity, raw data, proprietary thresholds, and internal findings remain private."
      ]
    }
  ]
};

export default function createPoultryFarmDataAnalyticsDashboard(): ProjectItem {
  return new ProjectItem(
    "Poultry Farm Data Analytics Dashboard",
    "Decision-support dashboard for a poultry farm client that analyzes litter survey data to highlight what drives performance and flag farms at risk of underperformance.",
    "",
    ["Quarto", "Python", "PostgreSQL", "Pandas", "NumPy", "SciPy", "Scikit-learn", "Plotly"],
    "January 2026 - May 2026",
    [
      "/projects/Poultry-Analytics-1.png",
      "/projects/Poultry-Analytics-2-Redacted.png",
      "/projects/Poultry-Analytics-3.png"
    ],
    "",
    "",
    false,
    false
  );
}
