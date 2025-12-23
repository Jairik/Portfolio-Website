/* Helpers for easily interchangable projects */

// Project item class for easy creation and handling
export class ProjectItem {
    title: string = "";
    date?: string = "";
    description: string = "";
    link: string = "";
    techStack: string[] = [];
    imageSrc?: string[] = [];
    demoLink?: string = "";
    demoVideoLink?: string = "";
    featured?: boolean = false;

    // Default constructor for easy creation
    constructor(
        title: string,
        description: string,
        link: string,
        techStack: string[],
        date?: string,
        imageSrc?: string[],
        demoLink?: string,
        demoVideoLink?: string,
        featured?: boolean
    ) {
        this.title = title;
        this.date = date;
        this.description = description;
        this.link = link;
        this.techStack = techStack;
        this.imageSrc = imageSrc;
        this.demoLink = demoLink;
        this.demoVideoLink = demoVideoLink;
        this.featured = featured;
    }

}

export function getProjectItems(): ProjectItem[] {
    var allProjects: ProjectItem[] = [];  // Array to hold all project items

    // Append each project item to the array
    // Lunara
    allProjects.push(new ProjectItem(
        "Lunara",  // Title
        "AI-powered triage system for healthcare, winning 1st place at Rutgers HealthHack 2025. Currently working with Rutgers on a completer program to bring to production.",  // Brief Description
        "https://github.com/Jairik/RUHealthHack-25",  // GitHub Link
        ["AWS", "React", "Node.js", "FastAPI", "Python", "TensorFlow", "sklearn", "Terraform"],  // Tech Stack
        "October 2025 - Present",  // Date
        ["/projects/Lunara-1.png", "/projects/Lunara-2.png", "/projects/Lunara-3.png", "/projects/Lunara-4.png", "/projects/Lunara-5.png", 
            "/projects/Lunara-6.png", "/projects/Lunara-7.png", "/projects/Lunara-8.png"],// Demo Image Sources
        "",  // Demo Link (not applicable for this)
        "https://www.youtube.com/watch?v=ntU7dSQPw1w",  // Demo Video Link
        true  // Featured
    ));

    // TestifAI
    allProjects.push(new ProjectItem(
        "TestifAI",  // Title
        "LLM-driven platform that generates quizes and tests from user-provided material, winning 2nd best overall and best educational hack at HackUMBC 2024.",  // Brief Description
        "https://github.com/SpencerPresley/TestifAI",  // GitHub Link
        ["OpenAI API", "Langchain", "FastAPI", "AWS", "HTML/CSS/JavaScript", "Jinja", "Python"],  // Tech Stack
        "September 2024",  // Date
        ["/projects/TestIfAI-1.png", "/projects/TestIfAI-2.png", "/projects/TestIfAI-3.png", "/projects/TestIfAI-4.png"],  // Demo Image Sources
        "https://testifai.dustintobrien.com/",  // Demo Link
        "https://www.youtube.com/watch?v=DFYo5gKj0tA",  // Demo Video Link
        true  // Featured
    ));

    // CapyMorph
    allProjects.push(new ProjectItem(
        "CapyMorph",  // Title
        "Educational 2D game facilitate interactive morpheme exercises.",  // Brief Description
        "https://github.com/Jairik/Capymorph",  // GitHub Link
        ["React", "Phaser.js", "Go", "MongoDB", "Docker", "Zustand"],  // Tech Stack
        "December 2025",  // Date
        ["/projects/CapyMorph-1.png", "/projects/CapyMorph-2.png", "/projects/CapyMorph-3.png"],  // Demo Image Sources
        "https://capymorph.fly.dev/",  // Demo Link 
        "",  // Demo Video Link  (not applicable for this)
        true  // Featured
    ));

    // Chick Counting
    allProjects.push(new ProjectItem(
        "Computer Vision Chick Counting",  // Title
        "AI-based system using computer vision to accurately count chicks in poultry farms, improving standard industry efficiencies and reducing manual labor.",  // Brief Description
        "",  // GitHub Link (Closed Source)
        ["Python", "Ultralytics YOLO", "Raspberry Pi"],  // Tech Stack
        "January 2024 - December 2025",  // Date
        [],  // Demo Image Sources (not applicable for this, closed source)
        "",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false  // Featured
    ));

    // Parallel Query Processing System
    allProjects.push(new ProjectItem(
        "Parallel Query Processing System",  // Title
        "Distributed system that optimizes SQL query execution across multiple nodes, significantly reducing processing time.",  // Brief Description
        "https://github.com/Jairik/Parallel-Query-Processing-System",  // GitHub Link
        ["MPI", "OpenMP", "C"],  // Tech Stack
        "November 2025 - December 2025",  // Date
        [],  // Demo Image Sources (TODO)
        "",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false  // Featured
    ));

    // TODO ClarityCash + KnowYourUni

    // Stock Portfolio Management System
    allProjects.push(new ProjectItem(
        "Stock Portfolio Management System",  // Title
        "Web application for managing and analyzing stock portfolios with real-time data integration and performance tracking.",  // Brief Description
        "https://github.com/Jairik/Stock-Portfolio-Management",  // GitHub Link
        ["PHP", "MySQL", "Cron", "HTML/CSS/JavaScript", "Alpaca API"],  // Tech Stack
        "January 2024 - April 2024",  // Date
        ["projects/Stock-Portfolio-Management-System-1.png", "projects/Stock-Portfolio-Management-System-2.png", "projects/Stock-Portfolio-Management-System-3.png", 
            "projects/Stock-Portfolio-Management-System-4.png"],  // Demo Image Sources
        "https://lamp.salisbury.edu/~jmccauley4/StocksDB/login.html",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false  // Featured
    ));

    // MOVE4WELLNESS Fitness App
    allProjects.push(new ProjectItem(
        "Move4Wellness Fitness App",  // Title
        "Prototype mobile app promoting physical activity through personalized workout plans and progress tracking.",  // Brief Description
        "https://github.com/Jairik/MOVE4WELLNESS-Android-App",  // GitHub Link
        ["Java", "Android Studio", "Firebase"],  // Tech Stack
        "April 2024 - May 2024",  // Date
        ["projects/MOVE4WELLNESS-1.png", "projects/MOVE4WELLNESS-2.png", "projects/MOVE4WELLNESS-3.png", "projects/MOVE4WELLNESS-3.png"],  // Demo Image Sources
        "",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false  // Featured
    ));

    // TODO Encrypted P2P Chatroom, AI Puzzle Game

    return allProjects;
}