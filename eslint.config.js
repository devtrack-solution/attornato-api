module.exports = [
  {
    files: ['{src,apps,libs,test}/**/*.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: './tsconfig.json',
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'unused-imports'],
    extends: ['standard-with-typescript', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
    root: true,
    env: {
      node: true,
      jest: true,
    },
    ignores: ['node_modules', 'dist', 'coverage', 'requirements', '.vscode', 'jest.config.js', 'jest.integration.config.js', '**/*.js', '{src,apps,libs,test}/**/*.ts'],
    rules: {
      'unused': 'off',
      'valid-typeof': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'unused-imports/no-unused-vars': 'off',
      '@typescript-eslint/method-signature-style': 'off',
      '@typescript-eslint/await-thenable': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-assertions': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/comma-spacing': 'off',
      '@typescript-eslint/return-await': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-useless-constructor': 'off',
      '@typescript-eslint/prefer-ts-expect-error': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-useless-catch': 'off',
      'no-useless-catch': 'off',
      'no-useless-escape': 'off',
      'import/export': 'off',
      'import/extensions': 'off',
      'import/prefer-default-export': 'off',
      'class-methods-use-this': 'off',
      'no-useless-constructor': 'off',
      'import/no-unresolved': 'off',
      'no-control-regex': 'off',
      'no-shadow': 'off',
      'import/no-cycle': 'off',
      'consistent-return': 'off',
      'lines-around-comment': 'off',
      'no-underscore-dangle': 'off',
      'max-classes-per-file': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'LabeledStatement',
          message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
        },
        {
          selector: 'WithStatement',
          message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
        },
        {
          selector: "MethodDefinition[kind='set']",
          message: 'Property setters are not allowed',
        },
      ],
      curly: ['error', 'all'],
      'max-len': [
        'error',
        {
          code: 210,
          ignoreUrls: true,
        },
      ],
      'no-confusing-arrow': [
        'error',
        {
          allowParens: false,
        },
      ],
      'no-mixed-operators': 'error',
      'no-tabs': [
        'error',
        {
          allowIndentationTabs: true,
        },
      ],
      'no-unexpected-multiline': 'error',
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: false,
        },
      ],
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: true,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
        },
      ],
      'prettier/prettier': [
        'error',
        {
          useTabs: false,
          tabWidth: 2,
          semi: false,
          endOfLine: 'auto',
          trailingComma: 'all',
          singleQuote: true,
          bracketSameLine: true,
          bracketSpacing: true,
          parser: 'typescript',
        },
      ],
    },
  },
]
