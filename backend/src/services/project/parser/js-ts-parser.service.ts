import * as fs from 'fs';
import * as path from 'path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import { Identifier } from '@babel/types';
import { ClassInfo, FunctionInfo } from '../../../interfaces/project/tree.interface';

export class JsTsParserService {
  parseFile(filePath: string): { classes: ClassInfo[], functions: FunctionInfo[] } {
    const code = fs.readFileSync(filePath, 'utf-8');
    
    const ast = parse(code, {
      sourceType: 'module',
      plugins: [
        'typescript',
        'jsx',
        'decorators-legacy',
        'classProperties'
      ],
    });

    const classes: ClassInfo[] = [];
    const functions: FunctionInfo[] = [];

    traverse(ast, {
      ClassDeclaration(path) {
        const className = path.node.id?.name || 'AnonymousClass';
        const classInfo: ClassInfo = {
          name: className,
          methods: [],
        };

        path.traverse({
          ClassMethod(classMethodPath) {
            const methodName = (classMethodPath.node.key as Identifier).name || 'AnonymousMethod';
            const visibility = classMethodPath.node.accessibility || 'public';
            classInfo.methods.push({
              name: methodName,
              visibility,
            });
          },
        });

        classes.push(classInfo);
      },

      FunctionDeclaration(path) {
        if (path.node.id && path.node.id.type === 'Identifier') {
          functions.push({
            name: path.node.id.name,
            visibility: 'public',
          });
        }
      },

      VariableDeclarator(path) {
        if (path.node.init && 
            (path.node.init.type === 'ArrowFunctionExpression' || 
             path.node.init.type === 'FunctionExpression')) {
          if (path.node.id && path.node.id.type === 'Identifier') {
            functions.push({
              name: path.node.id.name,
              visibility: 'public',
            });
          }
        }
      },
    });

    return { classes, functions };
  }
}