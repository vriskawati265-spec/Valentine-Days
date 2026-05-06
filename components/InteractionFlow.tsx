"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TypewriterStep = ({ onFlowComplete }: { onFlowComplete: () => void }) => {
    const text = "happy birthday badasplenger";

    // ✅ FIX: pakai 1.jpg - 50.jpg
    const images = Array.from({ length: 50 }, (_, i) => `/${i + 1}.jpg`);

    const [displayedText, setDisplayedText] = useState("");
    const [showImages, setShowImages] = useState(false);
    const [index, setIndex] = useState(0);
    const [isDone, setIsDone] = useState(false);

    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    // TYPEWRITER
    useEffect(() => {
        if (displayedText.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, 80);
            return () => clearTimeout(timer);
        }

        const timer = setTimeout(() => {
            setShowImages(true);

            audioRef.current?.play().catch(() => {
                console.log("autoplay diblok");
            });
        }, 600);

        return () => clearTimeout(timer);
    }, [displayedText]);

    // SLIDESHOW
    useEffect(() => {
        if (!showImages) return;

        const interval = setInterval(() => {
            setIndex((prev) => {
                if (prev < images.length - 1) return prev + 1;
                return prev;
            });
        }, 1300);

        return () => clearInterval(interval);
    }, [showImages, images.length]);

    // FINISH
    useEffect(() => {
        if (index === images.length - 1 && !isDone) {
            const timer = setTimeout(() => {
                setIsDone(true);
                onFlowComplete();
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [index, images.length, isDone, onFlowComplete]);

    return (
        <div className="fixed inset-0 bg-black overflow-hidden">

            <audio ref={audioRef} src="/tumblrgirl.mp3" loop />

            <div className="absolute top-12 w-full text-center z-20">
                <h1 className="text-xl sm:text-3xl md:text-5xl text-white font-semibold px-4">
                    {displayedText}
                </h1>
            </div>

            <AnimatePresence mode="wait">
                {showImages && (
                    <motion.img
                        key={index}
                        src={images[index]} // ✅ bersih, tanpa encodeURI
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 1.4 }}
                    />
                )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
    );
};

export default TypewriterStep;