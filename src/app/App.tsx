import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { WorldClock } from "./components/WorldClock";
import { ExcelUpload } from "./components/ExcelUpload";

export default function App() {
  const [time, setTime] = useState(new Date());
  const [clockConfig, setClockConfig] = useState({
    clock1: 'TH', // Default: Bangkok (center stays as is)
    clock2: 'US', // Default: New York (bottom left)
    clock3: 'UK', // Default: London (bottom right)
  });

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const formattedDate = time.toLocaleDateString('en-US', dateOptions);

  const handleConfigChange = (config: { clock1: string; clock2: string; clock3: string }) => {
    setClockConfig(config);
    // Optional: Save to localStorage for persistence
    localStorage.setItem('clockConfig', JSON.stringify(config));
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('clockConfig');
    if (saved) {
      try {
        setClockConfig(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved config');
      }
    }
  }, []);

  return (
    <div className="size-full flex flex-col items-center justify-between bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 overflow-hidden relative py-12">
      {/* Excel Upload Button */}
      <ExcelUpload onConfigChange={handleConfigChange} />

      {/* Ambient glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      {/* Main Content - Center Clock */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center space-y-12 px-8">
        {/* Time Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.span
              key={hours}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-8xl md:text-9xl font-light tabular-nums tracking-tighter bg-gradient-to-br from-white via-purple-100 to-purple-200 bg-clip-text text-transparent"
            >
              {hours}
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl md:text-9xl font-light bg-gradient-to-br from-purple-300 to-purple-400 bg-clip-text text-transparent"
            >
              :
            </motion.span>
            <motion.span
              key={minutes}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-8xl md:text-9xl font-light tabular-nums tracking-tighter bg-gradient-to-br from-white via-purple-100 to-purple-200 bg-clip-text text-transparent"
            >
              {minutes}
            </motion.span>
            <motion.span
              className="text-5xl md:text-6xl font-light tabular-nums tracking-tighter bg-gradient-to-br from-purple-200/60 to-purple-300/60 bg-clip-text text-transparent self-start mt-4"
            >
              {seconds}
            </motion.span>
          </div>

          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-purple-500/20 blur-3xl rounded-full" />
        </motion.div>

        {/* Date */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-400/50 to-purple-400" />
            <p className="text-purple-200/70 tracking-[0.3em] uppercase text-sm">
              {formattedDate}
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-purple-400/50 to-purple-400" />
          </div>
        </motion.div>

        {/* Hello Factory */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="space-y-4 mt-6"
        >
          <h1 className="text-4xl md:text-5xl tracking-tight bg-gradient-to-br from-white/90 via-purple-100/80 to-purple-300/60 bg-clip-text text-transparent">
            Hello Factory
          </h1>
          <p className="text-purple-200/40 tracking-widest uppercase text-xs">
            SOFTWARE FACTORY GOES LIVE
          </p>
        </motion.div>
      </div>

      {/* World Clocks - Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="relative z-10 flex gap-8 px-8 pb-4"
      >
        <WorldClock cityCode={clockConfig.clock1} size="small" />
        <WorldClock cityCode={clockConfig.clock2} size="small" />
        <WorldClock cityCode={clockConfig.clock3} size="small" />
      </motion.div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </div>
  );
}
