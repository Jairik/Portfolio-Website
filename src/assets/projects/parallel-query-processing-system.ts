import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "distributed systems",
  about: [
    "The Parallel Query Processing Engine is a command-line database built to run SQL-like queries over large structured files. It includes its own tokenizer, parser, B+ tree index, synthetic data generator, and three execution backends, which made it a useful way to study where parallel query work actually pays off.",
    "The same parsed query can run through a serial baseline, an OpenMP shared-memory implementation, or an MPI implementation spread across independent processes. Keeping the parser separate from the execution layer let us compare those backends without changing the query language."
  ],
  sections: [
    {
      label: "my role",
      body: [
        "I built the serial engine, the top-level QPE entry programs, the makefiles, the testing infrastructure, and much of the project documentation. Other team members worked on the parser, SELECT and INSERT parallelization, sample queries, and synthetic data generation."
      ]
    },
    {
      label: "benchmarks",
      body: [
        "On the one-million-record dataset, the serial baseline averaged 2.7841 seconds. Six OpenMP threads completed the same workload in 0.4979 seconds, while six MPI processes finished in 0.2292 seconds. We checked parallel results against the serial engine to make sure speed did not come at the cost of different answers.",
        "The benchmark also exposed the current ceiling. Every run rebuilds its in-memory data structures, so cold-start cost and available memory limit the useful dataset size. Results on the 50,000-record set were so short that I/O and process startup could easily distort them."
      ]
    }
  ]
};

export default function createParallelQueryProcessingSystem(): ProjectItem {
  return new ProjectItem(
    "Parallel Query Processing System",
    "Distributed system that optimizes SQL query execution across multiple nodes, significantly reducing processing time.",
    "https://github.com/Jairik/Parallel-Query-Processing-System",
    ["MPI", "OpenMP", "C", "Python", "Valgrind", "GitHub Actions"],
    "November 2025 - December 2025",
    [],
    "",
    "",
    false
  );
}
