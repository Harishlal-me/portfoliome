"use client";

import { motion, Variants } from "framer-motion";

interface AnimatedTextProps {
    text: string;
    className?: string;
    delay?: number;
}

const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.03, delayChildren: i * 0.1 },
    }),
};

const child: Variants = {
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
    hidden: {
        opacity: 0,
        y: 20,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100,
        },
    },
};

export const AnimatedText = ({ text, className = "", delay = 0 }: AnimatedTextProps) => {
    const letters = Array.from(text);

    return (
        <motion.div
            className={`overflow-hidden flex flex-wrap ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
            custom={delay}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};
