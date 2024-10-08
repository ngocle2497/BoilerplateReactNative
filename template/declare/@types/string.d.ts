export {};

declare global {
  interface String {
    /**
     * Convert string to camel case
     */
    capitalize(): string;

    /**
     * Convert all UTF-8 to ASCII lowercase.
     */
    changeAlias(): string;

    /**
     * Return true if string is empty
     */
    isEmpty(): boolean;

    /**
     * Remove all characters except 0-9
     */
    removeChar(): string;

    /**
     * Get all URL from string
     */
    getURL(): Array<string>;
  }
}
