// src/services/project/project-parser.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { LANGUAGE_SIGNATURES } from './language-signatures';

@Injectable()
export class ProjectParserService {
  detectLanguage(projectPath: string): string {
    const results = this.scanDirectory(projectPath);
  
    return results.size > 0 
      ? Array.from(results.entries()).sort((a, b) => b[1] - a[1])[0][0]
      : 'Language not detected';
  }

  detectFramework(projectPath: string): string | null {
    const frameworkIndicators = {
      nextjs: ["next.config.js", ".next"],
      nestjs: ["nestjs.json", "main.ts", "src/main.ts"],
      django: ["manage.py", "settings.py"],
      flask: ["app.py", "wsgi.py"],
      spring: ["pom.xml", "src/main/java"]
    };
  
    for (const [framework, indicators] of Object.entries(frameworkIndicators)) {
      for (const indicator of indicators) {
        if (fs.existsSync(path.join(projectPath, indicator))) {
          return framework;
        }
      }
    }
    return null;
  }

  parseDependencies(projectPath: string): Record<string, string> {
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
      return packageJson.dependencies || {};
    }
    return {};
  }

  private scanDirectory(dirPath: string): Map<string, number> {
    const results = new Map<string, number>();
    
    try {
      const items = fs.readdirSync(dirPath);

      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
          // Ignore node_modules and other common exclude directories
          if (item === 'node_modules' || item === '.git' || item === 'dist') {
            continue;
          }

          // Check for framework-specific directories
          LANGUAGE_SIGNATURES.forEach(lang => {
            if (lang.directories.includes(item)) {
              results.set(lang.name, (results.get(lang.name) || 0) + 3);
            }
          });

          // Recursively scan subdirectory and merge results
          const subResults = this.scanDirectory(fullPath);
          subResults.forEach((score, lang) => {
            results.set(lang, (results.get(lang) || 0) + score);
          });
        } else {
          // Check file extensions and config files
          LANGUAGE_SIGNATURES.forEach(lang => {
            const ext = path.extname(item);
            if (lang.filePatterns.includes(ext)) {
              results.set(lang.name, (results.get(lang.name) || 0) + 1);
            }
            if (lang.configFiles.includes(item)) {
              results.set(lang.name, (results.get(lang.name) || 0) + 5);
            }
          });
        }
      }
    } catch (error) {
      console.error(`Erreur lors du scan du dossier ${dirPath}:`, error);
    }

    return results;
  }
}




