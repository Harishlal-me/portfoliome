"use client";

import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Star, GitCommit, GitPullRequest, Code2, BookOpen } from "lucide-react";
import CountUp from "react-countup";
import { useRef } from "react";

interface GithubData {
    publicRepos: number;
    followers: number;
    totalStars: number;
    mostActiveRepo: string;
    topLanguage: string;
}

export const GitHubStats = () => {
    const [data, setData] = useState<GithubData | null>(null);
    const [loading, setLoading] = useState(true);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        const fetchGithubData = async () => {
            try {
                const username = "Harishlal-me";

                // Fetch User Profile
                const userRes = await fetch(`https://api.github.com/users/${username}`);
                const userData = await userRes.json();

                // Fetch Reposatories
                const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
                const reposData = await reposRes.json();

                let totalStars = 0;
                const languageCounts: Record<string, number> = {};
                let mostActiveRepo = "";
                // let maxPushes = 0; // Rough metric without full event API

                if (Array.isArray(reposData)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    reposData.forEach((repo: any) => {
                        totalStars += repo.stargazers_count;

                        // Top Language
                        if (repo.language) {
                            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
                        }

                        // Just taking the most recently updated repo as "most active" 
                        // as a fallback if we don't calculate raw commits
                        if (!mostActiveRepo) {
                            mostActiveRepo = repo.name;
                        }
                    });
                }

                let topLanguage = "Python";
                let maxLangCount = 0;
                for (const [lang, count] of Object.entries(languageCounts)) {
                    if (count > maxLangCount) {
                        maxLangCount = count;
                        topLanguage = lang;
                    }
                }

                setData({
                    publicRepos: userData.public_repos || 0,
                    followers: userData.followers || 0,
                    totalStars,
                    mostActiveRepo: mostActiveRepo || "portfolio",
                    topLanguage
                });
            } catch (error) {
                console.error("Error fetching GitHub data:", error);
                // Fallback data
                setData({
                    publicRepos: 15,
                    followers: 12,
                    totalStars: 45,
                    mostActiveRepo: "NLP-Safety-Suite",
                    topLanguage: "Python"
                });
            } finally {
                setLoading(false);
            }
        };

        fetchGithubData();
    }, []);

    const stats = data ? [
        {
            label: "Public Repositories",
            value: data.publicRepos,
            icon: BookOpen,
            color: "neon-cyan"
        },
        {
            label: "Total Stars Earned",
            value: data.totalStars,
            icon: Star,
            color: "neon-purple"
        },
        {
            label: "Top Language Used",
            value: data.topLanguage,
            isString: true,
            icon: Code2,
            color: "neon-pink"
        },
        {
            label: "Most Active Repo",
            value: data.mostActiveRepo,
            isString: true,
            icon: GitCommit,
            color: "white"
        }
    ] : [];

    return (
        <section id="github-stats" className="py-20 relative bg-neutral-950">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-12">
                        <Github className="w-8 h-8 text-neutral-400" />
                        <h2 className="text-3xl md:text-5xl font-bold">
                            GitHub <span className="text-neutral-500">Activity</span>
                        </h2>
                        <div className="h-px bg-neutral-800 flex-1 ml-4 hidden sm:block"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="h-32 rounded-2xl bg-neutral-900 border border-neutral-800 animate-pulse"></div>
                            ))
                        ) : (
                            stats.map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                                    className="relative group p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-colors overflow-hidden flex flex-col justify-between h-full min-h-[140px]"
                                >
                                    <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${stat.color}/10 rounded-full blur-2xl group-hover:bg-${stat.color}/20 transition-colors`}></div>

                                    <div className="flex items-center gap-3 mb-4 relative z-10">
                                        <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                                        <h3 className="text-sm text-neutral-400 font-medium">{stat.label}</h3>
                                    </div>

                                    <div className={`text-2xl md:text-3xl font-bold text-white relative z-10 break-words`}>
                                        {stat.isString ? (
                                            stat.value
                                        ) : (
                                            <CountUp
                                                end={stat.value as number}
                                                duration={2.5}
                                                useEasing={true}
                                                start={isInView ? 0 : undefined}
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-8 text-center"
                    >
                        <a
                            href="https://github.com/Harishlal-me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                        >
                            View full profile on GitHub <GitPullRequest className="w-4 h-4" />
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
