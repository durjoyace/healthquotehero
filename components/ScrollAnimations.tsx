"use client";

import { useEffect, useRef, ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  animation?: "fade-up" | "fade-in" | "scale-in" | "slide-right" | "slide-left";
}

export function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  animation = "fade-up",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("is-visible");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay, threshold]);

  const animationClass =
    animation === "fade-up"
      ? "animate-on-scroll"
      : animation === "scale-in"
      ? "animate-scale-on-scroll"
      : "animate-on-scroll";

  return (
    <div ref={ref} className={`${animationClass} ${className}`}>
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 100,
  threshold = 0.1,
}: StaggerContainerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const children = container.querySelectorAll(".stagger-item");
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("is-visible");
              }, index * staggerDelay);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [staggerDelay, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  return (
    <div className={`stagger-item animate-on-scroll ${className}`}>
      {children}
    </div>
  );
}
