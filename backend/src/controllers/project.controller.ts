import { Controller, Post } from '@nestjs/common';

@Controller()
export class ProjectController {
  @Post('uploadProject')
  async uploadProject(): Promise<{ success: boolean; message: string }> {
    await sleep(2000); // Wait for 2 seconds before responding
    return { success: true, message: 'Fake backend response: Project uploaded successfully' };
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
