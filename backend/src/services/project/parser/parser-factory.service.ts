import { JsTsParserService } from './js-ts-parser.service';

export class ParserFactoryService {
  static getParser(language: string) {
    switch (language) {
      case 'TypeScript':
      case 'JavaScript':      
        return new JsTsParserService();
      default:
        throw new Error(`No parser available for language: ${language}`);
    }
  }
}
