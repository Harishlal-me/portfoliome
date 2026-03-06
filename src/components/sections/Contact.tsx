"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Linkedin, Mail, Github, Send } from "lucide-react";

export const Contact = () => {
    return (
        <section id="contact" className="py-20 relative">
            <div className="container px-4 md:px-6 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 md:p-12 relative overflow-hidden"
                >
                    {/* Decorative glow */}
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-cyan/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-purple/20 rounded-full blur-[100px] pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-4">Let's Connect</h2>
                                <p className="text-neutral-400 text-lg max-w-md">
                                    I'm always open to discussing new projects, creative ideas or
                                    opportunities to be part of your visions.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-neutral-300 hover:text-neon-cyan transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-neutral-950 flex items-center justify-center border border-neutral-800 group-hover:border-neon-cyan/50">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-neutral-500 font-medium">Email Me</h4>
                                        <a href="mailto:meharishlal@gmail.com" className="text-lg hover:underline decoration-neon-cyan">meharishlal@gmail.com</a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-neutral-300 hover:text-neon-purple transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-neutral-950 flex items-center justify-center border border-neutral-800 group-hover:border-neon-purple/50">
                                        <Linkedin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-neutral-500 font-medium">Connect on LinkedIn</h4>
                                        <a href="https://linkedin.com/in/harishlal-me" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline decoration-neon-purple">harishlal-me</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-950 rounded-2xl p-6 md:p-8 border border-neutral-800">
                            <form
                                action="https://formsubmit.co/meharishlal@gmail.com"
                                method="POST"
                                className="space-y-6"
                            >
                                {/* Formsubmit Configuration */}
                                <input type="hidden" name="_subject" value="New Message from Portfolio!" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_template" value="box" />
                                <input type="hidden" name="_next" value="https://harishlal-me.vercel.app/" />

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-1">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={4}
                                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                                            placeholder="Tell me about your project..."
                                        />
                                    </div>
                                </div>
                                <Button variant="primary" type="submit" className="w-full">
                                    <Send className="w-4 h-4 mr-2" /> Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
