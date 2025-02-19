import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ProjectTree } from '../../interfaces/project/tree.interface';
import { getExclusions } from './exclusions';
import { ParserFactoryService } from './parser/parser-factory.service';

@Injectable()
export class ProjectTreeService {
  generateTree(projectPath: string, language: string, framework: string|null): ProjectTree {
    try {
      const stats = fs.statSync(projectPath);
      const { folders, files } = getExclusions(language, framework);
      const treeParser = ParserFactoryService.getParser(language);
      
      const tree: ProjectTree = {
        name: path.basename(projectPath),
        type: stats.isDirectory() ? 'directory' : 'file',
        path: projectPath
      };

      if (stats.isDirectory()) {
        tree.children = fs.readdirSync(projectPath)
          .filter(child => !folders.includes(child))
          .map(child => {
            try {
              return this.generateTree(path.join(projectPath, child), language, framework);
            } catch (error) {
              console.warn(`Échec du parsing pour ${child}:`, error);
              // Créer un objet qui correspond à l'interface ProjectTree
              const errorTree: ProjectTree = {
                name: child,
                type: 'file',
                path: path.join(projectPath, child),
                parseError: true
              };
              return errorTree;
            }
          })
          .filter((item): item is ProjectTree => Boolean(item)); // Type guard pour assurer que ce sont des ProjectTree
      } else if (stats.isFile()) {
        // Vérifier si le fichier doit être exclu
        if (files.includes(tree.name)) {
          return tree;
        }

        // Vérifier l'extension du fichier
        const ext = path.extname(tree.name).toLowerCase();
        const validExtensions = this.getValidExtensions(language);
        
        if (!validExtensions.includes(ext)) {
          return tree;
        }

        try {
          const treeParserDatas = treeParser.parseFile(projectPath);
          tree.classes = treeParserDatas.classes;
          tree.functions = treeParserDatas.functions;
        } catch (error) {
          console.warn(`Erreur de parsing pour ${tree.path}:`, error);
          tree.parseError = true;
        }
      }

      return tree;

    } catch (error) {
      console.error(`Erreur lors de la génération de l'arbre pour ${projectPath}:`, error);
      throw error;
    }
  }

  private getValidExtensions(language: string): string[] {
    switch (language.toLowerCase()) {
      case 'typescript':
        return ['.ts', '.tsx'];
      case 'javascript':
        return ['.js', '.jsx'];
      case 'python':
        return ['.py'];
      default:
        return [];
    }
  }
}