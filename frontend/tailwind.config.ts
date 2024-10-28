import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: "#1D1F20",
        cream: "#F5F5F5",
        "regal-blue": "#243c5a",
        "nft-dark": "#030A1C",
        "nft-gray-1": "#E3E1E3",
        "nft-gray-2": "#888888",
        "nft-gray-3": "#4F4F4F",
        "nft-black-1": "#2D2E36",
        "nft-black-2": "#1B1A21",
        "nft-black-3": "#2A2D3A",
        "nft-black-4": "#24252D",
        "nft-red-violet": "#DA18A3",
        "file-active": "#2196f3",
        "file-accept": "#00e676",
        "file-reject": "#ff1744",
        "overlay-black": "rgba(0, 0, 0, 0.8)",
      },
      flex: {
        2: "2 2 0%",
      },
      keyframes: {
        trail: {
          "0%": { "--angle": "0deg" },
          "100%": { "--angle": "360deg" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        trail: "trail var(--duration) linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
