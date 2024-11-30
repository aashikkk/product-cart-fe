const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
    theme: {
        extend: {
            colors: {
                primary: "#001EB9",
                secondary: "#162427",
                Innertext: "#969191",
                InnerBG: "#F7F7F7",
                BG: "#FFFFFF",
            },
        },
        fontFamily: {
            satoshi: ["Satoshi", "sans-serif"],
        },
        letterSpacing: {
            tightest: "-.075em",
            tighter: "-.05em",
            tight: "-.025em",
            normal: "0",
            wide: ".025em",
            wider: ".08em",
            widest: ".15em",
        },
    },

    plugins: [flowbite.plugin()],
};
