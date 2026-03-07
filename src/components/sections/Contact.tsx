"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Linkedin, Mail, Send, Phone, CheckCircle2 } from "lucide-react";

export const Contact = () => {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formsubmit.co/ajax/harishlaloff@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setStatus("success");
                form.reset();
                setTimeout(() => setStatus("idle"), 5000); // Reset after 5s
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };
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
                                <h2 className="text-3xl md:text-5xl font-bold mb-4">Let&apos;s Connect</h2>
                                <p className="text-neutral-400 text-lg max-w-md">
                                    I&apos;m always open to discussing new projects, creative ideas or
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
                                        <a href="mailto:harishlaloff@gmail.com" className="text-lg hover:underline decoration-neon-cyan">harishlaloff@gmail.com</a>
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

                                <div className="flex items-center gap-4 text-neutral-300 hover:text-green-400 transition-colors group">
                                    <div className="w-12 h-12 rounded-full bg-neutral-950 flex items-center justify-center border border-neutral-800 group-hover:border-green-400/50">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm text-neutral-500 font-medium">Call Me</h4>
                                        <a href="tel:+917598620239" className="text-lg hover:underline decoration-green-400">+91 7598620239</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-neutral-950 rounded-2xl p-6 md:p-8 border border-neutral-800 relative">
                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-950/90 rounded-2xl backdrop-blur-sm z-20"
                                >
                                    <CheckCircle2 className="w-16 h-16 text-neon-cyan mb-4" />
                                    <h3 className="text-2xl font-bold text-white mb-2 text-center">Message sent successfully</h3>
                                    <p className="text-neutral-400 text-center">I&apos;ll get back to you soon.</p>
                                </motion.div>
                            ) : null}

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {/* Formsubmit Configuration */}
                                <input type="hidden" name="_subject" value="New message from Harishlal Portfolio" />
                                <input type="hidden" name="_captcha" value="false" />
                                <input type="hidden" name="_template" value="table" />

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-1">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            disabled={status === "submitting"}
                                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors disabled:opacity-50"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            required
                                            disabled={status === "submitting"}
                                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors disabled:opacity-50"
                                            placeholder="Your Email"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-1">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={4}
                                            disabled={status === "submitting"}
                                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors resize-none disabled:opacity-50"
                                            placeholder="Tell me about your project, idea, or opportunity..."
                                        />
                                    </div>
                                </div>

                                {status === "error" && (
                                    <p className="text-red-400 text-sm">Something went wrong. Please try again or email me directly.</p>
                                )}

                                <Button variant="primary" type="submit" className="w-full" disabled={status === "submitting"}>
                                    <Send className="w-4 h-4 mr-2" />
                                    {status === "submitting" ? "Sending..." : "Send Message"}
                                </Button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
