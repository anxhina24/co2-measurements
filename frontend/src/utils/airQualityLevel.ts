import styles from '../components/measurements/style.module.css';

/**
 * Determines the air quality level based on the given CO2 level.
 * @param co2Value
 * @returns An object containing the air quality level and CSS class
 */
export const getAirQualityLevel = (co2Value: number): { level: string; cssClass: string } => {
  if (co2Value <= 1000) {
    return { level: "Good", cssClass: styles.goodAirQuality };
  } else if (co2Value <= 2000) {
    return { level: "Average", cssClass: styles.averageAirQuality };
  } else {
    return { level: "Bad", cssClass: styles.badAirQuality };
  }
};
