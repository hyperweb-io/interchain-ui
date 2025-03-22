import clc from "cli-color";

const error = clc.red.bold;
const warn = clc.yellow;
const info = clc.blue;
const success = clc.green;

interface LogFunction {
  (...args: unknown[]): void;
}

// Queue for log operations to prevent interleaving in concurrent processes
class LogQueue {
  private queue: Array<() => void> = [];
  private processing = false;
  private groupStack: string[] = [];

  enqueue(operation: () => void): void {
    this.queue.push(operation);
    if (!this.processing) {
      this.processQueue();
    }
  }

  // Add batch operations to ensure related logs stay together
  enqueueBatch(operations: Array<() => void>): void {
    if (operations.length === 0) return;

    // Combine all operations into a single atomic operation
    this.enqueue(() => {
      operations.forEach((op) => op());
    });
  }

  // Get current group depth for indentation
  private getCurrentIndent(): string {
    return "  ".repeat(this.groupStack.length);
  }

  // Push a group onto the stack
  pushGroup(groupName: string): void {
    this.groupStack.push(groupName);
  }

  // Pop a group from the stack
  popGroup(): void {
    this.groupStack.pop();
  }

  private processQueue(): void {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const operation = this.queue.shift();

    if (operation) {
      operation();
    }

    // Use setImmediate for better performance than setTimeout
    setImmediate(() => this.processQueue());
  }
}

const logQueue = new LogQueue();

interface LogGroup {
  info: LogFunction;
  error: LogFunction;
  warn: LogFunction;
  success: LogFunction;
  end: () => void;
}

const log: {
  error: LogFunction;
  warn: LogFunction;
  info: LogFunction;
  success: LogFunction;
  group: (groupName?: string) => LogGroup;
} = {
  error: (...args: unknown[]) =>
    logQueue.enqueue(() => console.log(error(...args))),
  warn: (...args: unknown[]) =>
    logQueue.enqueue(() => console.log(warn(...args))),
  info: (...args: unknown[]) =>
    logQueue.enqueue(() => console.log(info(...args))),
  success: (...args: unknown[]) =>
    logQueue.enqueue(() => console.log(success(...args))),

  // Add a group function to batch related logs
  group: (groupName?: string) => {
    const pendingLogs: Array<() => void> = [];

    if (groupName) {
      pendingLogs.push(() => {
        logQueue.pushGroup(groupName);
        console.log(info(`\n[Group: ${groupName}]`));
      });
    }

    const groupLog = {
      info: (...args: unknown[]) => {
        pendingLogs.push(() => console.log(info(...args)));
        return groupLog;
      },
      error: (...args: unknown[]) => {
        pendingLogs.push(() => console.log(error(...args)));
        return groupLog;
      },
      warn: (...args: unknown[]) => {
        pendingLogs.push(() => console.log(warn(...args)));
        return groupLog;
      },
      success: (...args: unknown[]) => {
        pendingLogs.push(() => console.log(success(...args)));
        return groupLog;
      },
      end: () => {
        if (pendingLogs.length > 0) {
          logQueue.enqueueBatch(pendingLogs);
        }
        logQueue.enqueue(() => logQueue.popGroup());
      },
    };

    return groupLog;
  },
};

export default log;
