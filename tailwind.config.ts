/**
 * This configuration helps Tailwind CSS understand where to find the class names in your project and allows for easy customization and extension of the default theme.
 * Imports the Config type from Tailwind CSS for type-checking.
 * Exports a Tailwind CSS configuration object.
 * Content: Specifies where to look for class names to include in the CSS output.
 * Uses a glob pattern to match .js, .jsx, .ts, and .tsx files in the ./app directory and its subdirectories.
 * Theme: Provides a place to extend the default Tailwind CSS theme.
 * Currently empty, meaning no customizations.
 * Plugins: Allows adding custom Tailwind CSS plugins.
 * Currently empty, meaning no plugins are added.
 * Type-checked: Ensures the configuration object satisfies the Config type from Tailwind CSS.
 */
import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
