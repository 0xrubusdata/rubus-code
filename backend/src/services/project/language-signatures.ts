/*
 * language-signatures.ts
 * 
 * 🚀 Best Practice: This should ideally be stored in a database
 * and be customizable per user/project via an admin panel.
 * 
 * MVP: This static file serves as a starting point.
 */

export interface LanguageSignature {
  name: string;
  filePatterns: string[];
  configFiles: string[];
  directories: string[];
}

export const LANGUAGE_SIGNATURES: LanguageSignature[] = [
  {
    name: 'TypeScript',
    filePatterns: ['.ts', '.tsx'],
    configFiles: ['next.config.js', 'next.config.ts', 'tsconfig.json'],
    directories: ['pages', 'app']
  },
  {
    name: 'TypeScript',
    filePatterns: ['.ts'],
    configFiles: ['nest-cli.json', 'tsconfig.json'],
    directories: ['src/controllers', 'src/modules']
  },
  {
    name: 'JavaScript',
    filePatterns: ['.js', '.jsx'],
    configFiles: ['package.json'],
    directories: []
  },
  {
    name: 'Python',
    filePatterns: ['.py'],
    configFiles: ['requirements.txt', 'setup.py', 'pyproject.toml'],
    directories: []
  }
];
