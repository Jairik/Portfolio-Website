import { ProjectItem } from "./project-item";
import type { ProjectPageExtra } from "./page-content";

export const content: ProjectPageExtra = {
  tags: "data science",
  about: [
    "Data Science Stuff is the collected work from my Data Science Fundamentals course. It includes smaller studies on penguins, life expectancy, breast-cancer data, PCA, k-nearest neighbors, and gradient descent, plus a larger capstone on academic performance.",
    "The capstone used a UCI dataset with roughly 145 students and 32 demographic, socioeconomic, and academic features. The sample is small, so I treated the project as an exercise in careful modeling and interpretation rather than a basis for claims about students in general."
  ],
  sections: [
    {
      label: "capstone",
      body: [
        "I tested DBSCAN and k-means for student grouping. DBSCAN collapsed to one cluster, and the best k-means result used two clusters with a weak silhouette score near 0.11. That was a useful result in itself: a clean-looking PCA plot did not mean the clusters were especially strong.",
        "For grade prediction, I reduced the sparse eight-class target to low, middle, and high groups. A tuned random forest reached about 64% test accuracy. Permutation importance and SHAP pointed toward prior academic performance, study time, age, reading habits, and family context, but I kept the write-up correlational and avoided turning a small observational dataset into a causal story."
      ]
    },
    {
      label: "other work",
      body: [
        "The rest of the collection covers k-nearest-neighbor classification on Palmer Penguins, country clustering and PCA on WHO life-expectancy data, PCA and classification on the Wisconsin breast-cancer dataset, and a manual gradient-descent implementation with interactive Plotly traces. A separate ethics paper looks at privacy, governance, and the risk of repeating weak data claims until they sound true."
      ]
    }
  ]
};

export default function createDataScienceStuff(): ProjectItem {
  return new ProjectItem(
    "Data Science Stuff",
    "Data science project collection showcasing different ETL and ML techniques on numerous different datasets.",
    "https://github.com/Jairik/Data-Science-Fundementals",
    ["Python", "Pandas", "Numpy", "Scikit-Learn", "Tensorflow", "Seaborn", "Plotly", "Jupyter", "MKDocs"],
    "August 2025 - December 2025",
    [],
    "https://jairik.github.io/Data-Science-Fundementals/",
    "",
    false
  );
}
