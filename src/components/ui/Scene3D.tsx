"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { SiPython, SiReact, SiTensorflow, SiDocker, SiGit, SiNodedotjs, SiOpencv } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";

// The individual orbiting tech node
const TechNode = ({
    icon: Icon,
    label,
    radius,
    speed,
    angleOffset,
    color,
    orbitY = 0
}: {
    icon: any,
    label: string,
    radius: number,
    speed: number,
    angleOffset: number,
    color: string,
    orbitY?: number
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime() * speed + angleOffset;

        // Circular orbit
        groupRef.current.position.x = Math.cos(t) * radius;
        groupRef.current.position.z = Math.sin(t) * radius;
        groupRef.current.position.y = Math.sin(t * 2) * 0.2 + orbitY; // slight bobbing
    });

    return (
        <group ref={groupRef}>
            {/* The visual marker/node */}
            <Sphere args={[0.06, 16, 16]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
            </Sphere>

            {/* The HTML Icon floating above it */}
            <Html center position={[0, 0, 0]} zIndexRange={[100, 0]}>
                <div
                    className="relative flex items-center justify-center w-12 h-12 rounded-full bg-neutral-900/90 border border-neutral-700 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-125 hover:border-neon-cyan/80 cursor-pointer group"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <Icon className="w-6 h-6 transition-colors duration-300 group-hover:text-neon-cyan" style={{ color: hovered ? undefined : color }} />

                    {/* Tooltip */}
                    <AnimatePresence>
                        {hovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-950 border border-neutral-800 text-xs font-medium text-white px-3 py-1.5 rounded text-center pointer-events-none"
                            >
                                {label}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </Html>
        </group>
    );
};

// Generate static orbit path for the rings
const generateRingPoints = (radius: number, segments = 64) => {
    const points = [];
    for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return points;
};

// Represents a single orbital ring holding its own tech nodes
const OrbitRing = ({
    radius,
    tilt,
    nodes
}: {
    radius: number,
    tilt: [number, number, number],
    nodes: any[]
}) => {
    const ringRef = useRef<THREE.Group>(null);

    // Slowly rotate the entire ring group for extra gyroscope dynamic feel
    useFrame(() => {
        if (!ringRef.current) return;
        ringRef.current.rotation.z -= 0.001;
    });

    return (
        <group rotation={tilt} ref={ringRef}>
            <Line points={generateRingPoints(radius)} color="#ffffff" opacity={0.1} transparent lineWidth={1} />
            {nodes.map((tech, i) => (
                <TechNode
                    key={i}
                    icon={tech.icon}
                    label={tech.label}
                    radius={radius}
                    speed={tech.speed}
                    angleOffset={tech.offset}
                    color={tech.color}
                    orbitY={tech.orbitY}
                />
            ))}
        </group>
    );
};

const TechOrbitSystem = () => {
    const systemGroupRef = useRef<THREE.Group>(null);
    const coreRef = useRef<THREE.Group>(null);

    // Orbit Ring Definitions for Gyroscope Effect - Adjusted speeds for 20-40s per rotation (speed ~0.15 to 0.3 radians/sec)
    const rings = useMemo(() => [
        {
            radius: 1.5,
            tilt: [Math.PI / 6, 0, Math.PI / 8] as [number, number, number],
            nodes: [
                { icon: SiPython, label: "Machine Learning & Backend", speed: 0.2, offset: 0, color: "#3776AB", orbitY: 0 },
                { icon: SiOpencv, label: "Computer Vision", speed: 0.2, offset: Math.PI, color: "#5C3EE8", orbitY: 0 },
            ]
        },
        {
            radius: 1.9,
            tilt: [Math.PI / 2.5, 0, -Math.PI / 6] as [number, number, number],
            nodes: [
                { icon: SiReact, label: "Frontend Framework", speed: -0.15, offset: 0, color: "#61DAFB", orbitY: 0 },
                { icon: SiTensorflow, label: "Deep Learning", speed: -0.15, offset: Math.PI, color: "#FF6F00", orbitY: 0 },
            ]
        },
        {
            radius: 2.3,
            tilt: [-Math.PI / 3, 0, Math.PI / 4] as [number, number, number],
            nodes: [
                { icon: SiDocker, label: "Containerization", speed: 0.18, offset: 0, color: "#2496ED", orbitY: 0 },
                { icon: SiGit, label: "Version Control", speed: 0.18, offset: Math.PI * 0.66, color: "#F05032", orbitY: 0 },
                { icon: SiNodedotjs, label: "Backend Runtime", speed: 0.18, offset: Math.PI * 1.33, color: "#339933", orbitY: 0 },
            ]
        }
    ], []);

    useFrame((state) => {
        if (!systemGroupRef.current || !coreRef.current) return;

        // Cursor Tracking logic using lerp for smooth physics to tilt the ENTIRE system slightly
        const targetX = (state.pointer.x * Math.PI) / 8;
        const targetY = (state.pointer.y * Math.PI) / 8;

        const currentRotX = systemGroupRef.current.rotation.x;
        const currentRotY = systemGroupRef.current.rotation.y;

        // Lerp towards cursor for parallax
        systemGroupRef.current.rotation.x = THREE.MathUtils.lerp(currentRotX, -targetY, 0.05);
        systemGroupRef.current.rotation.y = THREE.MathUtils.lerp(currentRotY, targetX, 0.05);

        // Gentle tilt for the core image based on mouse movement
        coreRef.current.rotation.x = THREE.MathUtils.lerp(coreRef.current.rotation.x, -state.pointer.y * 0.5, 0.05);
        coreRef.current.rotation.y = THREE.MathUtils.lerp(coreRef.current.rotation.y, state.pointer.x * 0.5, 0.05);
    });

    return (
        <Float speed={2.0} rotationIntensity={0.1} floatIntensity={1.0}>
            <group ref={systemGroupRef}>

                {/* Central AI/Profile Core */}
                <group ref={coreRef}>
                    {/* Glowing aura behind image */}
                    <Sphere args={[0.55, 32, 32]}>
                        <meshBasicMaterial color="#00f0ff" transparent opacity={0.1} />
                    </Sphere>
                    <Sphere args={[0.65, 32, 32]}>
                        <meshBasicMaterial color="#7000ff" transparent opacity={0.05} />
                    </Sphere>

                    {/* The HTML Profile Image rendering natively to bypass complex 3D texturing for UI purposes */}
                    <Html center zIndexRange={[50, 0]} className="pointer-events-none">
                        <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full shadow-[0_0_50px_rgba(0,240,255,0.3)] border-2 border-neon-cyan/40 bg-neutral-900 p-1 flex items-center justify-center pointer-events-auto group overflow-hidden">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-purple/20 to-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/profilepic.jpeg"
                                alt="Harishlal"
                                className="w-full h-full object-cover rounded-full filter brightness-90 group-hover:brightness-110 transition-all duration-500"
                            />
                        </div>
                    </Html>
                </group>

                {/* Multi-Axis Orbital Rings */}
                {rings.map((ring, i) => (
                    <OrbitRing
                        key={i}
                        radius={ring.radius}
                        tilt={ring.tilt}
                        nodes={ring.nodes}
                    />
                ))}

            </group>
        </Float>
    );
};

export const Scene3D = () => {
    return (
        <div className="w-full h-[500px] md:h-full md:absolute md:top-0 md:right-0 md:w-[55%] -z-5 pointer-events-none md:pointer-events-auto flex items-center justify-center">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                className="w-full h-full"
                dpr={[1, 2]} // Optimize rendering pixel ratio
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#00f0ff" />
                <TechOrbitSystem />
            </Canvas>
        </div>
    );
};
