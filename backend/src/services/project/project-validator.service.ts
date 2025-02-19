// src/services/project/project-validator.service.ts
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

@Injectable()
export class ProjectValidatorService {
  validateLocalProject(projectPath: string): boolean {
    if (!fs.existsSync(projectPath)) {
      throw new Error('The specified path does not exist.');
    }
    const gitPath = path.join(projectPath, '.git');
    if (!fs.existsSync(gitPath)) {
      throw new Error('The specified folder is not a Git project.');
    }
    return true;
  }

  validateGitUrl(gitUrl: string): boolean {
    const gitUrlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6}\.?)(\/[\w.-]*)*\/?\.git$/;
    if (!gitUrlRegex.test(gitUrl)) {
      throw new Error('The Git URL is invalid.');
    }
    return true;
  }
}