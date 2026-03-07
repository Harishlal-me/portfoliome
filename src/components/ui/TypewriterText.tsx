"use client";

import { motion } from "framer-motion";

export const TypewriterText = ({ text, className = "", delay = 0 }: { text: string, className?: string, delay?: number }) => {
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: delay },
        },
    };

    const child = {
        hidden: { opacity: 0, display: "none" },
        visible: {
            opacity: 1,
            display: "inline",
        },
    };

    return (
        <motion.span
            className={className}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
        >
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
                {letters.map((letter, index) => (
                    <motion.span variants={child} key={index}>
                        {letter}
                    </motion.span>
                ))}
            </span>
        </motion.span>
    );
};
