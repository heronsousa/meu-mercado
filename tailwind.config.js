/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#F9F1E5",
        foreground: "#2C241F",
        card: "#FFFFFF",
        primary: "#F45D48",
        success: "#2ECC40",
        danger: "#E74C3C",
        secondary: "#F6EDE2",
        muted: "#F3E7D9",
        accent: "#EADFC7",
        border: "#E9DBC2",
        input: "#F7F3EA",
        ring: "#F45D48",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #F45D48, #F7A399)",
        "gradient-success": "linear-gradient(135deg, #2ECC40, #4DFF6A)",
        "gradient-background": "linear-gradient(180deg, #F9F1E5, #F6EDE2)",
      },
      boxShadow: {
        glow: "0 0 40px #F7A39966",
      },
    },
  },
  plugins: [],
};
