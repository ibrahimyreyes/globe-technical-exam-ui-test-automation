import type { Reporter, FullConfig, Suite, TestCase, TestResult, FullResult } from '@playwright/test/reporter';
import { Logger } from '../Logger';

const logger = new Logger();

class StepLoggerReporter implements Reporter {
  constructor(options: { customOption?: string } = {}) {
    logger.info(`${options.customOption}`);
  }

  onBegin(_config: FullConfig, suite: Suite) {
    logger.info(`Starting the run with ${suite.allTests().length} tests`);
  }

  onTestBegin(test: TestCase) {
    const browserName = test.parent.title || 'Unknown Browser';
    const projectName = test.parent.project()?.name || 'Unknown Project';
    logger.info(`--------------------Starting test ${test.title}--------------------`);
    logger.info(`🌐 Browser: ${browserName} | Project: ${projectName}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    logger.info(`Finished test ${test.title}: ${result.status}`);
    if (result.steps && result.steps.length > 0) {
      for (const step of result.steps) {
        const status = step.error ? '❌' : '✅';
        logger.info(`  [STEP] ${step.title} - ${status}`);
      }
    }
  }

  onEnd(result: FullResult) {
    logger.info(`Finished the run: ${result.status}`);
  }
}

export default StepLoggerReporter;
