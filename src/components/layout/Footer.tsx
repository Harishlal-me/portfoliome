"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="py-8 border-t border-neutral-900 bg-neutral-950 mt-12">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-neutral-500 text-sm">
                    © {new Date().getFullYear()} Harishlal ME. Designed and built with Next.js & Framer Motion.
                </p>

                <div className="flex items-center gap-6">
                    <a href="https://github.com/harishlal-me" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                        <Github className="w-5 h-5" />
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href="https://linkedin.com/in/harishlal-me" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-neon-cyan transition-colors">
                        <Linkedin className="w-5 h-5" />
                        <span className="sr-only">LinkedIn</span>
                    </a>
                    <a href="mailto:meharishlal@gmail.com" className="text-neutral-500 hover:text-neon-purple transition-colors">
                        <Mail className="w-5 h-5" />
                        <span className="sr-only">Email</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};
