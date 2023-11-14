module.exports = {
    semi: true,
    trailingComma: 'all',
    singleQuote: true,
    printWidth: 120,
    tabWidth: 4,
    useTabs: false, // Set this to true if you want to use tabs for indentation

    overrides: [
      {
        files: '*.json',
        options: {
          // JSON-specific configurations here
          bracketSpacing: true, // Add space inside brackets [1, 2, 3]
          arrayBracketSpacing: true, // Add space inside brackets [1, 2, 3]
        },
      },
    ],
  };
