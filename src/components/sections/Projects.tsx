"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight, ShieldCheck, Building2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const projects = [
    {
        title: "Cyberbullying Detection System with BERT",
        slug: "cyberbullying-detection",
        icon: ShieldCheck,
        description: "Fine-tuned a BERT model achieving 94.5% recall and 94.19% F1-score for cyberbullying detection with a safety-critical focus on minimizing false negatives. Deployed as a Streamlit web application and extended into an ICWSM 2026 research submission.",
        tech: ["PyTorch", "BERT", "Python", "Streamlit"],
        github: "https://github.com/Harishlal-me/cyberbullydectetion",
        demo: "https://github.com/Harishlal-me/cyberbullydectetion",
        color: "neon-purple",
        gradient: "from-purple-500/20 to-purple-900/20",
    },
    {
        title: "CampusSafe – Lost & Found",
        slug: "campussafe",
        icon: Building2,
        description: "Full-stack campus lost-and-found management platform with intelligent item matching and automated admin workflows. Built with a normalized MySQL schema, JWT API, and role-based access control. Implemented a Jaccard similarity matching engine.",
        tech: ["React", "Express.js", "MySQL", "Tailwind CSS"],
        github: "https://github.com/Harishlal-me/campussafe",
        demo: "https://github.com/Harishlal-me/campussafe",
        color: "neon-cyan",
        gradient: "from-cyan-500/20 to-cyan-900/20",
    },
    {
        title: "AI Stock Analysis System",
        slug: "stock-analysis",
        icon: TrendingUp,
        description: "End-to-end machine learning pipeline deployed as a Streamlit dashboard with interactive visualizations for six major equities. Built for educational purposes to explore AI techniques applied to financial data.",
        tech: ["Python", "Streamlit", "Plotly", "Scikit-learn"],
        github: "https://github.com/Harishlal-me/hstockpredictorl",
        demo: "https://github.com/Harishlal-me/hstockpredictorl",
        color: "neon-pink",
        gradient: "from-pink-500/20 to-pink-900/20",
    },
];

const TiltCard = ({ children, color, idx }: { children: React.ReactNode, color: string, idx: number }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
            className="group relative flex flex-col justify-between rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-500 transition-colors duration-300 shadow-xl"
        >
            <div
                style={{
                    transform: "translateZ(30px)",
                }}
                className={`absolute inset-0 bg-${color}/10 rounded-2xl blur-xl transition-opacity opacity-0 group-hover:opacity-100 dark:bg-${color}/20 pointer-events-none`}
            />

            <div
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
                className="relative z-10 flex flex-col h-full bg-neutral-900 overflow-hidden rounded-2xl"
            >
                {children}
            </div>
        </motion.div>
    );
};

export const Projects = () => {
    return (
        <section id="projects" className="py-20 relative perspective-1000">
            <div className="container px-4 md:px-6 mx-auto max-w-6xl">
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
                                {/* Thumbnail Area */}
                                <div className={`h-48 w-full bg-gradient-to-br ${project.gradient} border-b border-neutral-800 flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500`}>
                                    <project.icon className={`w-20 h-20 text-${project.color} opacity-80`} />
                                    <div className="absolute inset-0 bg-neutral-950/20" />
                                </div>

                                {/* Content Area */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all line-clamp-2">
                                        {project.title}
                                    </h3>

                                    <p className="text-neutral-400 mb-6 flex-grow text-sm leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tech.map((tech, techIdx) => (
                                            <span
                                                key={techIdx}
                                                className="text-xs font-mono text-neutral-300 bg-neutral-800/80 px-2 py-1 rounded border border-neutral-700/50"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-800/50">
                                        <div className="flex gap-2">
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors"
                                            >
                                                <Github className="w-4 h-4" />
                                                <span className="sr-only">GitHub Repository</span>
                                            </a>
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 rounded-lg bg-neutral-800 border border-neutral-700 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                                <span className="sr-only">Live Demo</span>
                                            </a>
                                        </div>
                                        <Link
                                            href={`/projects/${project.slug}`}
                                            className={`flex items-center gap-2 text-sm font-bold text-neutral-300 hover:text-${project.color} transition-colors`}
                                        >
                                            Case Study <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </TiltCard>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
