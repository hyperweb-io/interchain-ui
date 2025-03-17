import fs from "fs/promises";
import fsSync from "fs";
import crypto from "crypto";
import log from "./log";

function replacer(_key: string, value: unknown): unknown {
  if (value instanceof Map) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()),
    };
  } else {
    return value;
  }
}

class Cache {
  private cache: Map<string, string>;
  private fileContentCache: Map<string, string>;
  public isPopulated: boolean;

  constructor() {
    // { <filePath>: <contentHash> }
    this.cache = new Map();
    this.fileContentCache = new Map();
    this.isPopulated = false;
  }

  async build(filePaths: string[] | undefined = []): Promise<void> {
    if (!filePaths || filePaths.length === 0) {
      return;
    }

    const promises = filePaths
      .filter((filePath) => fsSync.existsSync(filePath))
      .map(async (filePath) => {
        try {
          const fileContent = await this.readFile(filePath);
          const hash = this.hash(fileContent);
          this.cache.set(filePath, hash);
        } catch (err) {
          log.error(`Cannot build cache, error reading file ${filePath}`);
          // Don't throw here, allow other files to be processed
        }
      });

    try {
      await Promise.all(promises);
      this.isPopulated = true;
    } catch (err) {
      log.error(
        `Cannot build cache: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  }

  toString(): string {
    return JSON.stringify(this.cache, replacer);
  }

  private hash(source: string): string {
    // Using base64url for smaller hash strings (no padding needed)
    return crypto.createHash("sha1").update(source).digest("base64url");
  }

  has(filePath: string): boolean {
    return this.cache.has(filePath);
  }

  get(filePath: string): string | undefined {
    return this.cache.get(filePath);
  }

  set(filePath: string, source: string): void {
    const hash = this.hash(source);
    this.cache.set(filePath, hash);
    this.fileContentCache.set(filePath, source);
  }

  // Read file with caching
  private async readFile(filePath: string): Promise<string> {
    if (this.fileContentCache.has(filePath)) {
      return this.fileContentCache.get(filePath)!;
    }

    const content = await fs.readFile(filePath, "utf8");
    this.fileContentCache.set(filePath, content);
    return content;
  }

  // Check if file content changed
  async isChanged(filePath: string): Promise<boolean> {
    if (!this.cache.has(filePath)) {
      return true;
    }

    try {
      const fileContent = await this.readFile(filePath);
      const currentHash = this.hash(fileContent);
      const prevHash = this.cache.get(filePath);
      return prevHash !== currentHash;
    } catch (err) {
      log.error(
        `isDiff error: ${err instanceof Error ? err.message : String(err)}`,
      );
      return true;
    }
  }

  // Clear file content cache for a specific path
  clearFileCache(filePath: string): void {
    this.fileContentCache.delete(filePath);
  }

  // Clear all file content caches
  clearAllFileCaches(): void {
    this.fileContentCache.clear();
  }
}

export { Cache };
