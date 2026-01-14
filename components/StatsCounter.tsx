"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface StatsCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  className?: string;
  variant?: "default" | "white";
}

export function StatsCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  label,
  className = "",
  variant = "default",
}: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const animateCounter = useCallback(() => {
    const startTime = Date.now();
    const startValue = 0;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out-quart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [end, duration]);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated, animateCounter]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toLocaleString();
  };

  return (
    <div ref={ref} className={`stat-card ${className}`}>
      <div className={variant === "white" ? "stat-number-white" : "stat-number"}>
        {prefix}
        {formatNumber(count)}
        {suffix}
      </div>
      <div className={variant === "white" ? "stat-label-white" : "stat-label"}>
        {label}
      </div>
    </div>
  );
}

interface StatsGridProps {
  stats: Array<{
    end: number;
    prefix?: string;
    suffix?: string;
    label: string;
  }>;
  variant?: "default" | "white";
  className?: string;
}

export function StatsGrid({ stats, variant = "default", className = "" }: StatsGridProps) {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 ${className}`}>
      {stats.map((stat, index) => (
        <StatsCounter
          key={index}
          end={stat.end}
          prefix={stat.prefix}
          suffix={stat.suffix}
          label={stat.label}
          variant={variant}
        />
      ))}
    </div>
  );
}
