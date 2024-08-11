export {};
declare global {
  interface Number {
    /**
     * Convert number to time
     */
    toTime(): { hours: number; minutes: number; seconds: number };

    /**
     * Format currency. ex: 1000000 => 1,000,000
     * @param comma @default ,
     */
    currencyFormat(comma?: string): string;

    /**
     * Round decimals number. ex: 20.456 => 20.46
     * @param maxDecimals @default 2
     */
    roundMaxFixed(maxDecimals?: number): number;

    /**
     * Convert number to 1K, 1M, 1G, ... if
     */
    toStringKMG(digits?: number): string;
  }
}
