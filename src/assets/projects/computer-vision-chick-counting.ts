import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "computer vision",
  about: [
    "This closed-source industry project counts newly hatched chicks moving along a conveyor belt. The existing laser counter was fast but inconsistent in crowded batches, so our team tested a camera-based system using two RGB streams and a thermal stream.",
    "The hard part was not finding chicks in a frame. YOLO did that well. The failure case was overlap: several chicks could become one large detection, which made a normal object counter undercount the batch. We treated each detection as input to a second counting stage instead of assuming one box meant one chick."
  ],
  sections: [
    {
      label: "approach",
      body: [
        "The RGB pipeline combined YOLO11 tracking with area, overlap, shape, and color features. We hand-counted 2,261 conveyor crossings and classified more than 1,400 detections to separate artifacts, single chicks, and clusters. Threshold searches and correction models were evaluated across held-out video sources rather than random frames from the same clip.",
        "The thermal prototype added temperature and shape features from an industrial 80 by 62 sensor. A Raspberry Pi 5 handled edge capture experiments, while GPU machines were used for model training and higher-throughput inference."
      ]
    },
    {
      label: "results and limits",
      body: [
        "The measured RGB pipeline reached roughly 98.6% to 98.9% counting accuracy and processed 30 FPS footage at about 52 FPS on an RTX 4050. Post-processing added less than 5% overhead. The thermal work was promising but used a much smaller, heavily imbalanced dataset, and full RGB and thermal synchronization was still unfinished.",
        "The repository and client data remain private, and some of the work is under patent consideration. This page therefore leaves out client identifiers, raw footage, operational thresholds, and unpublished fusion claims."
      ]
    }
  ]
};

export default function createComputerVisionChickCounting(): ProjectItem {
  return new ProjectItem(
    "Computer Vision Chick Counting",
    "AI-based system using computer vision to accurately count chicks in poultry farms, improving standard industry efficiencies and reducing manual labor. Patent consideration.",
    "",
    ["Python", "Ultralytics YOLO", "Raspberry Pi", "Jupyter"],
    "January 2024 - December 2025",
    [],
    "",
    "",
    false
  );
}
