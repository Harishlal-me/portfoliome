"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Torus, Html, Line, Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import { SiPython, SiPytorch, SiReact, SiTensorflow, SiDocker, SiGit, SiNextdotjs } from "react-icons/si";
import { Cpu } from "lucide-react";

// The individual orbiting tech node
const TechNode = ({
    icon: Icon,
    radius,
    speed,
    angleOffset,
    color,
    orbitY = 0 // Some orbit planes can be tilted or offset slightly
}: {
    icon: any,
    radius: number,
    speed: number,
    angleOffset: number,
    color: string,
    orbitY?: number
}) => {
    const groupRef = useRef<THREE.Group>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime() * speed + angleOffset;

        // Circular orbit
        groupRef.current.position.x = Math.cos(t) * radius;
        groupRef.current.position.z = Math.sin(t) * radius;
        groupRef.current.position.y = Math.sin(t * 2) * 0.2 + orbitY; // slight bobbing
    });

    // Provide predefined tailwind text colors roughly matching the brand hexes
    // Or just manually inject hex to style of a deeply nested span
    return (
        <group ref={groupRef}>
            {/* The visual marker/node */}
            <Sphere args={[0.08, 16, 16]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
            </Sphere>

            {/* The HTML Icon floating above it */}
            <Html center position={[0, 0.4, 0]}>
                <div
                    ref={contentRef}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900/80 border border-neutral-700 backdrop-blur-md shadow-lg transition-transform hover:scale-125 hover:border-neutral-500"
                >
                    <Icon className="w-5 h-5 text-white" />
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
    useFrame((state) => {
        if (!ringRef.current) return;
        ringRef.current.rotation.z -= 0.002;
    });

    return (
        <group rotation={tilt} ref={ringRef}>
            <Line points={generateRingPoints(radius)} color="#ffffff" opacity={0.15} transparent lineWidth={1} />
            {nodes.map((tech, i) => (
                <TechNode
                    key={i}
                    icon={tech.icon}
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
    const coreRef = useRef<THREE.Mesh>(null);

    // Orbit Ring Definitions for Gyroscope Effect
    const rings = useMemo(() => [
        {
            radius: 1.3,
            tilt: [Math.PI / 6, 0, Math.PI / 8] as [number, number, number], // ~30 deg tilt
            nodes: [
                { icon: SiPython, speed: 0.3, offset: 0, color: "#3776AB", orbitY: 0 },
                { icon: SiPytorch, speed: 0.3, offset: Math.PI, color: "#EE4C2C", orbitY: 0 },
            ]
        },
        {
            radius: 1.6,
            tilt: [Math.PI / 2, 0, -Math.PI / 6] as [number, number, number], // ~90 deg vertical tilt
            nodes: [
                { icon: SiReact, speed: -0.25, offset: 0, color: "#61DAFB", orbitY: 0 },
                { icon: SiTensorflow, speed: -0.25, offset: Math.PI, color: "#FF6F00", orbitY: 0 },
            ]
        },
        {
            radius: 1.9,
            tilt: [-Math.PI / 3, 0, Math.PI / 4] as [number, number, number], // ~60 deg steep tilt
            nodes: [
                { icon: SiDocker, speed: 0.2, offset: 0, color: "#2496ED", orbitY: 0 },
                { icon: SiGit, speed: 0.2, offset: Math.PI * 0.66, color: "#F05032", orbitY: 0 },
                { icon: SiNextdotjs, speed: 0.2, offset: Math.PI * 1.33, color: "#FFFFFF", orbitY: 0 },
            ]
        }
    ], []);

    useFrame((state) => {
        if (!systemGroupRef.current || !coreRef.current) return;

        const time = state.clock.getElapsedTime();

        // Idle core rotation
        coreRef.current.rotation.y = time * 0.2;
        coreRef.current.rotation.x = time * 0.1;

        // Cursor Tracking logic using lerp for smooth physics to tilt the ENTIRE system slightly
        const targetX = (state.pointer.x * Math.PI) / 4;
        const targetY = (state.pointer.y * Math.PI) / 4;

        const currentRotX = systemGroupRef.current.rotation.x;
        const currentRotY = systemGroupRef.current.rotation.y;

        // Lerp towards cursor
        systemGroupRef.current.rotation.x = THREE.MathUtils.lerp(currentRotX, -targetY, 0.05);
        systemGroupRef.current.rotation.y = THREE.MathUtils.lerp(currentRotY, targetX, 0.05);
    });

    return (
        <Float speed={2.0} rotationIntensity={0.1} floatIntensity={1.0}>
            <group ref={systemGroupRef}>

                {/* Central AI/Chip Core */}
                <group>
                    {/* The physical core chip */}
                    <Icosahedron ref={coreRef} args={[0.5, 1]}>
                        <meshPhysicalMaterial
                            color="#0a0a0a"
                            roughness={0.2}
                            metalness={0.8}
                            wireframe={false}
                        />
                    </Icosahedron>

                    {/* Core wireframe shell */}
                    <Icosahedron args={[0.6, 2]}>
                        <meshBasicMaterial color="#00f0ff" wireframe transparent opacity={0.3} />
                    </Icosahedron>

                    {/* Glowing center indicator */}
                    <Html center zIndexRange={[50, 0]}>
                        <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-[0_0_30px_#00f0ff] opacity-80 animate-pulse bg-neutral-900/50">
                            <Cpu className="text-neon-cyan w-6 h-6" />
                        </div>
                    </Html>

                    {/* Inner glowing sphere */}
                    <Sphere args={[0.3, 32, 32]}>
                        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
                    </Sphere>
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
        <div className="w-full h-[500px] md:h-full md:absolute md:top-0 md:right-0 md:w-1/2 -z-5 pointer-events-none md:pointer-events-auto flex items-center justify-center">
            <Canvas
                camera={{ position: [0, 1, 7], fov: 45 }}
                className="w-full h-full cursor-crosshair"
                dpr={[1, 2]} // Optimize rendering pixel ratio
            >
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#00f0ff" />
                <spotLight position={[0, 5, 0]} intensity={1.5} penumbra={1} color="#7000ff" />
                <TechOrbitSystem />
            </Canvas>
        </div>
    );
};
