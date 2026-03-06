"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { OrbitClock } from "../ui/OrbitClock";

const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Achievements", href: "#achievements" },
    { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Active section tracking
            const sections = navLinks.map(link => link.name.toLowerCase());
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });

            if (currentSection) {
                setActiveSection(currentSection);
            } else if (window.scrollY < 100) {
                setActiveSection(""); // At top, no active section
            }
        };
        window.addEventListener("scroll", handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 max-w-6xl relative">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#" className="text-xl font-bold tracking-tighter text-white z-50 relative group transition-colors">
                        Harishlal<span className="text-neon-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">.</span>me
                    </a>

                    <div className="flex items-center gap-8 lg:gap-10">
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <div key={link.name} className="relative group">
                                    <a
                                        href={link.href}
                                        className={`text-sm font-medium transition-all duration-300 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] ${activeSection === link.name.toLowerCase() ? "text-white" : "text-neutral-400"
                                            }`}
                                    >
                                        {link.name}
                                    </a>

                                    {/* Subtle hover animated underline via CSS for non-active items */}
                                    <div className={`absolute -bottom-1 left-0 h-0.5 bg-neon-cyan/50 transition-all duration-300 w-0 group-hover:w-full ${activeSection === link.name.toLowerCase() ? 'hidden' : 'block'}`}></div>

                                    {/* Active Section animated underline via Framer Motion */}
                                    {activeSection === link.name.toLowerCase() && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-cyan shadow-[0_0_8px_#00f0ff]"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop Clock */}
                        <div className="hidden lg:block relative z-50">
                            <OrbitClock />
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden text-neutral-400 hover:text-white z-50 relative"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            title="Toggle Mobile Menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 bg-neutral-900/95 border border-neutral-800 rounded-2xl overflow-hidden backdrop-blur-xl"
                        >
                            <div className="flex flex-col p-2">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-base font-medium transition-colors px-4 py-3 rounded-xl m-1 ${activeSection === link.name.toLowerCase() ? "bg-neon-cyan/20 text-neon-cyan" : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                                            }`}
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};
