"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const AnimatedCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    // Smooth spring configuration
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(0, springConfig);
    const cursorY = useSpring(0, springConfig);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX - 16); // Center offset
            cursorY.set(e.clientY - 16);
        };

        const updateHoverState = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable =
                window.getComputedStyle(target).cursor === "pointer" ||
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button";

            setIsHovering(isClickable);
        };

        window.addEventListener("mousemove", updateMousePosition);
        window.addEventListener("mouseover", updateHoverState);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
            window.removeEventListener("mouseover", updateHoverState);
        };
    }, [cursorX, cursorY]);

    // Don't render on mobile devices
    if (typeof window !== "undefined" && window.innerWidth < 768) return null;

    return (
        <>
            {/* Main Cursor (spring physics) */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border border-neon-cyan rounded-full pointer-events-none z-[100] mix-blend-difference flex items-center justify-center bg-neon-cyan/5"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgba(0, 240, 255, 0.1)" : "rgba(0, 240, 255, 0.05)",
                    borderColor: isHovering ? "rgba(0, 240, 255, 0.8)" : "#00f0ff",
                    boxShadow: isHovering ? "0 0 20px rgba(0,240,255,0.6), inset 0 0 10px rgba(0,240,255,0.4)" : "0 0 10px rgba(0,240,255,0.3), inset 0 0 5px rgba(0,240,255,0.2)"
                }}
            >
                {/* Center Letter H */}
                <motion.span
                    className="text-neon-cyan font-bold font-sans leading-none flex items-center justify-center"
                    style={{
                        fontSize: "14px",
                        textShadow: "0 0 8px rgba(0,240,255,0.8)"
                    }}
                    animate={{
                        scale: isHovering ? 0.8 : 1, // slightly scale down the text to counteract the 1.5x ring expansion so it looks clean
                        opacity: isHovering ? 1 : 0.9
                    }}
                >
                    H
                </motion.span>
            </motion.div>

            {/* Keep a tiny exact-tracking dot for pixel precision clicking underneath */}
            <motion.div
                className="fixed top-0 left-0 w-1 h-1 bg-white rounded-full pointer-events-none z-[101] mix-blend-difference"
                animate={{
                    x: mousePosition.x - 2,
                    y: mousePosition.y - 2,
                    opacity: isHovering ? 0 : 0.5
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0 }}
            />
        </>
    );
};
