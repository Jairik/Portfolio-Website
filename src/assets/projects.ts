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
    award?: string = "";  // Award/placement, if any (e.g. hackathon win)

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
        current?: boolean,
        award?: string
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
        this.award = award;
    }
}

/* Short, keyword-rich descriptors for image alt text (SEO). Unlisted projects
   fall back to the first clause of their description. */
const ALT_SUMMARIES: Record<string, string> = {
    "Lunara": "AI-powered healthcare triage system",
    "TestifAI": "LLM quiz and test generator",
    "CapyMorph": "educational 2D morpheme learning game",
    "PerishLess": "AI food-waste reduction platform",
    "KnowYourUni": "ML student analytics platform",
    "Stock Portfolio Management System": "stock portfolio tracking web app",
    "Encrypted P2P Chatroom": "end-to-end encrypted peer-to-peer chat app",
    "AI Puzzle Game": "A* search 15-puzzle solver",
    "Move4Wellness Fitness App": "fitness and workout tracking mobile app",
    "Portfolio Website": "personal developer portfolio website",
    "Shakespearean Personality LLM Augmentation": "persona-consistent Shakespeare LLM demo",
    "Poultry Farm Data Analytics Dashboard": "poultry farm data analytics dashboard",
    "Rova": "voice-first AI learning platform",
    "Vault Assistant": "local-first Obsidian vault AI assistant"
};

/* Builds a unique (per-image), keyword-rich alt string for a project screenshot. */
export function projectImageAlt(title: string, description: string, index: number, total: number): string {
    const summary = ALT_SUMMARIES[title] || description.split(/[.,—]/)[0].trim();
    const position = total > 1 ? `, screenshot ${index + 1} of ${total}` : " screenshot";
    return `${title} — ${summary}${position}`;
}

