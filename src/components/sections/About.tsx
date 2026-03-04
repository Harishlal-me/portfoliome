"use client";

import { motion } from "framer-motion";
import { User, Activity, BrainCircuit } from "lucide-react";

export const About = () => {
    return (
        <section id="about" className="py-20 relative">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center gap-4">
                        <span className="text-neon-cyan">01.</span> About Me
                        <div className="h-px bg-neutral-800 flex-1 ml-4 block sm:hidden md:block"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        {/* Bio */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.2 }
                                }
                            }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            className="space-y-6 text-neutral-400 text-lg leading-relaxed"
                        >
                            <motion.p variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                                I am an <strong className="text-white font-medium">AI/ML researcher</strong> focused on safety-critical NLP systems.
                                My work centers on developing intelligent systems that not only perform exceptionally but also adhere to principles of responsible AI.
                            </motion.p>
                            <motion.p variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                                Recently, I developed a BERT-based cyberbullying detection system achieving <strong className="text-neon-purple font-medium">94.5% recall</strong>,
                                minimizing false negatives in critical environments.
                            </motion.p>
                            <motion.p variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
                                I am currently an active UROP researcher, preparing a manuscript for an <strong className="text-neon-cyan font-medium">ICWSM 2026</strong> conference submission,
                                while also building scalable and performant production ML systems.
                            </motion.p>
                        </motion.div>

                        {/* Highlights Grid */}
                        <motion.div
                            variants={{
                                hidden: { opacity: 0 },
                                show: {
                                    opacity: 1,
                                    transition: { staggerChildren: 0.2, delayChildren: 0.4 }
                                }
                            }}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                        >
                            <motion.div
                                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-neon-cyan/50 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-full bg-neon-cyan/10 flex items-center justify-center mb-4 text-neon-cyan group-hover:scale-110 transition-transform">
                                    <BrainCircuit className="w-6 h-6" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">Safety-Critical ML</h3>
                                <p className="text-sm text-neutral-500">Optimizing for robustness and recall in high-stakes environments.</p>
                            </motion.div>

                            <motion.div
                                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                                whileHover={{ y: -5 }}
                                className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800 hover:border-neon-purple/50 transition-colors group"
                            >
                                <div className="w-12 h-12 rounded-full bg-neon-purple/10 flex items-center justify-center mb-4 text-neon-purple group-hover:scale-110 transition-transform">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">System Performance</h3>
                                <p className="text-sm text-neutral-500">Proficient in PyTorch, TensorFlow, and full-stack integration.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
