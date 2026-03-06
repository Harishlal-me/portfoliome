"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const OrbitClock = () => {
    const [time, setTime] = useState(new Date());
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) {
        return <div className="w-12 h-12"></div>; // Placeholder
    }

    const seconds = time.getSeconds();
    const minutes = time.getMinutes();
    const hours = time.getHours();

    // Calculate rotation angles (0 at top, clockwise)
    const secAngle = (seconds / 60) * 360;
    const minAngle = (minutes / 60) * 360 + (seconds / 60) * 6; // Add smooth inter-minute rotation
    const hourAngle = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

    return (
        <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-neutral-900/50 backdrop-blur-md border border-neutral-800 shadow-lg group">
            {/* Tooltip on Hover */}
            <div className="absolute top-14 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap bg-neutral-950 border border-neutral-800 text-xs text-neutral-400 px-2 py-1 rounded shadow-lg">
                <span className="text-neon-cyan">{hours.toString().padStart(2, '0')}</span>:
                <span className="text-neon-purple">{minutes.toString().padStart(2, '0')}</span>:
                <span className="text-neon-pink">{seconds.toString().padStart(2, '0')}</span>
            </div>

            {/* Core dot */}
            <div className="absolute w-[3px] h-[3px] rounded-full bg-white shadow-[0_0_5px_#fff]"></div>

            {/* Hours Ring */}
            <div className="absolute w-4 h-4 rounded-full border border-neutral-700/50"></div>
            <motion.div
                className="absolute w-4 h-4 rounded-full"
                animate={{ rotate: hourAngle }}
                transition={{ duration: 0.5, ease: "linear" }}
            >
                <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_8px_#00f0ff]"></div>
            </motion.div>

            {/* Minutes Ring */}
            <div className="absolute w-7 h-7 rounded-full border border-neutral-700/50"></div>
            <motion.div
                className="absolute w-7 h-7 rounded-full"
                animate={{ rotate: minAngle }}
                transition={{ duration: 0.5, ease: "linear" }}
            >
                <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-neon-purple shadow-[0_0_8px_#b026ff]"></div>
            </motion.div>

            {/* Seconds Ring */}
            <div className="absolute w-10 h-10 rounded-full border border-neutral-700/50"></div>
            <motion.div
                className="absolute w-10 h-10 rounded-full"
                animate={{ rotate: secAngle }}
                transition={{ duration: 0.2, ease: "backOut" }} // Slight snap effect for seconds
            >
                <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neon-pink shadow-[0_0_8px_#ff007f]"></div>
            </motion.div>
        </div>
    );
};
