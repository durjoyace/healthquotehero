import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand navy blue - trustworthy healthcare
        primary: {
          50: "#e8eef8",
          100: "#c5d4ed",
          200: "#9fb7e0",
          300: "#7899d3",
          400: "#5b82c9",
          500: "#3e6bbf",
          600: "#3760b3",
          700: "#2d51a2",
          800: "#244391",
          900: "#092472", // Main brand navy
          950: "#061854", // Darker for gradients
        },
        // Orange accent - warm CTA color
        accent: {
          50: "#fff8e6",
          100: "#ffecc0",
          200: "#ffe096",
          300: "#ffd36b",
          400: "#ffc94b",
          500: "#ffbf2b",
          600: "#ffb126",
          700: "#ff9e20",
          800: "#ff8c1a",
          900: "#ff6b0f",
        },
        // Orange gradient colors
        orange: {
          400: "#ff9b00",
          500: "#ff8c00",
          600: "#ff7a00",
          700: "#ff6b00",
        },
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        sans: ["var(--font-opensans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // 5-tier shadow system
        sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px rgba(0, 0, 0, 0.07)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.12)",
        "2xl": "0 25px 50px rgba(0, 0, 0, 0.15)",
        // Glow effects
        glow: "0 0 40px rgba(9, 36, 114, 0.15)",
        "glow-orange": "0 0 40px rgba(255, 155, 0, 0.25)",
        "glow-lg": "0 0 60px rgba(9, 36, 114, 0.2)",
        // Card shadows
        card: "0 2px 8px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 12px 32px rgba(0, 0, 0, 0.12)",
        "card-premium": "0 4px 20px rgba(9, 36, 114, 0.08)",
        "card-premium-hover": "0 16px 48px rgba(9, 36, 114, 0.15)",
        // Button shadows
        button: "0 4px 14px rgba(255, 140, 0, 0.35)",
        "button-hover": "0 6px 20px rgba(255, 140, 0, 0.45)",
        // Header shadow
        header: "0 4px 20px rgba(0, 0, 0, 0.08)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-down": "fadeInDown 0.4s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        pulse: "pulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "count-up": "countUp 0.4s ease-out forwards",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-pattern":
          "linear-gradient(135deg, #092472 0%, #0d2d8a 25%, #1a3a8f 50%, #2d51a2 75%, #3760b3 100%)",
        "hero-animated":
          "linear-gradient(-45deg, #092472, #0d2d8a, #1a3a8f, #092472)",
      },
      backgroundSize: {
        "400%": "400% 400%",
      },
    },
  },
  plugins: [],
};

export default config;
