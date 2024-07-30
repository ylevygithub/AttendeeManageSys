/**
 * This configuration helps Tailwind CSS understand where to find the class names in your project and provides a structure for extending the default theme and adding plugins.
 * Exports a Tailwind CSS configuration object: This sets up Tailwind CSS for the project.
 * Content: Specifies where Tailwind CSS should look for class names to include in the final CSS output.
 * Looks for files with .js, .ts, .jsx, and .tsx extensions in the ./app and ./pages directories and their subdirectories.
 * Theme: Provides a place to extend the default Tailwind CSS theme.
 * Currently empty, meaning no customizations are added.
 * Plugins: Allows adding custom Tailwind CSS plugins.
 * Currently empty, meaning no plugins are added.
 */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
