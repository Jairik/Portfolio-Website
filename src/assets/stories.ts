/* Simple configuration-like file for editing articles
 * May redo this structure later for nesting stuff by similar things, but will see
 * */

const BASE_IMAGE_PATH = "/tech-icons/";  // site-root absolute so icons resolve on any route
const SU_TODAY_PATH = BASE_IMAGE_PATH + "su-today-icon.png";
export const SLIDES_ICON_PATH = BASE_IMAGE_PATH + "google-slides.svg";

export interface ArticleItem {
    source: string;  // Where it originated from (eg SU Today)
    sourceImgPath: string;  // Path to the source icon thing
    linkToArticle: string;  // Full URL to redirect to the article
    date: string;  // Date of the article (obviously) as a string, how it will be sorted and displayed
    heading: string;  // Title of the article
}

export const articleItems: ArticleItem[] = [
    {
        source: "SU Today",
        sourceImgPath: SU_TODAY_PATH,
        linkToArticle: "https://hub.salisbury.edu/sutoday/2026/06/03/department-of-computer-science-award-2026/",
        date: "06/03/2026",
        heading: "Department of Computer Science Award 2026",
    },
    {
        source: "SU Today",
        sourceImgPath: SU_TODAY_PATH,
        linkToArticle: "https://hub.salisbury.edu/sutoday/2026/05/05/computer-science-department-upe-induction-ceremony-department-picnic-may-2-2026/",
        date: "05/05/2026",
        heading: "Computer Science Department UPE Induction Ceremony & Department Picnic May 2, 2026",
    },
    {
        source: "SU Today",
        sourceImgPath: SU_TODAY_PATH,
        linkToArticle: "https://hub.salisbury.edu/sutoday/2026/05/05/chris-perdue-svp-marketing-digital-and-ecommerce-from-perdue-farms-visited-computer-science-department/",
        date: "05/05/2026",
        heading: "Chris Perdue SVP Marketing, Digital and Ecommerce from Perdue Farms visited Computer Science Department",
    },
    {
        source: "Google Slides",
        sourceImgPath: SLIDES_ICON_PATH,
        linkToArticle: "https://docs.google.com/presentation/d/1yCKwKY283LoKw8bKfptE9ZvFQMHBj4xMH0BUBmtvsZs/edit?usp=sharing",
        date: "05/04/2026",
        heading: "AI Presentation Slides",
    },
    {
        source: "SU Today",
        sourceImgPath: SU_TODAY_PATH,
        linkToArticle: "https://hub.salisbury.edu/sutoday/2026/01/27/jairik-mccauley-received-the-prestigious-2025-upe-academic-achievement-award-of-1500/",
        date: "01/27/2026",
        heading: "Jairik McCauley received the prestigious 2025 UPE Academic Achievement Award of $1500",
    },
    {
        source: "SU Today",
        sourceImgPath: SU_TODAY_PATH,
        linkToArticle: "https://hub.salisbury.edu/sutoday/2025/10/15/su-comp-sci-students-win-1st-place/",
        date: "10/15/2025",
        heading: "SU Comp Sci Students Win 1st Place",
    },
    {
        source: "SU Today",
        sourceImgPath: SU_TODAY_PATH,
        linkToArticle: "https://hub.salisbury.edu/sutoday/2025/04/07/students-to-be-inducted-to-the-pi-mu-epsilon-pme-honor-society/",
        date: "04/07/2025",
        heading: "Students to be Inducted to the Pi Mu Epsilon (PME) Honor Society",
    },
    {
        source: "SU Today",
        sourceImgPath: SU_TODAY_PATH,
        linkToArticle: "https://hub.salisbury.edu/sutoday/2025/03/12/computer-science-students-participated-in-hackumbc/",
        date: "03/12/2025",
        heading: "Computer Science Students Participated in hackUMBC",
    },
];
