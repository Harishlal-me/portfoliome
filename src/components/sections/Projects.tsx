"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Code2 } from "lucide-react";

const projects = [
    {
        title: "Cyberbullying Detection System with BERT",
        description: "Fine-tuned a BERT model achieving 94.5% recall and 94.19% F1-score for cyberbullying detection with a safety-critical focus on minimizing false negatives. Deployed as a Streamlit web application and extended into an ICWSM 2026 research submission.",
        tech: ["PyTorch", "BERT", "Hugging Face Transformers", "Python", "Streamlit"],
        github: "https://github.com/Harishlal-me/cyberbullydectetion",
        demo: null,
        color: "neon-purple",
    },
    {
        title: "CampusSafe – Campus Lost & Found Management System",
        description: "Full-stack campus lost-and-found management platform with intelligent item matching and automated admin workflows.\n\nBuilt a full-stack system with a normalized 11-table MySQL schema, JWT-secured REST API, and role-based access control for students and admins. Implemented a Jaccard similarity matching engine (40–95% confidence scoring) and an admin dashboard with automated institutional PDF reports.",
        tech: ["React", "Node.js", "Express.js", "MySQL", "JWT", "Tailwind CSS", "PDFKit"],
        github: "https://github.com/Harishlal-me/campussafe",
        demo: null,
        color: "neon-cyan",
    },
    {
        title: "AI-Driven Stock Analysis System",
        description: "End-to-end machine learning pipeline (feature engineering → model training → live inference) deployed as a Streamlit dashboard with interactive visualizations for six major equities (AAPL, MSFT, GOOGL, AMZN, TSLA, NVDA). Built for educational purposes to explore AI techniques applied to financial data.",
        tech: ["Python", "Streamlit", "Plotly", "Scikit-learn"],
        github: "https://github.com/Harishlal-me/hstockpredictorl",
        demo: null,
        color: "neon-pink",
    },
];

import { useRef } from "react";
import { useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const TiltCard = ({ children, color, idx }: { children: React.ReactNode, color: string, idx: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            className="group relative flex flex-col justify-between p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-500 transition-colors duration-300"
        >
            <div
                style={{
                    transform: "translateZ(50px)",
                }}
                className={`absolute inset-0 bg-${color}/10 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100 dark:bg-${color}/20 pointer-events-none`}
            />

            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="relative z-10 flex flex-col h-full bg-neutral-900/40 p-1 rounded-2xl"
            >
                {children}
            </div>
        </motion.div>
    );
};

export const Projects = () => {
    return (
        <section id="projects" className="py-20 relative perspective-1000">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center gap-4">
                        <span className="text-neon-pink">03.</span> Featured Projects
                        <div className="h-px bg-neutral-800 flex-1 ml-4 hidden sm:block"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, idx) => (
                            <TiltCard key={idx} color={project.color} idx={idx}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-12 h-12 rounded-full bg-${project.color}/10 flex items-center justify-center text-${project.color}`}>
                                        <Code2 className="w-6 h-6" />
                                    </div>
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-400 hover:text-white transition-colors"
                                    >
                                        <Github className="w-6 h-6" />
                                        <span className="sr-only">GitHub Repository</span>
                                    </a>
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all">
                                    {project.title}
                                </h3>

                                <p className="text-neutral-400 mb-6 flex-grow text-sm leading-relaxed">
                                    {project.description}
                                </p>

                                <ul className="flex flex-wrap gap-2 mt-auto">
                                    {project.tech.map((tech, techIdx) => (
                                        <li
                                            key={techIdx}
                                            className="text-xs font-mono text-neutral-300 bg-neutral-800/80 px-2 py-1 rounded"
                                        >
                                            {tech}
                                        </li>
                                    ))}
                                </ul>
                            </TiltCard>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