/* Builds an alt string for a personal photo, anchored to the full name for entity SEO. */
export function personImageAlt(label: string): string {
    return `Jairik "JJ" McCauley — ${label}`;
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
        ["AWS", "React", "JavaScript", "Vite", "Node.js", "FastAPI", "Python", "Scikit-Learn", "Terraform"],  // Tech Stack
        "October 2025 - Present",  // Date
        ["/projects/Lunara-1.png", "/projects/Lunara-2.png", "/projects/Lunara-3.png", "/projects/Lunara-4.png", "/projects/Lunara-5.png", 
            "/projects/Lunara-6.png", "/projects/Lunara-7.png", "/projects/Lunara-8.png"],// Demo Image Sources
        "",  // Demo Link (not applicable for this)
        "https://www.youtube.com/watch?v=ntU7dSQPw1w",  // Demo Video Link
        true,  // Featured
        true,   // Current
        "1st · Rutgers HealthHack 2025"  // Award
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
        false,  // Featured
        false,  // Current
        "2nd Overall · HackUMBC 2024"  // Award
    ));

    // CapyMorph
    allProjects.push(new ProjectItem(
        "CapyMorph",  // Title
        "Educational 2D game that facilitates interactive morpheme exercises.",  // Brief Description
        "https://github.com/Jairik/Capymorph",  // GitHub Link
        ["React", "TypeScript", "Vite", "Phaser.js", "Go", "MongoDB", "Docker", "Fly.io", "Zustand"],  // Tech Stack
        "December 2025",  // Date
        ["/projects/CapyMorph-1.png", "/projects/CapyMorph-2.png", "/projects/CapyMorph-3.png"],  // Demo Image Sources
        "https://capymorph.fly.dev/",  // Demo Link 
        "",  // Demo Video Link  (not applicable for this)
        false  // Featured
    ));

    // PerishLess
    allProjects.push(new ProjectItem(
        "PerishLess",  // Title
        "Food waste reduction platform that uses AI to predict spoilage and optimize inventory management for households.",  // Brief Description
        "https://github.com/Jairik/Perishless",  // GitHub Link
        ["React", "TypeScript", "Vite", "FastAPI", "Python", "Firebase Authentication", "FireStore", "Google Cloud", "Google Gemini", "Eleven Labs", "Docker", "Digital Ocean Droplet (VPS)", "Nginx"],  // Tech Stack
        "March 2026",  // Date
        ["/projects/Perishless-1.png", "/projects/Perishless-2.png", "/projects/Perishless-3.png", "/projects/Perishless-4.png"],  // Demo Image Sources
        "", // "https://perishless.tech/",  // Demo Link TODO FIX - THIS IS CURRENTLY DOWN
        "https://youtu.be/nwS19i9P33c",  // Demo Video Link
        true  // Featured
    ));

    // Chick Counting
    allProjects.push(new ProjectItem(
        "Computer Vision Chick Counting",  // Title
        "AI-based system using computer vision to accurately count chicks in poultry farms, improving standard industry efficiencies and reducing manual labor. Patent consideration.",  // Brief Description
        "",  // GitHub Link (Closed Source)
        ["Python", "Ultralytics YOLO", "Raspberry Pi", "Jupyter"],  // Tech Stack
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
        ["MPI", "OpenMP", "C", "Python", ],  // Tech Stack
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
        ["React", "TypeScript", "Vite", "Firebase", "Plaid API", "FastAPI", "Gemini", "TailwindCSS", "Python"],  // Tech Stack
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
        ["React", "TypeScript", "Vite", "Neo4J", "FastAPI", "Gemini", "Langchain", "Python"],  // Tech Stack
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
        ["PHP", "MySQL", "Chart.js", "Cron", "HTML/CSS/JavaScript", "Boostrap", "Alpaca API"],  // Tech Stack
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

    // Data Science Work
    allProjects.push(new ProjectItem(
        "Data Science Stuff",  // Title
        "Data science project collection showcasing different ETL and ML techniques on numerous different datasets.",  // Brief Description
        "https://github.com/Jairik/Data-Science-Fundementals",  // GitHub Link
        ["Python", "Pandas", "Numpy", "Scikit-Learn", "Tensorflow", "Seaborn", "Plotly", "Jupyter", "MKDocs"],  // Tech Stack
        "August 2025 - December 2025",  // Date
        [],  // Demo Image Sources (not applicable for this)
        "https://jairik.github.io/Data-Science-Fundementals/",  // Demo Link  (basic dsci portfolio website)
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
        ["Java", "Android Studio", "Firebase", "Figma"],  // Tech Stack
        "April 2024 - May 2024",  // Date
        ["/projects/MOVE4WELLNESS-1.png", "/projects/MOVE4WELLNESS-2.png", "/projects/MOVE4WELLNESS-3.png", "/projects/MOVE4WELLNESS-4.png"],  // Demo Image Sources
        "",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false  // Featured
    ));

    // Portfolio Website
    allProjects.push(new ProjectItem(
        "Portfolio Website",  // Title
        "Personal portfolio website (no way who would've known!).",  // Brief Description
        "https://github.com/Jairik/Portfolio-Website",  // GitHub Link
        ["React", "TypeScript", "Vite", "TailwindCSS", "Three.js", "Cloudflare", "GitHub Actions"],  // Tech Stack
        "January 2026 - Present",  // Date
        ["/projects/Portfolio-Website.png"],  // Demo Image Sources
        "https://jjmccauley.com",  // Demo Link
        "",  // Demo Video Link
        false  // Featured
    ));

    // Shakespearean LLM Chatbot (DSCI490)
    allProjects.push(new ProjectItem(
        "Shakespearean Personality LLM Augmentation",  // Title
        "Develops and evaluates persona-consistent LLMs grounded in Hamlet and Macbeth via LoRA fine-tuning, RAG, and a FastAPI + React demo for single-character and multi-model dialogues.",  // Brief Description
        "https://github.com/bmccorison/DSCI490-Shakespearean-Personality-LLM-Augmentation-",  // GitHub Link
        ["Python", "PyTorch", "Tensorflow", "HuggingFace", "RAG", "FastAPI", "React", "TypeScript", "Vite", "TailwindCSS", "Docker"],  // Tech Stack
        "January 2026 - May 2026",  // Date
        ["/projects/Shakespearean-LLM-1.png"],  // Demo Image Sources
        "",  // Demo Link  (local web demo via runWebDemo.sh)
        "",  // Demo Video Link  (not applicable for this)
        false,  // Not featured
        false   // Past
    ));

    // Poultry Farm Data Analytics Dashboard (COSC495)
    allProjects.push(new ProjectItem(
        "Poultry Farm Data Analytics Dashboard",  // Title
        "Decision-support dashboard for a poultry farm client that analyzes litter survey data to highlight what drives performance and flag farms at risk of underperformance.",  // Brief Description
        "",  // GitHub Link (Closed Source)
        ["Quarto", "Python", "PostgreSQL", "Pandas", "NumPy", "SciPy", "Scikit-learn", "Plotly"],  // Tech Stack
        "January 2026 - May 2026",  // Date
        ["/projects/Poultry-Analytics-1.png", "/projects/Poultry-Analytics-2-Redacted.png", "/projects/Poultry-Analytics-3.png"],  // Demo Image Sources (not applicable for this, closed source)
        "",  // Demo Link  (not applicable for this)
        "",  // Demo Video Link  (not applicable for this)
        false,  // Not featured
        false   // Past
    ));

    /* === CURRENT PROJECTS === */

    // Vault Assistant
    allProjects.push(new ProjectItem(
        "Vault Assistant",  // Title
        "Local AI assistant for Obsidian that answers from your notes with BM25 search. Runs on localhost with multi-tab sessions and swap-in backends like Claude Code or Codex.",  // Brief Description
        "https://github.com/Jairik/vault-assistant",  // GitHub Link
        ["TypeScript", "Bun", "React", "BM25 RAG", "Claude Code", "Codex", "SearXNG", "Tauri", "Tailwind CSS"],  // Tech Stack
        "January 2026 - Present",  // Date
        ["/projects/Vault-Assistant-1.png", "/projects/Vault-Assistant-2.png", "/projects/Vault-Assistant-3.png", "/projects/Vault-Assistant-4.png"],  // Demo Image Sources
        "https://jairik.github.io/vault-assistant/",  // Demo Link
        "",  // Demo Video Link
        true,  // Featured
        true   // Current
    ));

    // Rova
    allProjects.push(new ProjectItem(
        "Rova",  // Title
        "Voice-first AI learning platform that turns uploaded material or any topic into a personalized roadmap with guided lessons, practice, assessments, and progress tracking.",  // Brief Description
        "",  // GitHub Link (Closed Source)
        ["React", "TypeScript", "Vite", "D3.js", "Tailwind CSS", "Auth0", "FastAPI", "MongoDB", "Gemini", "LangChain", "OpenAI", "Tavily", "ElevenLabs", "AWS", "Docker"],  // Tech Stack
        "March 2026 - Present",  // Date
        ["/projects/Rova-1.png", "/projects/Rova-2.png", "/projects/Rova-3.png", "/projects/Rova-4.png", "/projects/Rova-5.png"],  // Demo Image Sources
        "",  // Demo Link
        "",  // Demo Video Link
        false,  // Not featured
        true   // Current
    ));

    return allProjects;
}
