"use client";

import { motion } from "framer-motion";

export const GitHubActivity = () => {
    return (
        <section id="github" className="py-20 relative bg-neutral-950/20 perspective-1000">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 flex items-center gap-4">
                        <span className="text-neon-pink">06.</span> Open Source Activity
                        <div className="h-px bg-neutral-800 flex-1 ml-4 hidden sm:block"></div>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* GitHub Stats */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex flex-col justify-center items-center hover:border-neon-cyan/50 transition-colors shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-32 h-32 bg-neon-cyan/5 blur-3xl -ml-16 -mt-16 pointer-events-none" />
                            <h3 className="text-xl font-bold text-white mb-6 self-start relative z-10 w-full border-b border-neutral-800 pb-4">GitHub Stats</h3>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://github-readme-stats.vercel.app/api?username=Harishlal-me&theme=tokyonight&show_icons=true&hide_border=true&bg_color=00000000"
                                alt="Harishlal's GitHub Stats"
                                className="w-full max-w-md pointer-events-none drop-shadow-xl relative z-10"
                            />
                        </motion.div>

                        {/* Top Languages */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex flex-col justify-center items-center hover:border-neon-pink/50 transition-colors shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-neon-pink/5 blur-3xl -mr-16 -mb-16 pointer-events-none" />
                            <h3 className="text-xl font-bold text-white mb-6 self-start relative z-10 w-full border-b border-neutral-800 pb-4">Top Languages</h3>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://github-readme-stats.vercel.app/api/top-langs/?username=Harishlal-me&theme=tokyonight&layout=compact&hide_border=true&bg_color=00000000"
                                alt="Harishlal's Top Languages"
                                className="w-full max-w-sm pointer-events-none drop-shadow-xl relative z-10"
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
