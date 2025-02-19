// src/controllers/project.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { ProjectValidatorService } from '../services/project/project-validator.service';
import { ProjectParserService } from '../services/project/project-parser.service';
import { ProjectTreeService } from '../services/project/project-tree.service';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly validator: ProjectValidatorService,
    private readonly parser: ProjectParserService,
    private readonly treeService: ProjectTreeService,
  ) {}

  @Post('upload')
  async uploadProject(@Body('type') type: string, @Body('path') path: string) {
    
    if (type === 'local') {
      this.validator.validateLocalProject(path);
    } else {
      this.validator.validateGitUrl(path);
    }

    const language = this.parser.detectLanguage(path);
    const framework = this.parser.detectFramework(path); 
    const dependencies = this.parser.parseDependencies(path);
    const tree = this.treeService.generateTree(path, language, framework);

    return {
      success: true,
      message: 'Project successfully analyzed.',
      data: { language, dependencies, tree },
    };
  }
}