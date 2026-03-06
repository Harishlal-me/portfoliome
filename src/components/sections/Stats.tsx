"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const stats = [
    { value: 3, label: "Major Projects", suffix: "+" },
    { value: 10, label: "Technologies", suffix: "+" },
    { value: 9.51, label: "CGPA", suffix: "", decimals: 2 },
];

const Counter = ({ from = 0, to, decimals = 0, duration = 2 }: { from?: number, to: number, decimals?: number, duration?: number }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    const inView = useInView(nodeRef, { once: true });
    const [value, setValue] = useState(from);

    useEffect(() => {
        if (!inView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / (duration * 1000), 1);

            // Easing function (easeOutQuart)
            const easeProgress = 1 - Math.pow(1 - percentage, 4);
            const currentVal = from + (to - from) * easeProgress;

            setValue(currentVal);

            if (percentage < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                setValue(to);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [inView, from, to, duration]);

    return <span ref={nodeRef}>{value.toFixed(decimals)}</span>;
};

export const Stats = () => {
    return (
        <section className="py-20 relative border-t border-b border-neutral-900 bg-neutral-950/20">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            className="flex flex-col items-center justify-center text-center space-y-2 group"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                        >
                            <div className="text-4xl md:text-5xl font-black text-white group-hover:text-neon-cyan transition-colors bg-clip-text">
                                <Counter to={stat.value} decimals={stat.decimals} />
                                <span className="text-neon-cyan">{stat.suffix}</span>
                            </div>
                            <div className="text-sm md:text-base text-neutral-400 font-medium">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
