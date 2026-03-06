"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GitBranch, GitCommit, Star, FolderGit2 } from "lucide-react"; // Note: using closest lucide icons

export const GitHubActivity = () => {
    const [stats, setStats] = useState({
        totalRepos: 0,
        topRepo: "Loading...",
        recentRepo: "Loading...",
        commits: "500+", // Static placeholder avoiding API auth limit for total commits
        loading: true
    });

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                // Fetch User info for public repos count
                const userRes = await fetch("https://api.github.com/users/Harishlal-me");
                const userData = await userRes.json();

                // Fetch Repos for Top Repo (most starred/forked)
                const reposRes = await fetch("https://api.github.com/users/Harishlal-me/repos?sort=stargazers_count&direction=desc&per_page=1");
                const reposData = await reposRes.json();
                const topRepo = reposData[0]?.name || "portfolio-me";

                // Fetch Events for Recent Repo
                const eventsRes = await fetch("https://api.github.com/users/Harishlal-me/events/public?per_page=20");
                const eventsData = await eventsRes.json();
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const pushEvent = eventsData.find((e: any) => e.type === "PushEvent");
                const recentRepo = pushEvent ? pushEvent.repo.name.split("/").pop() : topRepo;

                setStats({
                    totalRepos: userData.public_repos || 25,
                    topRepo: topRepo,
                    recentRepo: recentRepo,
                    commits: "500+", // Hard to fetch accurately without token, standard fallback
                    loading: false
                });
            } catch (error) {
                console.error("Error fetching GitHub data:", error);
                setStats(s => ({ ...s, loading: false }));
            }
        };

        fetchGitHubData();
    }, []);

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
                        {/* GitHub Stats Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex flex-col justify-start items-start hover:border-neon-cyan/50 transition-colors shadow-2xl relative overflow-hidden h-full"
                        >
                            <div className="absolute top-0 left-0 w-32 h-32 bg-neon-cyan/5 blur-3xl -ml-16 -mt-16 pointer-events-none" />
                            <h3 className="text-xl font-bold text-white mb-6 relative z-10 w-full border-b border-neutral-800 pb-4">GitHub Stats</h3>

                            <div className="w-full grid grid-cols-1 gap-4 relative z-10 mt-2">
                                {/* Total Repositories */}
                                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between group hover:border-neon-cyan/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <FolderGit2 className="text-neon-cyan w-5 h-5" />
                                        <span className="text-neutral-300 font-medium">Total Repositories</span>
                                    </div>
                                    <span className="text-white font-bold text-lg">{stats.loading ? "..." : stats.totalRepos}</span>
                                </div>

                                {/* Top Repository */}
                                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between group hover:border-neon-purple/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Star className="text-neon-purple w-5 h-5" />
                                        <span className="text-neutral-300 font-medium">Top Repository</span>
                                    </div>
                                    <span className="text-white font-bold truncate max-w-[120px]">{stats.topRepo}</span>
                                </div>

                                {/* Total Commits */}
                                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex items-center justify-between group hover:border-neon-pink/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <GitCommit className="text-neon-pink w-5 h-5" />
                                        <span className="text-neutral-300 font-medium">Total Commits</span>
                                    </div>
                                    <span className="text-white font-bold text-lg">{stats.commits}</span>
                                </div>

                                {/* Recently Committed */}
                                <div className="p-4 bg-neutral-950 rounded-xl border border-neutral-800 flex flex-col gap-2 group hover:border-green-400/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <GitBranch className="text-green-400 w-5 h-5" />
                                        <span className="text-neutral-300 font-medium">Recently Committed</span>
                                    </div>
                                    <span className="text-white font-bold truncate text-sm ml-8 text-neutral-400">{stats.recentRepo}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Top Languages Panel */}
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
                                src="https://github-readme-stats-eight-theta.vercel.app/api/top-langs/?username=Harishlal-me&theme=tokyonight&layout=compact&hide_border=true&bg_color=00000000"
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
