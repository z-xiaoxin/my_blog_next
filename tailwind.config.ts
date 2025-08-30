import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  theme: {
    extend: {
      typography: () => ({
        normal: {
          css: {
            fontSize: "1rem",
            pre: { marginTop: "0.75rem", marginBottom: "0.75rem" },
            // color: "#C0C0C0",
            // a: { color: "#0FF", textDecoration: "underline" },
            // h1: { color: "#0FF", fontWeight: "700" },
            // h2: { color: "#7C4DFF", fontWeight: "600" },
            // h3: { color: "#00FFF7", fontWeight: "500" },
            // p: { color: "#C0C0C0", lineHeight: "1.8" },
            // code: {
            //   color: "#0FF",
            //   backgroundColor: "#1F2937",
            //   padding: "0.2rem 0.4rem",
            //   borderRadius: "0.25rem",
            // },
            // pre: {
            //   backgroundColor: "#1F2937",
            //   color: "#0FF",
            //   padding: "1rem",
            //   borderRadius: "0.5rem",
            // },
            "ul > li::marker": { color: "#7C4DFF" },
            // "ol > li::marker": { color: "#0FF" },
            // blockquote: {
            //   borderLeftColor: "#7C4DFF",
            //   color: "#C0C0C0",
            //   fontStyle: "italic",
            // },
            "--tw-prose-body": "var(--secondary-content)",
            "--tw-prose-headings": "var(--primary-content)",
            "--tw-prose-lead": "var(--color-blue-700)",
            "--tw-prose-links": "var(--primary-color)",
            "--tw-prose-bold": "var(--primary-color)",
            "--tw-prose-counters": "var(--color-blue-600)",
            "--tw-prose-bullets": "var(--color-blue-400)",
            "--tw-prose-hr": "var(--color-blue-300)",
            "--tw-prose-quotes": "var(--primary-color)",
            "--tw-prose-quote-borders": "var(--color-blue-300)",
            "--tw-prose-captions": "var(--color-blue-700)",
            "--tw-prose-code": "var(--primary-color)",
            "--tw-prose-pre-code": "var(--color-white)",
            "--tw-prose-pre-bg": "var(--md-block-bg)",
            "--tw-prose-th-borders": "var(--color-blue-300)",
            "--tw-prose-td-borders": "var(--color-blue-200)",
          },
        },
      }),
    },
  },
  // plugins: {
  //   typography: typography({ className: "prose" }),
  // },
  plugins: [typography({ className: "xx-md" })],
};

export default tailwindConfig;

// https://tailwindcss.com/docs/typography
