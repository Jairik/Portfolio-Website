import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "algorithms",
  about: [
    "This was one of my first projects, and it grew from implementing sorts into asking a better question: when does each sort actually make sense? The study compares Merge, Comb, Shell, Heap, and the C++ library sort with Radix, Counting, and Bucket Sort.",
    "That comparison matters because the second group can avoid the normal comparison-sort lower bound, but only when the keys and their range cooperate. A fast algorithm on one dataset can be a poor choice on another."
  ],
  sections: [
    {
      label: "benchmarking",
      body: [
        "Each implementation runs across repeated experimental datasets and records its timing with C++ chrono. I compared those measurements with the expected complexity, memory needs, stability, key ranges, and data distribution instead of declaring one universal winner.",
        "The project is small, but the workflow stuck with me: define competing approaches, control the inputs, collect evidence, and then explain why the measurements do or do not match the theory."
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
