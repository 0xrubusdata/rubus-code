/*
 * exclusions.ts - Defines files and folders to be ignored during project analysis.
 * 
 * 🚀 Best Practice: This should ideally be stored in a database
 * and be customizable per user/project via an admin panel.
 * 
 * Example Use Case:
 * - A user may want to exclude "node_modules" but keep "dist".
 * - A user working only on backend services may exclude frontend-related files.
 * 
 * MVP: This static file serves as a starting point.
 */

export const EXCLUSIONS = {
    "JavaScript": {
      frameworks: {
        general: {
          folders: ["styles", "node_modules", "dist", "build", ".next", "coverage", "storybook-static", "public", ".git", ".vercel", "data"],
          files: ["README.md","package.json","package-lock.json", "yarn.lock", "pnpm-lock.yaml", "tsconfig.build.json", ".gitignore"]
        },
        nextjs: {
          folders: [".next", "out"],
          files: ["next.config.js", "next-env.d.ts", "tsconfig.json"]
        },
        nestjs: {
          folders: ["dist"],
          files: [".eslintrc.js", "jest.config.js"]
        }
      }
    },
    "TypeScript": {
      frameworks: {
        general: {
          folders: ["styles", "node_modules", "dist", "build", ".next", "coverage", "storybook-static", "public", ".git", ".vercel", "data"],
          files: ["README.md","package.json","package-lock.json", "yarn.lock", "pnpm-lock.yaml", "tsconfig.build.json", ".gitignore"]
        },
        nextjs: {
          folders: [".next", "out"],
          files: ["next.config.js", "next-env.d.ts", "tsconfig.json"]
        },
        nestjs: {
          folders: ["dist"],
          files: [".eslintrc.js", "jest.config.js"]
        }
      }
    },
    "Python": {
      frameworks: {
        general: {
          folders: ["__pycache__", ".venv", "env", "build", "dist", "coverage"],
          files: ["Pipfile.lock", "poetry.lock", "requirements.txt"]
        },
        django: {
          folders: ["migrations", "static", "media"],
          files: ["manage.py", "wsgi.py", "asgi.py"]
        },
        flask: {
          folders: ["instance", "migrations"],
          files: ["wsgi.py"]
        }
      }
    },
    "Java": {
      frameworks: {
        general: {
          folders: ["target", "bin", ".gradle", "out"],
          files: ["pom.xml", "gradle.lockfile"]
        },
        spring: {
          folders: ["logs", "tmp", ".mvn"],
          files: ["application.properties", "application.yml"]
        }
      }
    }
  };
  
  export function getExclusions(language: string, framework: string|null) {
    const langExclusions = EXCLUSIONS[language]?.frameworks; 
    const general = langExclusions?.general || { folders: [], files: [] }; 
    const specific = framework && langExclusions?.[framework] ? langExclusions[framework] : { folders: [], files: [] };
    
    return {
      folders: Array.from(new Set([...general.folders, ...specific.folders])),
      files: Array.from(new Set([...general.files, ...specific.files]))
    };
  }
  