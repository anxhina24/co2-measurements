/**
 * Generates a random CO2 value with a specific range
 * @param min The minimum CO2 value
 * @param max The maximum CO2 value
 * @returns A random CO2 value
 */
export function generateRandomCO2Value(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
