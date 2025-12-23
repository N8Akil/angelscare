"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const heroImages = [
    "/images/home-health-care.png",
    "/images/elderly-home-care.png",
    "/images/consumer-directed-services.png",
    "/images/personal-care.png",
];

export function HeroImageCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Shuffle function for random order
    const getRandomIndex = useCallback((excludeIndex: number) => {
        const availableIndices = heroImages
            .map((_, i) => i)
            .filter((i) => i !== excludeIndex);
        return availableIndices[Math.floor(Math.random() * availableIndices.length)];
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true);

            // After fade out, change image
            setTimeout(() => {
                setCurrentIndex((prev) => getRandomIndex(prev));
                setIsTransitioning(false);
            }, 500); // Half of transition duration
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [getRandomIndex]);

    return (
        <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
            {/* Background blur layer */}
            <div className="absolute inset-0 bg-brand-navy/5" />

            {/* Image layers - stack all images, control visibility with opacity */}
            {heroImages.map((src, index) => (
                <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex && !isTransitioning
                            ? "opacity-100"
                            : "opacity-0"
                    }`}
                >
                    <Image
                        src={src}
                        alt="Angel's Care Home Health"
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                </div>
            ))}

            {/* Gradient overlay for smooth edge blending */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-bg-base/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base/40 to-transparent" />

            {/* Subtle vignette effect */}
            <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(27,59,95,0.15)]" />
        </div>
    );
}
