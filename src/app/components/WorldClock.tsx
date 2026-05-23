import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CITIES, CityConfig } from '../config/cities';

interface WorldClockProps {
  cityCode: string;
  size?: 'small' | 'medium';
}

export function WorldClock({ cityCode, size = 'small' }: WorldClockProps) {
  const [time, setTime] = useState(new Date());
  const city = CITIES[cityCode];

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!city) {
    return null;
  }

  const timeString = time.toLocaleTimeString('en-US', {
    timeZone: city.timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const dateString = time.toLocaleDateString('en-US', {
    timeZone: city.timezone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const isSmall = size === 'small';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className={`relative backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl ${
        isSmall ? 'min-w-[280px]' : 'min-w-[350px]'
      }`}
    >
      {/* Flag */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={`https://flagcdn.com/w40/${city.flagCode}.png`}
          alt={city.country}
          className="w-8 h-6 rounded shadow-md"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div>
          <div className={`font-medium text-white/90 ${isSmall ? 'text-sm' : 'text-base'}`}>
            {city.name}
          </div>
          <div className={`text-white/60 ${isSmall ? 'text-xs' : 'text-sm'}`}>
            {city.country}
          </div>
        </div>
      </div>

      {/* Time */}
      <div className={`font-light tabular-nums text-white ${isSmall ? 'text-4xl' : 'text-5xl'} mb-2`}>
        {timeString}
      </div>

      {/* Date */}
      <div className={`text-purple-200/70 ${isSmall ? 'text-xs' : 'text-sm'} uppercase tracking-wider`}>
        {dateString}
      </div>

      {/* UTC Offset */}
      <div className="absolute top-3 right-3 text-xs text-white/40 font-mono">
        {city.utcOffset}
      </div>

      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl -z-10" />
    </motion.div>
  );
}
