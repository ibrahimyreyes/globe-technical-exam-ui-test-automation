import * as fs from 'fs';
import * as path from 'path';
import { Logger } from 'src/utilities/logger-utils/Logger';

/**
 *  TestDataReader - Enhanced JSON reader specifically for test data
 */
export class TestDataReader {
  private static cache: Map<string, any> = new Map();
  private logger = new Logger();

  readTestData(fileName: string, category: string = ''): any {
    const cacheKey = `${category}/${fileName}`;

    // Check cache first
    if (TestDataReader.cache.has(cacheKey)) {
      this.logger.info(`Reading from cache: ${cacheKey}`);
      return TestDataReader.cache.get(cacheKey);
    }

    try {
      // Build file path
      const filePath = this.buildFilePath(fileName, category);

      if (!fs.existsSync(filePath)) {
        this.logger.error(`Test data file not found: ${filePath}`);
        throw new Error(`Test data file not found: ${filePath}`);
      }

      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);

      // Cache the data
      TestDataReader.cache.set(cacheKey, jsonData);

      this.logger.info(`Successfully loaded test data from: ${filePath}`);
      return jsonData;
    } catch (error) {
      this.logger.error(`Error reading test data: ${error}`);
      throw error;
    }
  }

  getSection(fileName: string, section: string, category: string = ''): any {
    const data = this.readTestData(fileName, category);
    return data[section] || {};
  }

  private buildFilePath(fileName: string, category: string): string {
    const baseDir = path.resolve(process.cwd(), 'src', 'tests', 'resources', 'test-data');

    if (category) {
      return path.join(baseDir, category, `${fileName}.json`);
    }
    return path.join(baseDir, `${fileName}.json`);
  }
}

// Export singleton instance
export const testDataReader = new TestDataReader();
