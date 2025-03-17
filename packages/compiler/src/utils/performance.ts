import clc from "cli-color";

/**
 * Performance timer utility for detailed profiling
 */
class Timer {
  private timers: Map<string, number> = new Map();
  private results: Map<string, number> = new Map();
  private isEnabled: boolean = true;

  /**
   * Start timing an operation
   */
  start(label: string): void {
    if (!this.isEnabled) return;
    this.timers.set(label, performance.now());
  }

  /**
   * End timing an operation and record the duration
   */
  end(label: string): number {
    if (!this.isEnabled) return 0;

    const startTime = this.timers.get(label);
    if (startTime === undefined) {
      console.warn(`Timer '${label}' was never started`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.results.set(label, duration);
    return duration;
  }

  /**
   * Get the duration of a completed operation
   */
  get(label: string): number {
    return this.results.get(label) || 0;
  }

  /**
   * Format a duration in milliseconds to a human-readable string
   */
  formatDuration(ms: number): string {
    if (ms < 1000) {
      return `${ms.toFixed(2)}ms`;
    }
    return `${(ms / 1000).toFixed(2)}s`;
  }

  /**
   * Enable or disable timing
   */
  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
  }

  /**
   * Reset all timers and results
   */
  reset(): void {
    this.timers.clear();
    this.results.clear();
  }

  /**
   * Log the recorded timings to the console
   */
  logTimings(): void {
    if (!this.isEnabled || this.results.size === 0) return;

    console.log(clc.cyan("\n📊 Build Performance Metrics:"));

    // Sort timings by duration (descending)
    const sortedEntries = [...this.results.entries()].sort(
      (a, b) => b[1] - a[1],
    );

    const totalTime =
      this.get("Total Compilation") ||
      this.get("compileReact") ||
      this.get("compileVue") ||
      this.get("React Compilation (CLI)") ||
      this.get("Vue Compilation (CLI)");

    // Group by category
    const categories = new Map<string, Array<[string, number]>>();

    for (const [label, duration] of sortedEntries) {
      const category = label.includes("(") ? label.split("(")[0] : "Other";
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)!.push([label, duration]);
    }

    // Print by category
    for (const [category, items] of categories) {
      if (category === "Total" || category === "Other") continue; // Handle these separately

      console.log(clc.bold(`\n🔷 ${category}:`));
      for (const [label, duration] of items) {
        const percentage = totalTime
          ? ((duration / totalTime) * 100).toFixed(1)
          : "0";
        const durationStr = this.formatDuration(duration);

        let colorFn = clc.green;
        if (duration > 5000) {
          colorFn = clc.red;
        } else if (duration > 2000) {
          colorFn = clc.yellow;
        }

        console.log(
          `  ${label}: ${colorFn(durationStr)} ${clc.blackBright(`(${percentage}% of total)`)}`,
        );
      }
    }

    // Print 'Other' category
    if (categories.has("Other")) {
      console.log(clc.bold(`\n🔹 Other Operations:`));
      for (const [label, duration] of categories.get("Other")!) {
        if (label.startsWith("Total")) continue;

        const percentage = totalTime
          ? ((duration / totalTime) * 100).toFixed(1)
          : "0";
        const durationStr = this.formatDuration(duration);

        let colorFn = clc.green;
        if (duration > 5000) {
          colorFn = clc.red;
        } else if (duration > 2000) {
          colorFn = clc.yellow;
        }

        console.log(
          `  ${label}: ${colorFn(durationStr)} ${clc.blackBright(`(${percentage}% of total)`)}`,
        );
      }
    }

    if (totalTime) {
      console.log(
        clc.bold(
          `\n⌛ Total Compilation Time: ${clc.cyan(this.formatDuration(totalTime))}`,
        ),
      );
    }

    console.log(
      clc.blackBright("\nℹ️ Add the '--no-timing' flag to disable this output"),
    );
  }

  // Type-safe wrapper with more explicit types
  wrap<Args extends unknown[], Return>(
    fn: (...args: Args) => Return,
    label: string,
  ): (...args: Args) => Return {
    return (...args: Args): Return => {
      this.start(label);
      try {
        const result = fn(...args);

        // Handle promises
        if (result instanceof Promise) {
          // TypeScript doesn't know that Return === Promise<something>
          // We use a type assertion here
          return result
            .then((value) => {
              this.end(label);
              return value;
            })
            .catch((error) => {
              this.end(label);
              throw error;
            }) as Return;
        }

        this.end(label);
        return result;
      } catch (error) {
        this.end(label);
        throw error;
      }
    };
  }
}

// Create and export singleton instance immediately
// This ensures it's available as soon as the module is imported
const timerInstance = new Timer();

// Helper function to time async operations
async function timeAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
  timerInstance.start(label);
  try {
    const result = await fn();
    timerInstance.end(label);
    return result;
  } catch (error) {
    timerInstance.end(label);
    throw error;
  }
}

// Helper function to time synchronous operations
function timeSync<T>(label: string, fn: () => T): T {
  timerInstance.start(label);
  try {
    const result = fn();
    timerInstance.end(label);
    return result;
  } catch (error) {
    timerInstance.end(label);
    throw error;
  }
}

// Export timer interface for TypeScript
export interface TimerInterface {
  start: (label: string) => void;
  end: (label: string) => number;
  get: (label: string) => number;
  reset: () => void;
  formatDuration: (ms: number) => string;
  setEnabled: (enabled: boolean) => void;
  logTimings: () => void;
}

// Export the timer instance and helper functions
export const timer: TimerInterface = timerInstance;
export { timeAsync, timeSync };
