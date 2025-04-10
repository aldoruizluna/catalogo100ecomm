module.exports = {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
  // Standard Prettier options
  semi: true, // Add semicolons
  singleQuote: true, // Use single quotes
  tabWidth: 2, // Use 2 spaces for tabs
  trailingComma: 'es5', // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  printWidth: 80, // Wrap lines at 80 characters
};
