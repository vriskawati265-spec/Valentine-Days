const TypewriterStep = ({ onComplete }: { onComplete: () => void }) => {
    const text = "happy birthday badasplenger";

    const images = [
        "/IMG-20251202-WA0015(1).jpg",
        "/IMG-20251222-WA0048(1).jpg",
        "/IMG-20251225-WA0054(1).jpg",
        "/IMG-20251229-WA0033.jpg",
        "/IMG-20260101-WA0023(1).jpg",
        "/IMG-20260101-WA0024(1).jpg",
        "/IMG-20260101-WA0025(1).jpg",
        "/IMG-20260102-WA0013.jpg",
        "/IMG-20260102-WA0014.jpg",
        "/IMG-20260113-WA0103(1).jpg",
        "/IMG-20260118-WA0169(1).jpg",
        "/IMG-20260123-WA0008(1).jpg",
        "/IMG-20260123-WA0009(1).jpg",
        "/IMG-20260123-WA0013(2).jpg",

        "/IMG-20260202-WA0004.jpg",
        "/IMG-20260202-WA0005.jpg",
        "/IMG-20260202-WA0006.jpg",
        "/IMG-20260202-WA0008.jpg",
        "/IMG-20260202-WA0009.jpg",
        "/IMG-20260202-WA0010.jpg",
        "/IMG-20260202-WA0012.jpg",
        "/IMG-20260202-WA0013.jpg",
        "/IMG-20260202-WA0015.jpg",
        "/IMG-20260202-WA0017.jpg",
        "/IMG-20260202-WA0018.jpg",
        "/IMG-20260202-WA0020.jpg",
        "/IMG-20260202-WA0023.jpg",
        "/IMG-20260202-WA0024.jpg",
        "/IMG-20260202-WA0025.jpg",
        "/IMG-20260202-WA0026.jpg",
        "/IMG-20260202-WA0027.jpg",
        "/IMG-20260202-WA0028.jpg",
        "/IMG-20260202-WA0029.jpg",
        "/IMG-20260202-WA0031.jpg",

        "/IMG-20260210-WA0001(2).jpg",
        "/IMG-20260211-WA0007(2).jpg",
        "/IMG-20260220-WA0020(1).jpg",

        "/IMG-20260303-WA0007(3).jpg",
        "/IMG-20260303-WA0007(4).jpg",
        "/IMG-20260303-WA0009(2).jpg",
        "/IMG-20260303-WA0009(3).jpg",

        "/IMG-20260321-WA0001(1).jpg",
        "/IMG-20260321-WA0002(2).jpg",
        "/IMG-20260321-WA0002(3).jpg",
        "/IMG-20260321-WA0003(1).jpg",

        "/IMG-20260401-WA0006(1).jpg",

        "/IMG-20260502-WA0016(1).jpg",
        "/IMG-20260502-WA0019.jpg",
        "/IMG-20260502-WA0020(1).jpg",
        "/IMG-20260502-WA0021.jpg",
        "/IMG-20260502-WA0022.jpg",
        "/IMG-20260502-WA0024.jpg",
    ];

    const [displayedText, setDisplayedText] = useState("");
    const [showImages, setShowImages] = useState(false);
    const [index, setIndex] = useState(0);
    const [isDone, setIsDone] = useState(false);

    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const hasStarted = React.useRef(false);

    // typing + start
    useEffect(() => {
        if (displayedText.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, 80);
            return () => clearTimeout(timer);
        }

        if (!hasStarted.current) {
            hasStarted.current = true;

            const timer = setTimeout(() => {
                setShowImages(true);

                if (audioRef.current) {
                    audioRef.current.muted = false;
                    audioRef.current.play().catch(() => {});
                }
            }, 600);

            return () => clearTimeout(timer);
        }
    }, [displayedText, text]);

    // slideshow (FIX stop interval)
    useEffect(() => {
        if (!showImages) return;

        const interval = setInterval(() => {
            setIndex((prev) => {
                if (prev < images.length - 1) return prev + 1;
                clearInterval(interval); // 🔥 stop di akhir
                return prev;
            });
        }, 1500); // 🔥 lebih smooth

        return () => clearInterval(interval);
    }, [showImages, images.length]);

    // selesai
    useEffect(() => {
        if (index === images.length - 1 && !isDone) {
            setIsDone(true);
            setTimeout(onComplete, 2000);
        }
    }, [index, images.length, onComplete, isDone]);

    return (
        <div className="fixed inset-0 bg-black overflow-hidden">

            {/* AUDIO */}
            <audio ref={audioRef} src="/tumblrgirl.mp3" loop muted />

            {/* TEXT */}
            <div className="absolute top-12 w-full text-center z-20">
                <h1 className="text-xl sm:text-3xl md:text-5xl text-white font-semibold tracking-wide px-4">
                    {displayedText}
                </h1>
            </div>

            {/* SLIDESHOW */}
            <AnimatePresence mode="wait">
                {showImages && (
                    <motion.img
                        key={index}
                        src={images[index]}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0, scale: 1.15 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 1.05,
                        }}
                        transition={{
                            duration: 1.2, // 🔥 lebih halus
                            ease: "easeInOut"
                        }}
                    />
                )}
            </AnimatePresence>

            {/* overlay */}
            <div className="absolute inset-0 bg-black/40 z-10" />
        </div>
    );
};