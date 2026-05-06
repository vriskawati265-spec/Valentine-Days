'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Circle } from 'lucide-react';

// --- Background Particles ---
const BackgroundHearts = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        y: '110vh',
                        x: `${(i * 10) + Math.random() * 5}%`,
                        scale: 0.5
                    }}
                    animate={{
                        opacity: [0, 0.2, 0],
                        y: '-10vh',
                        rotate: [0, 180],
                        scale: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        delay: i * 2,
                        ease: "linear"
                    }}
                    className="absolute text-red-500/10"
                >
                    <Heart size={30} fill="currentColor" />
                </motion.div>
            ))}
        </div>
    );
};

// --- Step 1 ---
const LoveModeStep = ({ onComplete }: { onComplete: () => void }) => {
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        if (isOn) {
            const timer = setTimeout(() => onComplete(), 3000);
            return () => clearTimeout(timer);
        }
    }, [isOn, onComplete]);

    return (
        <motion.div className="flex flex-col items-center justify-center relative z-10">
            <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl flex flex-col items-center space-y-6">
                <Heart className={`w-20 h-20 ${isOn ? 'text-red-500 fill-red-500' : 'text-white/20'}`} />

                <span className="text-3xl text-white">Love mode</span>

                <button
                    onClick={() => setIsOn(!isOn)}
                    className="w-24 h-12 bg-red-500 rounded-full"
                />
            </div>
        </motion.div>
    );
};

// --- Step 4 ---
const TypewriterStep = ({ onComplete }: { onComplete: () => void }) => {
    const text = "Happy Birthday Badasplenger"; // ✅ SUDAH DIGANTI
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        if (displayedText.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, 120);
            return () => clearTimeout(timer);
        } else {
            setTimeout(onComplete, 2000);
        }
    }, [displayedText, text, onComplete]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center min-h-screen p-4 relative z-10"
        >
            <h1 className="text-3xl sm:text-6xl md:text-8xl font-playfair text-white text-center leading-tight px-4">
                {displayedText}
            </h1>
        </motion.div>
    );
};

// --- MAIN ---
export default function InteractionFlow({ onFlowComplete }: { onFlowComplete: () => void }) {
    const [step, setStep] = useState(1);

    return (
        <div className="fixed inset-0 z-50 bg-[#060010] flex items-center justify-center overflow-hidden">

            <BackgroundHearts />

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <LoveModeStep onComplete={() => setStep(2)} />
                )}
                {step === 2 && (
                    <TypewriterStep onComplete={() => onFlowComplete()} />
                )}
            </AnimatePresence>

            <div className="absolute -top-20 -left-20 w-72 h-72 bg-red-900/20 blur-[60px] rounded-full" />
            <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-900/20 blur-[60px] rounded-full" />
        </div>
    );
}