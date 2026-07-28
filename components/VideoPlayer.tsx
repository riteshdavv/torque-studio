"use client";

import React, { useEffect, useRef, useState, ButtonHTMLAttributes } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cn = (...classes: (string | boolean | undefined | null)[]) =>
    classes.filter(Boolean).join(" ");

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
    ({ className, children, ...props }, ref) => (
        <button
            ref={ref}
            className={cn(
                "inline-flex items-center justify-center transition-opacity hover:opacity-60",
                "text-white focus:outline-none",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
);
CustomButton.displayName = "CustomButton";

const formatTime = (seconds: number) => {
    if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const HairlineSlider = ({
    value,
    onChange,
    className,
    ...props
}: {
    value: number;
    onChange: (value: number) => void;
    className?: string;
    [key: string]: any;
}) => {
    return (
        <div
            className={cn(
                "relative w-full h-1.5 bg-white/25 cursor-pointer group",
                className
            )}
            data-cursor="hand"
            onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const percentage = (x / rect.width) * 100;
                onChange(Math.min(Math.max(percentage, 0), 100));
            }}
            {...props}
        >
            <div
                className="absolute top-0 left-0 h-full bg-white transition-[width] duration-150"
                style={{ width: `${value}%` }}
            />
            <div
                className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${value}% - 4px)` }}
            />
        </div>
    );
};

const VideoPlayer = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // Fallback: if metadata was already available before this
    // component's listener attached (fast/cached loads), grab it directly.
    useEffect(() => {
        const video = videoRef.current;
        if (video && video.readyState >= 1 && video.duration) {
            setDuration(video.duration);
        }
    }, []);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const pct =
                (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(isFinite(pct) ? pct : 0);
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleSeek = (value: number) => {
        if (videoRef.current && videoRef.current.duration) {
            const time = (value / 100) * videoRef.current.duration;
            if (isFinite(time)) {
                videoRef.current.currentTime = time;
                setProgress(value);
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            const newMuted = !isMuted;
            videoRef.current.muted = newMuted;
            setIsMuted(newMuted);
        }
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <motion.div
            className="relative group w-full max-w-4xl mx-auto overflow-hidden bg-black"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <div className={`absolute left-1/2 top-1/2 w-15 h-15 z-50 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full pointer-events-none transition-opacity duration-300 ${isPlaying
                    ? "opacity-0 group-hover:opacity-100 group-hover:bg-whitea"
                    : "opacity-100 bg-white"
                }`}>
                {isPlaying ? (
                    <svg
                        className="w-8 h-8 text-black"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                    </svg>
                ) : (
                    <svg
                        className="w-8 h-8 text-black"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                )}
            </div>
            <video
                ref={videoRef}
                className="w-full block"
                onLoadedMetadata={handleLoadedMetadata}
                onDurationChange={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                src={src}
                onClick={togglePlay}
                data-cursor="hand"
            />

            <AnimatePresence>
                {showControls && (
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 px-6 py-3.5 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-white/80 text-xs font-serif tracking-wider tabular-nums">
                                {formatTime(currentTime)}
                            </span>
                            <HairlineSlider
                                value={progress}
                                onChange={handleSeek}
                                className="flex-1"
                                data-cursor="hand"
                            />
                            <span className="text-white/80 text-xs font-serif tracking-wider tabular-nums">
                                {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <CustomButton onClick={togglePlay} data-cursor="hand">
                                {isPlaying ? (
                                    <Pause className="h-4 w-4" strokeWidth={1.5} />
                                ) : (
                                    <Play className="h-4 w-4" strokeWidth={1.5} />
                                )}
                            </CustomButton>

                            <CustomButton onClick={toggleMute} data-cursor="hand">
                                {isMuted ? (
                                    <VolumeX className="h-4 w-4" strokeWidth={1.5} />
                                ) : (
                                    <Volume2 className="h-4 w-4" strokeWidth={1.5} />
                                )}
                            </CustomButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default VideoPlayer;