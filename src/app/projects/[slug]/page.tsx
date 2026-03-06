import { ArrowLeft, Github, ExternalLink, ShieldCheck, Building2, TrendingUp, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock database for case studies
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const projectData: Record<string, any> = {
    "cyberbullying-detection": {
        title: "Cyberbullying Detection System with BERT",
        description: "Fine-tuned a BERT model achieving 94.5% recall and 94.19% F1-score for cyberbullying detection with a safety-critical focus on minimizing false negatives. Deployed as a Streamlit web application and extended into an ICWSM 2026 research submission.",
        tech: ["PyTorch", "BERT", "Python", "Streamlit", "Transformers"],
        github: "https://github.com/Harishlal-me/cyberbullydectetion",
        demo: "https://github.com/Harishlal-me/cyberbullydectetion",
        color: "text-neon-purple",
        bg: "bg-neon-purple/10",
        icon: ShieldCheck,
        problem: "Cyberbullying is rampant on social media, but identifying it accurately without false negatives is critical for user safety. Standard models often fail to capture nuanced toxicity, leaving victims exposed.",
        solution: "A custom fine-tuned BERT architecture optimized specifically for recall to ensure severe cases are flagged. The system aggressively minimizes false negatives while maintaining high overall F1 scores.",
        architecture: "Data pipeline built in Python, tokenization via HuggingFace Transformers, PyTorch classification head, and a lightweight Streamlit front-end for real-time text evaluation.",
        features: ["High recall contextual classification", "Real-time inference API", "Safety-critical evaluation pipeline", "Interactive Streamlit UI"],
        challenges: "Balancing precision and recall was extremely difficult due to the subjective nature of toxicity in edge cases. Fine-tuning required extensive hyperparameter optimization.",
        results: "Achieved an industry-competitive 94.5% recall and 94.19% F1-score. The methodology and findings are currently being formalized for an ICWSM 2026 conference submission."
    },
    "campussafe": {
        title: "CampusSafe – Lost & Found Management",
        description: "Full-stack campus lost-and-found management platform with intelligent item matching and automated admin workflows.",
        tech: ["React", "Express.js", "MySQL", "Tailwind CSS", "JWT", "PDFKit"],
        github: "https://github.com/Harishlal-me/campussafe",
        demo: "https://github.com/Harishlal-me/campussafe",
        color: "text-neon-cyan",
        bg: "bg-neon-cyan/10",
        icon: Building2,
        problem: "University campuses suffer from heavily fragmented lost-and-found processes, leading to low recovery rates and frustrated students.",
        solution: "A centralized, intelligent digital hub that connects finders with losers via a smart matching algorithm and robust administrative tools.",
        architecture: "React frontend, Express.js REST API secured by JWT, relying on a deeply normalized 11-table MySQL database structure.",
        features: ["Jaccard similarity intelligent matching (40-95% confidence)", "Role-based access control (Admin/Student)", "Automated PDF institutional reporting", "Real-time claim updates"],
        challenges: "Designing an efficient string-matching algorithm that could confidently pair vaguely described lost items with found items without massive database overhead.",
        results: "Successfully modeled a highly scalable application capable of handling thousands of users and items, greatly streamlining administrative workflows."
    },
    "stock-analysis": {
        title: "AI-Driven Stock Analysis System",
        description: "End-to-end machine learning pipeline deployed as a Streamlit dashboard with interactive visualizations for six major equities.",
        tech: ["Python", "Streamlit", "Plotly", "Scikit-learn", "Pandas"],
        github: "https://github.com/Harishlal-me/hstockpredictorl",
        demo: "https://github.com/Harishlal-me/hstockpredictorl",
        color: "text-neon-pink",
        bg: "bg-neon-pink/10",
        icon: TrendingUp,
        problem: "Financial data is complex, volatile, and difficult for amateur investors to analyze without expensive enterprise software.",
        solution: "An accessible, streamlined open-source web application that performs automated exploratory data analysis and predictive modeling on live stock data.",
        architecture: "Python data ingestion engine, Scikit-learn predictive modeling on aggregated time-series data, visualized cleanly via Plotly inside a Streamlit app.",
        features: ["Predictive trend modeling", "Interactive Plotly candlestick charts", "Support for 6 major tech equities (AAPL, MSFT, GOOGL, AMZN, TSLA, NVDA)", "Exploratory technical indicators"],
        challenges: "Handling time-series data clean-up and preventing data leakage during the train/test splits for predictive models.",
        results: "Deployed a fully functional analytical dashboard serving as a robust educational tool for bridging AI techniques with quantitative finance."
    }
};

export default async function ProjectCaseStudy(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const project = projectData[params.slug];

    if (!project) return notFound();

    return (
        <main className="min-h-screen pt-32 pb-20 px-4 md:px-6 container mx-auto max-w-4xl relative">
            <Link
                href="/#projects"
                className="inline-flex items-center gap-2 text-neutral-400 hover:text-white mb-8 transition-colors bg-neutral-900 px-4 py-2 rounded-full text-sm font-medium border border-neutral-800"
            >
                <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>

            <header className="mb-12">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${project.bg} ${project.color} mb-6`}>
                    <project.icon className="w-8 h-8" />
                </div>
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${project.color} leading-tight`}>
                    {project.title}
                </h1>
                <p className="text-xl md:text-2xl text-neutral-300 mb-8 leading-relaxed">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                    {project.tech.map((t: string) => (
                        <span key={t} className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-sm font-mono text-neutral-300">
                            {t}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-4 border-t border-neutral-800 pt-8">
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-medium transition-colors"
                    >
                        <Github className="w-5 h-5" /> View Source
                    </a>
                    {project.demo && (
                        <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl ${project.bg} hover:brightness-125 border border-transparent ${project.color} font-medium transition-all`}
                        >
                            <ExternalLink className="w-5 h-5" /> Live Demo
                        </a>
                    )}
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 border-t border-neutral-800 pt-16">
                <div className="md:col-span-2 space-y-16">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-neutral-700"></span> Problem Statement
                        </h2>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            {project.problem}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-neutral-700"></span> Solution & Architecture
                        </h2>
                        <p className="text-lg text-neutral-400 leading-relaxed mb-6">
                            {project.solution}
                        </p>
                        <div className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800">
                            <p className="text-neutral-300 leading-relaxed text-sm font-mono">
                                {project.architecture}
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-neutral-700"></span> Technical Challenges
                        </h2>
                        <p className="text-lg text-neutral-400 leading-relaxed">
                            {project.challenges}
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="w-8 h-px bg-neutral-700"></span> Outcomes & Results
                        </h2>
                        <p className="text-lg text-neutral-400 leading-relaxed border-l-2 border-neon-cyan pl-6 italic">
                            {project.results}
                        </p>
                    </section>
                </div>

                <div className="md:col-span-1">
                    <div className="sticky top-32 p-6 rounded-2xl border border-neutral-800 bg-neutral-900/30 backdrop-blur-sm">
                        <h3 className="text-lg font-bold text-white mb-6">Key Features</h3>
                        <ul className="space-y-4">
                            {project.features.map((feature: string, i: number) => (
                                <li key={i} className="flex flex-col gap-1">
                                    <div className="flex items-start gap-3 text-neutral-300">
                                        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${project.color}`} />
                                        <span className="leading-tight">{feature}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}

export function generateStaticParams() {
    return Object.keys(projectData).map((slug) => ({ slug }));
}
