import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "algorithms",
  about: [
    "I started by implementing sorting algorithms and ended up comparing when each one is actually worth using. The study puts Merge, Comb, Shell, Heap, and the C++ library sort next to Radix, Counting, and Bucket Sort.",
    "Those last three can avoid the usual comparison-sort lower bound, but only when the keys and their range cooperate. A sort that looks great on one dataset can be the wrong call on another."
  ],
  sections: [
    {
      label: "benchmarking",
      body: [
        "Each implementation runs across repeated experimental datasets, and I record timing with C++ chrono. I look at those measurements alongside expected complexity, memory needs, stability, key ranges, and data distribution rather than picking a universal winner.",
        "The project is small, but the workflow stuck with me. I define competing approaches, control the inputs, collect evidence, and then explain why the measurements do or do not match the theory."
      ]
    }
  ]
};

export default function createAlgorithmPerformanceBenchmarker(): ProjectItem {
  return new ProjectItem(
    "Algorithm Performance Benchmarker",
    "Benchmarks and compares the performance of various sorting algorithms (Bubble Sort, Merge Sort, Quick Sort, etc.). One of the first projects I built.",
    "https://github.com/Jairik/Sort-Analysis",
    ["C++", "Chrono"],
    "March 2024",
    [],
    "",
    "",
    false
  );
}
