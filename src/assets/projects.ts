/* Helpers for easily interchangable projects */

// Project item class for easy creation and handling
export class ProjectItem {
    title: string = "";  // Project title
    date?: string = "";  // Project date or duration
    description: string = "";  // Brief description of the project
    link: string = "";  // GitHub link
    techStack: string[] = [];  // Technologies used
    imageSrc?: string[] = [];  // Demo image sources
    demoLink?: string = "";  // Link to deployed demo (if applicable)
    demoVideoLink?: string = "";  // Link to demo video (if applicable)
    featured?: boolean = false;  // Whether the project is featured for the website
    current?: boolean = false;  // Whether the project is currently in progress

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
        featured?: boolean,
        current?: boolean
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
        this.current = current;
    }

}

// Gets all project items, appending each to an array and returning it
export function getProjectItems(): ProjectItem[] {
    const allProjects: ProjectItem[] = [];  // Array to hold all project items

    /* === PAST PROJECTS === */
    // Lunara
    allProjects.push(new ProjectItem(
        "Lunara",  // Title
        "AI-powered triage system for healthcare, winning 1st place at Rutgers HealthHack 2025. Currently working with Rutgers on a completer program to bring to production.",  // Brief Description
        "https://github.com/Jairik/RUHealthHack-25",  // GitHub Link
        ["AWS", "React", "Node.js", "FastAPI", "Python", "sklearn", "Terraform"],  // Tech Stack
        "October 2025 - Present",  // Date
        ["/projects/Lunara-1.png", "/projects/Lunara-2.png", "/projects/Lunara-3.png", "/projects/Lunara-4.png", "/projects/Lunara-5.png", 
            "/projects/Lunara-6.png", "/projects/Lunara-7.png", "/projects/Lunara-8.png"],// Demo Image Sources
        "",  // Demo Link (not applicable for this)
        "https://www.youtube.com/watch?v=ntU7dSQPw1w",  // Demo Video Link
        true,  // Featured
        true   // Current
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
        "Educational 2D game that facilitates interactive morpheme exercises.",  // Brief Description
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
        "AI-based system using computer vision to accurately count chicks in poultry farms, improving standard industry efficiencies and reducing manual labor. Patent consideration.",  // Brief Description
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

    // ClarityCash
    allProjects.push(new ProjectItem(
        "ClarityCash",  // Title
        "Data driven budgeting app that turns your financial data into clear insights and actionable plans.",  // Brief Description
        "https://github.com/aforti1/clarity-cash",  // GitHub Link
        ["React", "Firebase", "Plaid API", "FastAPI", "Gemini", "TailwindCSS", "Python"],  // Tech Stack
        "November 2025",  // Date
        [],  // TODO Demo Image Sources
        "",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false  // Featured
    ));

    // KnowYourUni
    allProjects.push(new ProjectItem(
        "KnowYourUni",  // Title
        "Student analytics platform providing ML-derived insights into student performance.",  // Brief Description
        "https://github.com/ncorcoran771/KnowYourUni_",  // GitHub Link
        ["React", "Neo4J", "FastAPI", "Gemini", "Langchain", "Python"],  // Tech Stack
        "September 2025 - November 2025",  // Date
        ["/projects/KnowYourUni-1.png", "/projects/KnowYourUni-2.png", "/projects/KnowYourUni-3.png", "/projects/KnowYourUni-4.png",
            "/projects/KnowYourUni-5.png", "/projects/KnowYourUni-6.png"],  // Demo Image Sources
        "",  // Demo Link  (not applicable for this)
        "https://www.youtube.com/watch?v=u-mNfCXUxhU&t=1s",  // Demo Video Link
        false  // Featured
    ));

    // Stock Portfolio Management System
    allProjects.push(new ProjectItem(
        "Stock Portfolio Management System",  // Title
        "Web application for managing and analyzing stock portfolios with real-time data integration and performance tracking.",  // Brief Description
        "https://github.com/Jairik/Stock-Portfolio-Management",  // GitHub Link
        ["PHP", "MySQL", "Cron", "HTML/CSS/JavaScript", "Alpaca API"],  // Tech Stack
        "March 2024 - April 2024",  // Date
        ["/projects/Stock-Portfolio-Management-System-1.png", "/projects/Stock-Portfolio-Management-System-2.png", "/projects/Stock-Portfolio-Management-System-3.png", 
            "/projects/Stock-Portfolio-Management-System-4.png"],  // Demo Image Sources
        "https://lamp.salisbury.edu/~jmccauley4/StocksDB",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false  // Featured
    ));

    // Encrypted P2P Chatroom
    allProjects.push(new ProjectItem(
        "Encrypted P2P Chatroom",  // Title
        "Peer-to-peer chat application with end-to-end encryption for secure communication. Uses ChaCha20-Poly1305 for message encryption, Ed25519 message signatures for user validation, and UDP multicast.",  // Brief Description
        "https://github.com/Jairik/Secure-P2P-Chatroom",  // GitHub Link
        ["Cryptography", "WebSockets", "DearPyGUI"],  // Tech Stack
        "April 2025",  // Date
        ["/projects/P2P-Encrypted-Chatroom-1.png", "/projects/P2P-Encrypted-Chatroom-2.png", "/projects/P2P-Encrypted-Chatroom-3.png"],  // Demo Image Sources (not applicable for this)
        "",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false  // Featured
    ));

    // AI Puzzle Game
    allProjects.push(new ProjectItem(
        "AI Puzzle Game",  // Title
        "Utilizes A* Search to automate the 15-puzzle-game, a popular game that includes shifting tiles to a sequential configuration.",  // Brief Description
        "https://github.com/Jairik/AI-Puzzle-Game",  // GitHub Link
        ["Python", "A* Search Algorithm", "Tkinter"],  // Tech Stack
        "November 2024",  // Date
        ["/projects/AI-Puzzle-Game-1.png", "/projects/AI-Puzzle-Game-2.png"],  // Demo Image Sources (not applicable for this)
        "",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false  // Featured
    ));

    // Algorithm Performance Benchmarker (Cool because it is one of the first projects, can be removed)
    allProjects.push(new ProjectItem(
        "Algorithm Performance Benchmarker",  // Title
        "Benchmarks and compares the performance of various sorting algorithms (Bubble Sort, Merge Sort, Quick Sort, etc.). One of the first projects I built.",  // Brief Description
        "https://github.com/Jairik/Sort-Analysis",  // GitHub Link
        ["C++", "Chrono"],  // Tech Stack
        "March 2024",  // Date
        [],  // Demo Image Sources (not applicable for this)
        "",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false  // Featured
    ));

    // MOVE4WELLNESS Fitness App Prototype
    allProjects.push(new ProjectItem(
        "Move4Wellness Fitness App",  // Title
        "Prototype mobile app promoting physical activity through personalized workout plans and progress tracking.",  // Brief Description
        "https://github.com/Jairik/MOVE4WELLNESS-Android-App",  // GitHub Link
        ["Java", "Android Studio", "Firebase"],  // Tech Stack
        "April 2024 - May 2024",  // Date
        ["/projects/MOVE4WELLNESS-1.png", "/projects/MOVE4WELLNESS-2.png", "/projects/MOVE4WELLNESS-3.png", "/projects/MOVE4WELLNESS-3.png"],  // Demo Image Sources
        "",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false  // Featured
    ));

    /* === CURRENT PROJECTS === */
    // Shakesperean LLM Chatbot
    allProjects.push(new ProjectItem(
        "Shakespearean Personality LLM Augmentation",  // Title
        "Develops and evaluates methods for persona-consistent AI, focusing on Shakespear's works of Hamlet and Macbeth to acheive four-way conversations among language models.",  // Brief Description
        "https://github.com/bmccorison/DSCI490-Shakespearean-Personality-LLM-Augmentation-",  // GitHub Link
        ["Python", "HuggingFace", "Pinecone", "React"],  // Tech Stack
        "January 2026 - Present",  // Date
        [],  // Demo Image Sources (not applicable for this)
        "",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false,  // Not featured
        true   // Current
    ));

    // Poultry Farm Data Analytics Dashboard
    allProjects.push(new ProjectItem(
        "Poultry Farm Data Analytics Dashboard",  // Title
        "Dashboard for poultry farmers that provides real-time insights and analytics on farm operations, focusing on litter quality and living conditions.",  // Brief Description
        "",  // GitHub Link (Closed Source)
        ["Quarto", "Python", "Scikit-Learn", "Tensorflow", "Seaborn", "Plotly"],  // Tech Stack
        "January 2026 - Present",  // Date
        [],  // Demo Image Sources (not applicable for this, closed source)
        "",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false,  // Not featured
        true   // Current
    ));

    // Open Source Open Hours Builder
    allProjects.push(new ProjectItem(
        "Basic Open Hours Builder",  // Title
        "Targeted to SU lab assistants/tutors, allows for users to easily make and deploy their own basic office hours website.",  // Brief Description
        "",  // GitHub Link (TODO)
        ["JS", "HTML/CSS", "GitHub Actions"],  // Tech Stack
        "Feburary 2025 - Present",  // Date
        [],  // Demo Image Sources (not applicable for this quite yet)
        "",  // Demo Link  (not applicable for this quite yet)
        "",  // Demo Video Link  (not applicable for this quite yet)
        false,  // Not featured
        true   // Current
    ));

    // Return the array of all projects
    return allProjects;
}