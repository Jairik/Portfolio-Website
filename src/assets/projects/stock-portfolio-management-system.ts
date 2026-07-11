import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "fintech / web",
  about: [
    "This project is a database-backed portfolio tracker for investors and advisors. Users can record purchases and sales, inspect holdings, and compare historical transactions with current market prices instead of maintaining the whole picture in a spreadsheet.",
    "The application has separate investor, advisor, and administrative workflows. That role split shaped the database and interface because each person needs a different view of the same portfolio records."
  ],
  sections: [
    {
      label: "architecture",
      body: [
        "PHP handles the server-side application logic and mediates between the browser, MySQL, and external market data. The relational model stores users, portfolios, holdings, and transaction history. Alpaca supplies market information, Chart.js renders performance views, and Cron supports work that should refresh outside a page request.",
        "It is an educational full-stack system, not a brokerage or an investment-advice tool. The useful part of the project is the end-to-end data flow: record a transaction, maintain consistent holdings, add changing market data, and explain the result visually."
      ]
    }
  ]
};

export default function createStockPortfolioManagementSystem(): ProjectItem {
  return new ProjectItem(
    "Stock Portfolio Management System",
    "Web application for managing and analyzing stock portfolios with real-time data integration and performance tracking.",
    "https://github.com/Jairik/Stock-Portfolio-Management",
    ["PHP", "MySQL", "Chart.js", "Cron", "HTML/CSS/JavaScript", "Bootstrap", "Alpaca API"],
    "March 2024 - April 2024",
    [
      "/projects/Stock-Portfolio-Management-System-1.png",
      "/projects/Stock-Portfolio-Management-System-2.png",
      "/projects/Stock-Portfolio-Management-System-3.png",
      "/projects/Stock-Portfolio-Management-System-4.png"
    ],
    "https://lamp.salisbury.edu/~jmccauley4/StocksDB",
    "",
    false
  );
}
