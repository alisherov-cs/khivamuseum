/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.jsx"],
    darkMode: "class",
    theme: {
        extend: {
            "text-shadow": {
                sm: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                md: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                lg: "3px 3px 6px rgba(0, 0, 0, 0.5)",
            },
            animation: {
                scale: "scale 0.5s alternate infinite ease-in-out",
            },
            keyframes: {
                scale: {
                    "0%": { transform: "scale(1)" },
                    "100%": { transform: "scale(1.2)" },
                },
            },
        },
    },
    plugins: [],
};
