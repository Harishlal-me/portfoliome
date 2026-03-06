"use client";

import { motion } from "framer-motion";

const skillsData = [
    {
        category: "Languages",
        items: ["Python", "Java", "JavaScript", "HTML/CSS"],
        color: "text-neon-cyan",
        borderColor: "hover:border-neon-cyan/50",
    },
    {
        category: "Machine Learning / NLP",
        items: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face Transformers", "BERT"],
        color: "text-neon-purple",
        borderColor: "hover:border-neon-purple/50",
    },
    {
        category: "Web & Backend",
        items: ["React", "Node.js", "Express.js", "FastAPI", "REST APIs", "JWT"],
        color: "text-neon-pink",
        borderColor: "hover:border-neon-pink/50",
    },
    {
        category: "Databases",
        items: ["MySQL", "PostgreSQL", "Schema Design", "Query Optimization"],
        color: "text-neon-cyan",
        borderColor: "hover:border-neon-cyan/50",
    },
    {
        category: "Tools",
        items: ["Docker", "Streamlit", "Git", "Plotly", "PDFKit"],
        color: "text-neon-purple",
        borderColor: "hover:border-neon-purple/50",
    },
];

export const Skills = () => {
    return (
        <section id="skills" className="py-20 relative bg-neutral-950/50">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center gap-4">
                        <span className="text-neon-purple">02.</span> Technical Skills
                        <div className="h-px bg-neutral-800 flex-1 ml-4 hidden sm:block"></div>
                    </h2>

                    <motion.div
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: { staggerChildren: 0.15 }
                            }
                        }}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {skillsData.map((skillGroup, idx) => (
                            <motion.div
                                key={idx}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                }}
                                whileHover={{ y: -5 }}
                                className={`p-6 rounded-2xl bg-neutral-900 border border-neutral-800 transition-colors ${skillGroup.borderColor}`}
                            >
                                <h3 className={`text-xl font-bold mb-6 ${skillGroup.color}`}>
                                    {skillGroup.category}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {skillGroup.items.map((item, itemIdx) => (
                                        <motion.span
                                            key={itemIdx}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 + (itemIdx * 0.05) }}
                                            className="px-3 py-1.5 text-sm font-medium rounded-full bg-neutral-800/50 text-neutral-300 border border-neutral-700/50 hover:bg-neutral-800 transition-colors"
                                        >
                                            {item}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
